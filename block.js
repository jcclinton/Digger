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
			, block = function(){}
			, o
			;


		game.factory.extend(block.prototype, baseBlock);

		obj = new block();

		obj.desc = 'block_'+options.x+'_'+options.y;
		obj.charges = game.chargesPerBlock;
		obj.dirtyFlag = false;
		obj.id = game.factory.getNextId();

		game.factory.extend(obj, options);


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

	baseBlock.highlightColors = [];
	baseBlock.highlightColors[0] = '#080';
	baseBlock.highlightColors[1] = '#008';

	baseBlock.resetColor = function(){
		this.rect.fill = this.colors[this.charges];
	};

	baseBlock.highlightColor = function(num){
		num = num || 0;
		this.rect.fill = this.highlightColors[num];
	};

	baseBlock.isDirty = function(){
		return !this.isEmpty && this.dirtyFlag;
	};

	baseBlock.setDirtyColor = function(){
		this.rect.fill = this.colorDirty;

	};

	baseBlock.dirty = function(){
		var ablocks
			, i
			, l
			, block
			;

		this.setDirtyColor();
		this.dirtyFlag = true;
		game.world.dirtyList.add(this.id, this);
		if(game.world.edgeList.get(this.id)){
			game.world.dirtyEdgeBlocks++;
		}
		ablocks = this.getAdjacentBlocks();
		for(i = 0, l = ablocks.length; i < l; i++){
			block = ablocks[i];
			if(!block.isEmpty){
				block.adjacentToDirty = true;
			}
		}
	};

	baseBlock.unDirty = function(){
		var ablocks
			, i
			, l
			, block
			;

		this.resetColor();
		this.dirtyFlag = false;
		game.world.dirtyList.remove(this.id);
		if(game.world.edgeList.get(this.id)){
			game.world.dirtyEdgeBlocks--;
		}
		ablocks = this.getAdjacentBlocks();
		for(i = 0, l = ablocks.length; i < l; i++){
			block = ablocks[i];
			if(!block.isEmpty && !block.isAdjacentToDirty()){
				block.adjacentToDirty = false;
			}
		}
	};

	baseBlock.isAdjacentToDirty = function(){
		var ablocks
			, block
			, i
			, l
			;

		ablocks = this.getAdjacentBlocks();
		for(i = 0, l = ablocks.length; i < l; i++){
			block = ablocks[i];
			if(block.isDirty()){
				return true;
			}
		}
		return false;
	};

	baseBlock.isElgibleToBeDirty = function(){
		var isClean = !this.isDirty()
			, onEdge = game.world.edgeList.get(this.id)
			, isNearDirty = this.adjacentToDirty
			;
		return isClean && ( onEdge || isNearDirty );
	};

	/*baseBlock.isElgibleToBeOnDirtyList = function(){
		var ablocks
			, key
			, block
			;

		ablocks = this.getAdjacentBlocks();
		for(key in ablocks){
			block = ablocks[key];
			if(block.isDirty()){
				return true;
			}
		}
		return false;
	};*/

	/*baseBlock.isElgibleToBeOnEdgeList = function(){
	};*/

	baseBlock.isEdgeBlock = function(){
		var ablocks
			, i
			, l
			, block
			;

		ablocks = this.getAdjacentBlocks();
		for(i = 0, l = ablocks.length; i < l; i++){
			block = ablocks[i];
			if(block.isEmpty){
				return true;
			}
		}
		return false;
	};

	baseBlock.decrementCharge = function(){
		var ablocks
			, i
			, l
			, block
			, e = game.world.edgeList
			;

		this.charges--;
		this.resetColor();
		if(this.charges > 0){
			return this.charges;
		}


		this.isEmpty = true;
		game.world.dirtyEdgeBlocks--;
		game.world.edgeList.remove(this.id);
		this.rect.opacity = 0.0;
		game.world.refreshGraph();

		ablocks = this.getAdjacentBlocks();
		for(i = 0, l = ablocks.length; i < l; i++){
			block = ablocks[i];
			if(!block.isEmpty && !e.get(block.id)){
				e.add(block.id, block);
				if(block.isDirty()){
					game.world.dirtyEdgeBlocks++;
				}
			}
		}
		return 0;
	};

	baseBlock.getAdjacentBlocks = function(){
		var i
			, j
			, xArr
			, yArr
			, blocks = game.world.boardArray
			, blockx = this.blockx
			, blocky = this.blocky
			, lx
			, ly
			, ret = []
			, block
			, x
			, y
			;

		if(this.blockx <= 0){
			xArr = [0,1];
		}else if(!blocks[blockx+1]){
			xArr = [blockx-1, blockx];
		}else{
			xArr = [blockx-1, blockx, blockx+1];
		}

		if(this.blocky <= 0){
			yArr = [0,1];
		}else if(blocks[blockx][blocky+1] === void 0){
			yArr = [blocky-1, blocky];
		}else{
			yArr = [blocky-1, blocky, blocky+1];
		}

		for(i = 0, lx = xArr.length; i < lx; i++){
			for(j = 0, ly = yArr.length; j < ly; j++){
				x = xArr[i];
				y = yArr[j];
				block = blocks[x][y];
				if(x !== blockx || y !== blocky){
					ret.push(blocks[x][y]);
				}
			}
		}
		return ret;
	};


	return me;
}());