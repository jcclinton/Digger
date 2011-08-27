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
			;

		me.setInitialData();

		this.world = gameWorld.create();

		canvas = this.canvas = new Canvas(document.body, this.world.width, this.world.height);

		game.factory.init(canvas);

		this.world.draw(canvas);

  	canvas.fill = 'rgba(0,0,0, 0.1)';



    elem = E('h1', { id: 'score' });
    elem.appendChild(T('Score: '));
    score = new ElementNode(elem, {
      color: 'gray', x: 100, y: 500, zIndex: 1002, align: 'left', cursor: 'default'
    });

		textLayer.desc = "text layer";
		//canvas.append(textLayer);
		//textLayer.append(score);


		canvas.when('mousemove', function(e){
		});


		canvas.when('mousedown', function(e){
		});

		canvas.when('mouseup', function(e){
		});
  };

  return me;
}());



