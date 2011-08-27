var gameWorld = (function(){
	var me = {}
		, height = 200
		, width = 350
		, blockSize = 20
		;

	me.dirtyEdgeBlocks = 0;

	me.width = width;
	me.height = height;


	me.initLists = function(){
		this.dirtyList = game.factory.createList();
		this.edgeList = game.factory.createList();
	};


	me.getRawArray = function(){
		var i
			, j
			, w
			, h
			, inner = []
			, raw = []
			, v
			;

		for(i = 0, w = this.boardArray.length; i < w; i++){
			inner = [];
			for(j = 0, h = this.boardArray[i].length; j < h; j++){
				v = this.boardArray[i][j].isEmpty ? 0 : 1;
				inner.push(v); // row
			}
			raw.push(inner); // column
		}

		return raw;
	};


	me.refreshGraph = function(){
		var rawArray = this.getRawArray();
		this.graph = new Graph(rawArray);
	};


	me.getBlockFromPixels = function(x, y){
		var o = pixelsToBlocks(x, y)
			, b = this.boardArray[o.x][o.y]
			;

		return b;
	};


	// only draws, doesnt manipulate data
	me.drawOnce = function(canvas){
		var boardLayer = new CanvasNode()
			, line
			, i
			, l
			, outline
			, o
			, im
			, jm
			, w
			, h
			, brown = '#443300';
			;

		this.refreshGraph();

		boardLayer.desc = "Board Layer";
		canvas.append(boardLayer);
		boardLayer.stroke = brown;


		outline = [
			{x1: 0, x2: this.width, y1: 0, y2: 0},
			{x1: this.width, x2: this.width, y1: 0, y2: this.height},
			{x1: 0, x2: this.width, y1: this.height, y2: this.height},
			{x1: 0, x2: 0, y1: 0, y2: this.height},
		];

		// board outline
		for(i = 0, l = outline.length; i < l; i++){
			o = outline[i];
			line = new Line(o.x1, o.y1, o.x2, o.y2);
			line.desc = "board outline_"+i;
			boardLayer.append(line);
		}


		//inner blocking rectangles
		for(i = 0, w = this.boardArray.length; i < w; i++){
			for(j = 0, h = this.boardArray[i].length; j < h; j++){
				o = this.boardArray[i][j];
				rect = o.rect;
				if(!o.isEmpty){
					line.desc = "rect_"+i+'_'+j;
					boardLayer.append(rect);

				}else{
					continue;
					rect.opacity = 0.0;
					line.desc = "rect_"+i+'_'+j;
					boardLayer.append(rect);
				}
			}
		}
	};




	me.createBoard = function(){
		var i
			, j
			, o = pixelsToBlocks(width, height)
			, w = o.x
			, h = o.y
			, inner
			, outer = []
			, v
			, obj
			, o
			;

		for(i = 0; i < w; i++){
			inner = [];
			for(j = 0; j < h; j++){
				v = 0;
				if(i < w/2){
					v = 1;
				}

				// coordinates start at top left corner of rect
				// todo: fix this to work with the coords
				o = blocksToPixels(i, j);

				o.rect = new Rectangle(blockSize, blockSize, o);

				o.isEmpty = !v;
				obj = game.block.create(o);
				inner.push(obj); // row
			}
			outer.push(inner); // column
		}

		return outer;
	};


	return me;




	// PRIVATE FUNCTIONS




	function pixelsToBlocks(x, y){
		var blockx = x/blockSize | 0
			, blocky = y/blockSize | 0
			;
		return {x: blockx, y: blocky};
	}

	function blocksToPixels(x, y){
		return {x: x*blockSize, y: y*blockSize};
	}

}());