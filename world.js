var gameWorld = (function(){
	var me = {}
		, height = 200
		, width = 350
		, blockSize = 20
		;

	me.create = function(){
		var obj = {};

		obj.width = width;
		obj.height = height;
		obj.bockSize = blockSize;


		obj.boardArray = createBoard();


		obj.refreshGraph = function(){
			var rawArray = this.getRawArray();
			this.graph = new Graph(rawArray);
		};

		obj.getRawArray = function(){
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
					v = this.boardArray[i][j].blocking;
					inner.push(v); // row
				}
				raw.push(inner); // column
			}

			return raw;
		};

		obj.refreshGraph();

		obj.draw = draw;

		return obj;
	};

	function draw(canvas){
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
				if(this.boardArray[i][j].blocking){
					im = blockSize*i;
					jm = blockSize*j;

					// coordinates start at top left corner of rect
					// todo: fix this to work with the coords
					o = {x: im, y: jm};

					rect = new Rectangle(blockSize, blockSize, o);
					rect.fill = brown;
					line.desc = "rect_"+i+'_'+j;
					boardLayer.append(rect);

				}else{
					continue;
					im = blockSize*i;
					jm = blockSize*j;

					// coordinates start at top left corner of rect
					// todo: fix this to work with the coords
					o = {x: im, y: jm};

					rect = new Rectangle(blockSize, blockSize, o);
					//rect.fill = brown;
					rect.opacity = 0.0;
					line.desc = "rect_"+i+'_'+j;
					boardLayer.append(rect);
				}
			}
		}


	};



	function createBoard(){
		var i
			, j
			, w = width/blockSize // 100
			, h = height/blockSize // 60
			, inner
			, outer = []
			, v
			, obj
			;

		for(i = 0; i < w; i++){
			inner = [];
			for(j = 0; j < h; j++){
				v = 0;
				if(i < w/2){
					v = 1;
				}
				obj = game.block.create({blocking: v});
				inner.push(obj); // row
			}
			outer.push(inner); // column
		}

		return outer;
	}


	return me;
}());