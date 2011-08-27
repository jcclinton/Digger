var gameWorld = (function(){
	var me = {}
		, height = 600
		, width = 1000
		, blockSize = 20
		;

	me.create = function(){
		var obj = {};

		obj.width = width;
		obj.height = height;
		obj.bockSize = blockSize;


		obj.boardArray = createBoard();


		obj.refreshGraph = function(){
			obj.graph = new Graph(obj.boardArray);
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
			;

		boardLayer.desc = "Board Layer";
		canvas.append(boardLayer);
		boardLayer.stroke = '#443300';


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


	};



	function createBoard(){
		var i
			, j
			, w = width/blockSize // 100
			, h = height/blockSize // 60
			, inner
			, outer = []
			, v
			, llimit = 40
			, rlimit = w - llimit
			, tlimit = 1
			, blimit = h - tlimit
			;

		for(i = 0; i < w; i++){
			inner = [];
			for(j = 0; j < h; j++){
				v = 0;
				if( false && (j > tlimit && j < blimit && i > llimit && i < rlimit) ){
					v = Math.random();
					v = v > 0.2 ? 0 : 1;
				}
				inner.push(v); // row
			}
			outer.push(inner); // column
		}

		return outer;
	}


	return me;
}());