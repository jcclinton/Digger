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

		if(block){
			this.data.state = 'digging';
			this.dig(block);
			this.colorBlock(block, true);
			return block;
		}

		block = this.lookForAnyBlocks();

		if(block){
			this.colorBlock(block, true);
			this.data.state = 'moving';
			adjacentBlock = this.getMoveToBlock(block);
			this.setMoveTo(adjacentBlock);
			return block;
		}else{
			this.data.state = 'idle';
		}
	};

	me.colorBlock = function(block, setNewBlock){
		if(this.data.selectedBlock && this.data.selectedBlock !== block){
			this.data.selectedBlock.setDirtyColor();
			this.data.selectedBlock = null;
		}

		if(setNewBlock){
			this.data.selectedBlock = block;
			block.highlightColor(1);
		}
	}

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
				return block;
			}
		}
	};

	me.dig = function(block){
		var that = this
			;

		this.colorBlock(block, false);

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
		//this.data.state = 'moving';
	};

	me.move = function(){
		this.data.state = 'idle';
	};

	return me;
};