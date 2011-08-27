var game = (function(){
	var me = {};

	me.setInitialData = function(){
		var d
			;

		d = me.data = {};
	};


	me.init = function(){
		var canvas
			, textLayer = new CanvasNode()
			, elem
			, score
			, state = {}
			;

		me.chargesPerBlock = 5;

		me.setInitialData();

		this.world = gameWorld;
		this.world.initLists();
		this.world.boardArray = this.world.createBoard();
		this.world.fillEdgeList();

		canvas = this.canvas = new Canvas(document.body, this.world.width, this.world.height);

		game.factory.init(canvas);

		this.world.drawOnce(canvas);

  	canvas.fill = 'rgba(0,0,0, 0.1)';



    elem = E('h1', { id: 'score' });
    elem.appendChild(T('Score: '));
    score = new ElementNode(elem, {
      color: 'gray', x: 100, y: 500, zIndex: 1002, align: 'left', cursor: 'default'
    });

		textLayer.desc = "text layer";
		//canvas.append(textLayer);
		//textLayer.append(score);





		state.clicked = function(e){
			var x = e.offsetX || e.layerX || e.x
				, y = e.offsetY || e.layerY || e.y
				, block = game.world.getBlockFromPixels(x, y)
				;

			if(block && block !== state.currentBlock){
				state.currentBlock = block;
				if(block.isDirty){
					block.unDirty();
				}else if(block.isElgibleToBeDirty()){
					console.log('dirtying block');
					block.dirty();
				}
			}
		};

		state.notclicked = function(e){
			var x = e.offsetX || e.layerX || e.x
				, y = e.offsetY || e.layerY || e.y
				, block = game.world.getBlockFromPixels(x, y)
				;

			if(block && block !== state.currentBlock){
				if(state.currentBlock && !state.currentBlock.isDirty()){
					state.currentBlock.resetColor();
				}

				state.currentBlock = block;

				if(!block.isDirty() && block.isEdgeBlock() || block.isAdjacentToDirty()){
					block.highlightColor();
				}
			}
		};


		canvas.when('mousemove', state.notclicked);


		canvas.when('mousedown', function(e){
			var x = e.offsetX || e.layerX || e.x
				, y = e.offsetY || e.layerY || e.y
				;

  		canvas.removeEventListener('mousemove', state.notclicked);
  		canvas.when('mousemove', state.clicked);
		});

		canvas.when('mouseup', function(e){
			var x = e.offsetX || e.layerX || e.x
				, y = e.offsetY || e.layerY || e.y
				;

  		canvas.removeEventListener('mousemove', state.clicked);
  		canvas.when('mousemove', state.notclicked);
		});
  };

  return me;
}());



