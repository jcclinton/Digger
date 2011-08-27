window.onload = function()
{
	setTimeout(function(){
		game.init();


		var shape
			, i
			, options = { shapes:{} }
			, u
			, r = 15
			;

		options.shapes.gradient = {
	    type : 'radial',
	    endRadius : r,
	    colorStops : [
	      [ 0.0, "rgba(100,195,90,1)" ],
	      [ 0.2, "rgba(5,10,80,0.4)" ],
	      [ 1, "rgba(10,0,40,0)" ]
	    ]
	  };
	  options.shapes.radius = r;
		options.shapes.x = game.world.width / 3;
		options.shapes.y = game.world.height / 2;

		//u = game.unit.factory.spawn('builder', options);

	},0);


};