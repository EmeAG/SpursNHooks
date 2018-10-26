Game.Preloader = function(game){
	this.preloadBar=null;
};

Game.Preloader.prototype={
	preload:function(){
	
		//Menu Images
		this.load.image("fondoMenu", 'assets/Backgrounds/fondoMenu.png');
		this.load.image("landscape", 'assets/landscape.png');
		
		//Game Images
		this.load.image('Vaquero', 'assets/sprites/Vaquero.png');
		this.load.image('Pirata', 'assets/sprites/Pirata.png');
		this.load.image('Suelo_Pirata', 'assets/PropsEscenario/SueloPirata.png');
		this.load.image('Suelo_Vaquero', 'assets/PropsEscenario/sueloVaquero.png')
		this.load.image('Suelo_Mar', 'assets/PropsEscenario/olasAnimacion2.gif')
		this.load.image('Cannon_Pirata', 'assets/PropsEscenario/CannonPirata.png');
		this.load.image('Cannon_Vaquero', 'assets/PropsEscenario/CannonVaquero.png');
		this.load.image('Bloq_mad_cuad', 'assets/sprites/Madera_cuad.png');
		this.load.image('Bloq_pied_cuad', 'assets/sprites/PiedraCuadr.png');
		this.load.image('Bloq_met_cuad', 'assets/sprites/metalCuadr.png');
		this.load.image('Bloq_mad_trian', 'assets/sprites/Madera_trian.png');
		this.load.image('Bloq_pied_trian', 'assets/sprites/PiedraTrian.png');
		this.load.image('Bloq_met_trian', 'assets/sprites/metalTrian.png');
		this.load.image('Bloq_mad_rectH', 'assets/sprites/RectMaderoHoriz.png');
		this.load.image('Bloq_pied_rectH', 'assets/sprites/PiedraRect.png');
		this.load.image('Bloq_met_rectH', 'assets/sprites/metalRect.png');
		this.load.image('Bloq_mad_rectV', 'assets/sprites/Madera_rect.png');
		this.load.image('Bloq_pied_rectV', 'assets/sprites/PiedraRectVert.png');
		this.load.image('Bloq_met_rectV', 'assets/sprites/MetalRectVert.png');
		this.load.image('balaAcido', 'assets/PropsEscenario/balaAcido.png');
		this.load.image('balaAgua', 'assets/PropsEscenario/balaAgua.png');
		this.load.image('balaFuego', 'assets/PropsEscenario/balaFuego.png');
		this.load.image('balaComun', 'assets/PropsEscenario/balaComun.png');
		this.load.image('Marcador', 'assets/PropsEscenario/Marcador.png');
		this.load.image('CartelVaqueros', 'assets/PropsEscenario/CartelVaqueros.png');
		this.load.image('CartelPiratas', 'assets/PropsEscenario/CartelPiratas.png');

		//Contruccion Images
		this.load.image('telon','assets/PropsEscenario/Telon.png');
		this.load.image('boton_Tipo','assets/PropsEscenario/botonMaterial.png');
		this.load.image('boton_Material','assets/PropsEscenario/botonTipo.png');
		this.load.image('cuadro_Tiempo','assets/PropsEscenario/CuadroTiempo.png');
		this.load.image('FondoBatalla', 'assets/Backgrounds/FondoBatalla.png');
		
		this.load.image('BotonBala', 'assets/PropsEscenario/BotonBala.png');
		this.load.image('BotonBala_B', 'assets/PropsEscenario/BotonBalaBig.png');
		this.load.image('BotonDinero', 'assets/PropsEscenario/BotonDinero.png');
		this.load.image('BotonMaterial', 'assets/PropsEscenario/BotonMaterial.png');
		this.load.image('BotonMaterialConSombra', 'assets/PropsEscenario/BotonMaterialConSombra.png');
		this.load.image('botonPersonaje', 'assets/PropsEscenario/botonPersonaje.png');
		this.load.image('botonTipo', 'assets/PropsEscenario/botonTipo.png');
		this.load.image('botonTipoConSombra', 'assets/PropsEscenario/botonTipoConSombra.png');
		this.load.image('CuadroTiempo', 'assets/PropsEscenario/CuadroTiempo.png');


		this.load.image('arrow', 'assets/longarrow2.png');
		this.load.image('analog', 'assets/fusia.png');		
		//Video
		//this.load.video('video', 'assets/video/video.mp4');
		
        this.background = this.add.image(0, 0, "preloader_fondo");
        this.background.height = this.game.height;
        this.background.width = this.game.width;	
		
		this.preloadBar=this.add.sprite(this.world.centerX,this.world.centerY + this.world.centerY/2,'preloader_bar');
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.preloadBar.scale.x *= 0.5;
		this.time.advancedTiming = true;
			
		
		this.load.setPreloadSprite(this.preloadBar);
	},
	create:function(){
		alert();
		this.state.start('MainMenu');
	}
};
