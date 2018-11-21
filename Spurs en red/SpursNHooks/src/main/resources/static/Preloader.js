Game.Preloader = function(game){
	this.preloadBar=null;
};

Game.Preloader.prototype={
	preload:function(){
		//Musica
		this.load.audio('menuMusic','assets/Sounds/MusicaInicioJuego_Menu.mp3');
		this.load.audio('batallaMusic','assets/Sounds/MusicaGameplay.mp3');

		//Menu Images
		this.load.image("fondoMenu", 'assets/Backgrounds/fondoMenu.png');
		this.load.image("landscape", 'assets/landscape.png');
		
		//Game Images
		this.load.image('Vaquero', 'assets/sprites/Vaquero.png');
		this.load.image('Pirata', 'assets/sprites/Pirata.png');
		this.load.image('Suelo_Pirata', 'assets/PropsEscenario/SueloPirata.png');
		this.load.image('Suelo_Vaquero', 'assets/PropsEscenario/sueloVaquero.png')
		this.load.image('Suelo_Mar_cla', 'assets/PropsEscenario/olas.png')
		this.load.image('Suelo_Mar_osc', 'assets/PropsEscenario/olasDark.png')
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
		this.load.image('MarcadorOff', 'assets/PropsEscenario/MarcadorOff.png');
		this.load.image('MarcadorOn', 'assets/PropsEscenario/MarcadorOn.png');
		this.load.image('CartelVaqueros', 'assets/PropsEscenario/CartelVaqueros.png');
		this.load.image('CartelPiratas', 'assets/PropsEscenario/CartelPiratas.png');

		this.load.image('Bloq_mad_cuad_quem', 'assets/sprites/MaderaCuadQuem.png');
		this.load.image('Bloq_mad_rectV_quem', 'assets/sprites/MaderaRectVertQuem.png');
		this.load.image('Bloq_mad_trian_quem', 'assets/sprites/MaderaTriangQuem.png');
		this.load.image('Bloq_mad_rectH_quem', 'assets/sprites/MaderaRectHorzQuem.png');
		this.load.image('Bloq_pied_cuad_aci', 'assets/sprites/PiedraCuadrAcido.png');
		this.load.image('Bloq_pied_trian_aci', 'assets/sprites/PiedraTrianAcido.png');
		this.load.image('Bloq_pied_rectH_aci', 'assets/sprites/PiedraRectAcido.png');
		this.load.image('Bloq_pied_rectV_aci', 'assets/sprites/PiedraRectVertAcido.png');
		this.load.image('Bloq_met_trian_oxi', 'assets/sprites/metalTrianOxido.png');
		this.load.image('Bloq_met_rectH_oxi', 'assets/sprites/metalRectOxido.png');
		this.load.image('Bloq_met_rectV_oxi', 'assets/sprites/MetalRectVertOxido.png');		
		this.load.image('Bloq_met_cuad_oxi', 'assets/sprites/metalCuadrOxido.png');

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
		
		//Fisicas
		this.load.physics('triangulo', 'assets/physics/triangulo.json');//Triangulo2.json de prueba hasta que manu suba el bueno

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
		this.state.start('MainMenu');
	}
};
