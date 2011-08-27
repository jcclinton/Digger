game.factory = (function(){
	var me = {}
		, unitLayer
		;



	me.getNextId = (function(){
		var id = 9000;
		return function(){
			return ++id;
		};
	})();

	me.extend = function(obj){
		var i
			, l
			, arg
			, e
			;

		for(i = 1, l = arguments.length; i < l; i++){
			arg = arguments[i];
			if(arg){
				for(e in arg){
					obj[e] = arg[e];
				}
			}
		}
		return obj;
	};

	me.init = function(canvas){
		unitLayer = new CanvasNode();
		unitLayer.desc = "Unit Layer";
		canvas.append(unitLayer);
	};

	me.spawn = function(name, options){

		var defaults
			, obj
			, map
			, myGreatConstructor = function(){}
			, i
			, l
			, klass
			;

		map = game.unit.map[name];
		klass = map.klass;

		if(!map){
			console.warn('map key: ' + name + ' does not exist');
			return;
		}

		options.shapes = options.shapes || {};

		myGreatConstructor.prototype = new game.unit.shapes(klass, game.canvas, options.shapes);


		me.extend(myGreatConstructor.prototype, game.unit.unitBase());


		// loop through all game-specific objects this should extend
		if(map.extending !== void 0){
			for(i = 0, l = map.extending.length; i < l; i++){
				if( map.extending[i] === void 0 || !game.unit[ map.extending[i] ] ){
					console.warn(map.extending[i] + ' does not exist');
					continue;
				}

				me.extend( myGreatConstructor.prototype, game.unit[ map.extending[i] ] );
			}
		}


		obj = new myGreatConstructor();

		obj.shape.unit = obj;


		defaults = {
		};
		map.init = map.init || {};
		options.data = options.data || {};

		obj.data = {};
		me.extend(obj.data, defaults, map.init, options.data);

		obj.data.id = me.getNextId();

		unitLayer.append(obj.scene);


		me.unitList.add(obj.data.id, obj);

		return obj;
	};

	me.createList = function(){
		var lst = {
			"table": {},
		};

		lst.add = function(id, obj) {
			return (lst.table[id] = obj);
		};

		lst.remove = function(id) {
			var obj =lst.table[id];
			if(!obj) return;

			return delete lst.table[id];
		};

		lst.get = function(id) {
			return lst.table[id]?lst.table[id]:false;
		};

		return lst;
	};


	me.unitList = me.createList();


	return me;

})();