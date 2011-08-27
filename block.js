game.block = (function(){
	var me = {}
		, baseBlock = {}
		;


	function initRect(obj){
		obj.rect.when('mousedown', function(e){
			if(obj.isDirty()){
				obj.unDirty();
			}else if(obj.isElgibleToBeDirty()){
				obj.dirty();
			}
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
		obj.dirtyFlag = false;

		obj.rect = options.rect;
		obj.x = options.x;
		obj.y = options.y;
		obj.isEmpty = options.isEmpty;
		obj.id = game.factory.getNextId();


		initRect(obj);

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
	baseBlock.colorDirty = '#800';

	baseBlock.resetColor = function(){
		this.rect.fill = this.colors[this.charges];
	};

	baseBlock.highlightColor = function(){
		this.rect.fill = '#080';
	};

	baseBlock.isDirty = function(){
		return !this.isEmpty && this.dirtyFlag;
	};

	baseBlock.dirty = function(){
		this.rect.fill = this.colorDirty;
		this.dirtyFlag = true;
	};

	baseBlock.unDirty = function(){
	};

	baseBlock.isElgibleToBeDirty = function(){
		return true;
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