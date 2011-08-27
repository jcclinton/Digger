game.block = (function(){
	var me = {};

	me.create = function(options){
		var obj = {};

		game.factory.extend(obj, options);

		return obj;
	};

	return me;
}());