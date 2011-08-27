game.block = (function(){
	var me = {}
		, baseBlock = {}
		;


	function initRect(rect){

		rect.when('mousedown', function(e){
		});

	};

	me.create = function(options){
		var obj = {}
			, f = function(){}
			, o
			;


		game.factory.extend(f.prototype, baseBlock);

		obj = new f();

		obj.desc = 'block_'+options.x+'_'+options.y;
		obj.charges = game.chargesPerBlock;
		obj.dirty = false;

		obj.rect = options.rect;
		obj.x = options.x;
		obj.y = options.y;
		obj.isEmpty = options.isEmpty;


		initRect(obj.rect);

		obj.resetColor();

		return obj;
	};


	baseBlock.colors = [];
	baseBlock.colors[0] = '#000';
	baseBlock.colors[1] = '#111000';
	baseBlock.colors[2] = '#221800';
	baseBlock.colors[3] = '#332000';
	baseBlock.colors[4] = '#442800';
	baseBlock.colors[5] = '#553000';

	baseBlock.resetColor = function(){
		this.rect.fill = this.colors[this.charges];
	};

	baseBlock.highlightColor = function(){
		this.rect.fill = '#080';
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

	baseBlock.elgibleToBeOnDirtyList = function(){
	};

	baseBlock.elgibleToBeOnEdgeList = function(){
	};

	baseBlock.isNextToADirtyBlock = function(){
	};

	baseBlock.isEdgeBlock = function(){
		return true;
	};

	baseBlock.decrementCharge = function(){
	};

	baseBlock.getAdjacentBlocks = function(){
	};


	return me;
}());