game.block = (function(){
	var me = {};

	me.create = function(options){
		var obj = {};

		game.factory.extend(obj, options);

		initRect(obj.rect);

		return obj;
	};

	function initRect(rect){

		rect.when('mousedown', function(e){
		});

	};

	return me;
}());