Game.Preloader = function(game){
	this.preloadBar=null;
};

Game.Preloader.prototype={
	preload:function(){
	
		//Menu Images
		this.load.spritesheet('button', 'assets/sprites/block.png', 193, 71);
		this.load.image("background", 'assets/background.png');
		this.load.image("landscape", 'assets/landscape.png');
		
		//Game Images
<<<<<<< HEAD
		this.load.image('Suelo_Pirata', 'assets/sprites/SueloBarco.png');
		this.load.image('Bloq_mad_cuad', 'assets/sprites/cuadrMadero.png');
		this.load.image('Bloq_mad_trian', 'assets/sprites/TriangMadero.png');
		this.load.image('Bloq_mad_rect', 'assets/sprites/RectMaderoVert.png');
=======
		this.load.image('Suelo_Pirata', 'assets/PropsEscenario/SueloBarco.png');
		this.load.image('Suelo_Vaquero', 'assets/PropsEscenario/sueloVaquero.png');
		this.load.image('Bloq_mad_cuad', 'assets/sprites/Madera_cuad.png');
		this.load.image('Bloq_mad_trian', 'assets/sprites/Madera_trian.png');
		this.load.image('Bloq_mad_rect', 'assets/sprites/Madera_rect.png');
>>>>>>> d8a2dc0bff78b9828921487c48568c70afffba7d
		
		
		//Video
		//this.load.video('video', 'assets/video/video.mp4');
		
		
		this.preloadBar=this.add.sprite(this.world.centerX,this.world.centerY,'preloadBar');
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.time.advancedTiming = true;
		
		this.load.setPreloadSprite(this.preloadBar);

	
	},
	create:function(){
		this.state.start('MainMenu');
	}
};