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

		block = block || this.getCurrentBlock();

		blocks = block.getAdjacentBlocks();
		for(i = 0, l = blocks.length; i < l; i++){
			if(blocks[i].isDirty()){
				return blocks[i];
			}
		}
	};

	me.getCurrentBlock = function(){
		var x = this.shape.x
			, y = this.shape.y
			;

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
			var currentBlock = that.getCurrentBlock();
			if(block.isAdjacentToThisBlock(currentBlock) === false){
				that.data.state = 'idle';
				return;
			}
			var charges = block.decrementCharge();
			if(charges <= 0){
				that.data.state = 'idle';
			}else{
				that.dig(block);
			}
		}, game.digTime);
	};

	me.setMoveTo = function(nextBlock){
		var endx
			, endy
			, startx
			, starty
			, start
			, end
			, result
			, currentBlock = this.getCurrentBlock()
			, nodes = game.world.graph.nodes
			, next
			;

		this.data.state = 'moving';

		endx = nextBlock.blockx;
		endy = nextBlock.blocky;
		startx = currentBlock.blockx;
		starty = currentBlock.blocky;

		try{
			start = nodes[startx][starty];
			end = nodes[endx][endy];
			result = astar.search(nodes, start, end);
			this.data.nextPath = result;
			if(this.data.nextPath && this.data.nextPath.length > 0){
				next = this.data.nextPath.shift();
				this.data.nextPos = game.world.blocksToPixels(next.x, next.y);
			}else{
				debugger;
				console.warn('builder breakage');
			}
		}catch(e){
			console.warn('ASTAR: ' + e);
		}
	};

	me.move = function(){
		var next
			;

		if(this.data.nextPos){
			this.shape.x = this.data.nextPos.x + (game.world.blockSize/2 - 0);
			this.shape.y = this.data.nextPos.y + (game.world.blockSize/2 + 1); // for some reason this looks better with an offset of +1
		}


		if(this.data.nextPath && this.data.nextPath.length > 0){
			next = this.data.nextPath.shift();
			this.data.nextPos = game.world.blocksToPixels(next.x, next.y);
		}else{
			this.data.state = 'idle';
			this.data.nextPos = null;
		}
	};

	return me;
};