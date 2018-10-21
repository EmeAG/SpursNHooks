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
		this.load.image('Suelo_Pirata', 'assets/PropsEscenario/SueloPirata.png');
		this.load.image('Suelo_Vaquero', 'assets/PropsEscenario/sueloVaquero.png')
		this.load.image('Cannon_Pirata', 'assets/PropsEscenario/CannonPirata.png');
		this.load.image('Cannon_Vaquero', 'assets/PropsEscenario/CannonVaquero.png');
		this.load.image('Bloq_mad_cuad', 'assets/sprites/Madera_cuad.png');
		this.load.image('Bloq_mad_trian', 'assets/sprites/Madera_trian.png');
		this.load.image('Bloq_mad_rect', 'assets/sprites/Madera_rect.png');
		this.load.image('balaAcido', 'assets/PropsEscenario/balaAcido.png');
		this.load.image('balaAgua', 'assets/PropsEscenario/balaAgua.png');
		this.load.image('balaComun', 'assets/PropsEscenario/balaComun.png');

		//Contruccion Images
		this.load.image('telon','assets/PropsEscenario/Telon.png');
		this.load.image('boton_Tipo','assets/PropsEscenario/botonMaterial.png');
		this.load.image('boton_Material','assets/PropsEscenario/botonTipo.png');
		this.load.image('cuadro_Tiempo','assets/PropsEscenario/CuadroTiempo.png');
		
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
