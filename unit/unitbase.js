game.unit = {};
game.unit.unitBase = function(){
	var me = {};

	// get adjacent empty block to move to
	me.getMoveToBlock = function(block){
		var blocks
			, i
			, l
			;

		blocks = block.getAdjacentBlocks();
		for(i = 0, l = blocks.length; i < l; i++){
			if(blocks[i].isEmpty){
				return blocks[i];
			}
		}
	};

	me.lookForBlocksToDig = function(){
		var block
			, adjacentBlock
			;

		block = this.lookForAdjacentBlocks();

		if(!block){
			block = this.lookForAnyBlocks();
		}

		if(block){
			block.highlightColor();
			adjacentBlock = this.getMoveToBlock(block);
			this.setMoveTo(adjacentBlock);
		}else{
			this.data.state = 'idle';
		}
	};

	me.lookForAdjacentBlocks = function(block){
		var blocks
			, i
			, l
			;

		block = block || this.getCurrentBlock(this.shape.x, this.shape.y);

		blocks = block.getAdjacentBlocks();
		for(i = 0, l = blocks.length; i < l; i++){
			if(blocks[i].isDirty()){
				return blocks[i];
			}
		}
	};

	me.getCurrentBlock = function(x, y){
		return game.world.getBlockFromPixels(x, y);
	};

	me.lookForAnyBlocks = function(){
		var edgeList = game.world.edgeList.table
			, key
			, block
			, adjacentBlock
			;

		for(key in edgeList){
			block = edgeList[key];
			if(block && block.isDirty()){
				adjacentBlock = this.getMoveToBlock(block);
				this.setMoveTo(adjacentBlock);
			}
		}
	};

	me.dig = function(block){
		var that = this
			;

		setTimeout(function(){
			var charges = block.decrementCharge();
			if(charges <= 0){
				that.data.state = 'idle';
			}else{
				that.dig(block);
			}
		}, game.digTime);
	};

	me.setMoveTo = function(){
		this.data.state = 'moving';
	};

	me.move = function(){
	};

	return me;
};