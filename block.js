game.block = (function(){
	var me = {}
		, baseBlock = {}
		;


	function initRect(rect){

		rect.when('mousedown', function(e){
		});

	};

	me.create = function(options){
		var obj = {};

		game.factory.extend(obj, options);

		initRect(obj.rect);

		game.factory.extend(obj, baseBlock);

		return obj;
	};

	baseBlock.isDirty = function(){
		return !this.isEmpty && this.dirty;
	};

	baseBlock.dirty = function(){

	};

	baseBlock.undirty = function(){

	};

	baseBlock.isElgibleToBeDirty = function(){

	};

	return me;
}());