//Merge sin flechas
Game.Battle_Online = function(game){
	var SueloPirata =null;
	Objeto=function(){
		this.tipo=null;
		this.material="madera";
		this.vida=null;
		this.peso=null;
	};
	var obj;
	var construcAux;
};
var style_tiempo = {font: "200px Ultra",
				fill: "Black",
			};
var style_compra = {	font: "25px Ultra",
				fill: "Black",
			};
var style_tiempo_2 = {font: "50px Ultra",
				fill: "Black",
			};

var style_ganador={font: "150px Ultra",
				fill: "Black",
			};

var dineroJ1;
var dineroJ2;
var dineroJugadores;

var arrow;
var catchFlag = false;
var BalaCom1_J1;
var BalaCom1_J2;
var puntero;
var launchVelocityPropia = 0;
var launchVelocityRival = 0;
var auxDisparos=0;
var turno=1;
var disparos=1;
//var balaDispara=null;
var fin_tiempo=1;
//cambiar en la compra
var num_balas_fue_J1=0;
var num_balas_fue_J2=0;
var num_balas_agu_J1=0;
var num_balas_agu_J2=0;
var num_balas_aci_J1=0;
var num_balas_aci_J2=0;
var cargando_batalla=0;

var auxTiempoConstrucion=0;//contador de tiempo constr
var auxTiempoBatalla=15;//contador de tiempo batalla
//Pesos
var peso_madera=20;
var peso_piedra=40;
var peso_metal=65;
var peso_balas=0.1;
var peso_personaje=50;
//Vida
var vida_madera=20;
var vida_piedra=40;
var vida_metal=65;
var vida_personaje=10;

//Velocidad de reaparicion del cañon 
var velocidad_minima=95;

var puntuacion1=0;
var puntuacion2=0;

var juego_terminado=false;
var angulo_rotacion;
var musica;

var array=new Array();

//Datos del Jugador
var id_propio;
var id_rival;
var id_batalla;
var jugador;
//Datos pasar objeto
var objeto = {
	duenio:undefined,
	tipo_material:undefined,
	forma:undefined,
	posx:undefined,
	posy:undefined
};
var personaje = {
	duenio:undefined,
	posx:undefined,
	posy:undefined
};

var crear_objetos=0;
var crear_personajes=0;
var cont=0;
var contruccion_enemigo=new Array();
var personajes_enemigo=new Array();
var Crearpersonajes=0;

//Datos propios
var jugadorPropio={
	id:undefined,
	lado:undefined,
	Lista_Construc:undefined,
	Lista_Personajes:undefined,
	balaT:"comun",
	anguloCanon:undefined,
	BalaVelX:undefined,
	BalaVelY:undefined,
	numeroDisparos:0
}

//Datos rival
var jugadorRival={
	id:undefined,
	lado:undefined,
	Lista_Construc:undefined,
	Lista_Personajes:undefined,
	balaT:"comun",
	anguloCanon:undefined,
	BalaVelX:undefined,
	BalaVelY:undefined,
	numeroDisparos:0
}


Game.Battle_Online.prototype ={
	
	init:function(id_jugador,idjugador1,idjugador2,idBatalla){
		id_propio=id_jugador;
		id_batalla=idBatalla;
		if(id_propio==idjugador1){
			id_rival=idjugador2;
		}else{
			id_rival=idjugador1;
		}
		
		data = {
				type: 'Datos_jugadores',
				id_batalla: idBatalla
			}
		connection.send(JSON.stringify(data))

		connection.onerror = function(e) {
			console.log("WS error: " + e);
		}
		connection.onmessage = function(message) {
			console.log("WS message: " + message.data);
			var msg = JSON.parse(message.data)

			console.log('INFO BATALLA_ONLINE RECIBIDA ' + msg.type)

			switch (msg.type) {			            
				case "Datos_jugadores":
					console.log('##### BATALLA ONLINE #####')
					console.log('idjugador1: ' + msg.Batalla.jugador1.lado)
					console.log('idjugador2: ' + msg.Batalla.jugador2.lado)
					console.log('idBatalla: ' + msg.Batalla.id_batalla)
					idjugador1=msg.Batalla.jugador1.id;
					idjugador2=msg.Batalla.jugador2.id;
					idBatalla=msg.Batalla.id_batalla;
					if(id_jugador==msg.Batalla.jugador1.id){
						jugador=msg.Batalla.jugador1.lado;
					}else{
						jugador=msg.Batalla.jugador2.lado;
					}
					break
			}
		}
		connection.onclose = function() {
			console.log("Closing socket");
		}
		
		/*Seleccion lado*/
		/*$.ajax({
			type: 'GET',
			url:"/datos_jugadores",
			headers: {
				"Content-type": "application/json"
			}
			}).done(function(info_jugadores) {
				for(i=0;i<2;i++){
					if(info_jugadores[i].id==id_propio){
						jugador=info_jugadores[i].lado;
					}
				}
		});*/
	},


	create:function(){
		this.musica1=this.game.add.audio("batallaMusic",0.09,true);
		this.musica1.play();

		dineroJugadores=300;
		dineroJ1=dineroJugadores;
		dineroJ2=-1;
		this.construcAux=null;
		
		estado="CONSTRUCCION";
		
		obj=new Objeto();
		this.contConstJ1=0;
		this.contConstJ2=undefined;
		this.construcJ1=[];
		this.construcJ2=[];
		this.contJugJ1=0;
		this.contJugJ2=0;
		this.numJ1=0;
		this.numJ2=0;
		this.jugadoresJ1=[];
		this.jugadoresJ2=[];
		this.num0=-2;
		this.num1=-2;
		this.delayAux=0;

		this.auxX=-1;
		this.auxY=-1;


		//imagen mala orientacion
		this.image_turn =this.add.image(0, 0, "landscape");	
		//Imagen Fondo
        this.background = this.add.image(0, 0, "FondoBatalla");
        this.background.height = this.game.height;
        this.background.width = this.game.width;

		//Suelos
	    this.SueloMar2=this.add.sprite(-480, 915, 'Suelo_Mar_osc');
		this.controlmar2=0;
	    this.SueloMar1=this.add.sprite(0, 945, 'Suelo_Mar_cla');
		this.controlmar1=0;

		this.SueloPirata=this.add.sprite(0,0, 'Suelo_Pirata');
		this.SueloPirata.height = this.world.height/6;
		this.SueloPirata.width = this.world.width/3;
		this.SueloPirata.x=this.SueloPirata.width/2;
		this.SueloPirata.y=this.world.height-this.SueloPirata.height/2;

	    this.SueloVaquero=this.add.sprite(0,0,'Suelo_Vaquero');
		this.SueloVaquero.height = this.world.height/6;
		this.SueloVaquero.width = this.world.width/3;
		this.SueloVaquero.x=this.world.width-this.world.width/3+this.SueloPirata.width/2;
		this.SueloVaquero.y=this.world.height-this.SueloVaquero.height/2;

		this.physics.p2.enable(this.SueloPirata);
		this.physics.p2.enable(this.SueloVaquero);

		this.SueloPirata.body.static = true;
		this.SueloVaquero.body.static = true;
		
		//Cañones
		this.CannonPirata=this.add.sprite(0,0, 'Cannon_Pirata');
		this.CannonPirata.x=this.world.width*0.05;
		this.CannonPirata.y=(this.world.height- this.CannonPirata.height)*0.42;
		this.CannonVaquero=this.add.sprite(0,0, 'Cannon_Vaquero');	    
		this.CannonVaquero.x=this.world.width- (this.CannonVaquero.height/2)*1.2;    
		this.CannonVaquero.y=(this.world.height- this.CannonVaquero.height)*0.46;	    
		this.CannonVaquero.anchor.setTo(0.85, 0.65);
		this.CannonPirata.anchor.setTo(0.15, 0.35);		

		//Cargar los objetos del estado batalla. 0 inputs, 0 outputs
		this.cargar_batalla = function (){
			//Activar lanzamiento desde el fondo de la pantalla
			this.background.inputEnabled = true;
			this.background.input.start(0, true);
			this.angulo2=0;
			this.angulo1=0;
			this.game.physics.p2.setBoundsToWorld();

			//Marcador
			this.Marcador=this.add.sprite(637, 0, 'MarcadorOn');
			this.CartelVaqueros=this.add.sprite(1040, 35, 'CartelVaqueros');
			this.CartelPiratas=this.add.sprite(670, 35, 'CartelPiratas');
			this.CartelVaqueros.tint=0.4 * 0xffffff;

			//Fisicas Cañon
			this.game.physics.arcade.enable([this.CannonPirata, this.CannonVaquero]);
			this.CannonPirata.body.moves = false;
			this.CannonVaquero.body.moves = false;

			//Flechas de lanzamiento
			arrow = this.add.sprite(200, 450, 'arrow');
			arrow.anchor.setTo(0.1, 0.5);
			arrow.alpha = 0;

			analog = this.add.sprite(200, 450, 'analog');
			analog.width = 8;
			analog.rotation = 220;
			analog.alpha = 0;
			analog.anchor.setTo(0.5, 0.0);
			
			//Botones balas
			button_BalaComun = this.add.button(100, 20, 'BotonBala', this.selector_bala, this, 2, 1, 0);
			this.imagen_BalaComun=this.add.sprite(105, 23, 'balaComun');
			button_BalaComun.tipo='comun';
			button_BalaComun.tint=0.78 * 0xffffff;
			
			button_BalaAgua = this.add.button(200, 20, 'BotonBala', this.selector_bala, this, 2, 1, 0);
			this.imagen_BalaComun=this.add.sprite(205, 23, 'balaAgua');
			button_BalaAgua.tipo='agua';
			text_num_balas_agu=this.game.add.text(260, 65, num_balas_agu_J1, style_compra);
			
			button_BalaFuego = this.add.button(300, 20, 'BotonBala', this.selector_bala, this, 2, 1, 0);
			this.imagen_BalaComun=this.add.sprite(305, 23, 'balaFuego');
			button_BalaFuego.tipo='fuego';
			text_num_balas_fue=this.game.add.text(360, 65, num_balas_fue_J1, style_compra);
			
			button_BalaAcido = this.add.button(400, 20, 'BotonBala', this.selector_bala, this, 2, 1, 0);
			this.imagen_BalaComun=this.add.sprite(405, 23, 'balaAcido');
			button_BalaAcido.tipo='acido';
			text_num_balas_aci=this.game.add.text(460, 65, num_balas_aci_J1, style_compra);

			this.CannonVaquero.bringToTop();
			this.CannonPirata.bringToTop();
			this.SueloPirata.bringToTop();
			this.SueloVaquero.bringToTop();
			if(num_balas_agu_J1==0){
				button_BalaAgua.inputEnabled = false;
				button_BalaAgua.tint=0.4 * 0xffffff;
			}else{
				button_BalaAgua.inputEnabled = true;
				button_BalaAgua.tint=1 * 0xffffff;
			}				
			if(num_balas_fue_J1==0){
				button_BalaFuego.inputEnabled = false;
				button_BalaFuego.tint=0.4 * 0xffffff;
			}else{
				button_BalaFuego.inputEnabled = true;
				button_BalaFuego.tint=1 * 0xffffff;
			}				
			if(num_balas_aci_J1==0){
				button_BalaAcido.inputEnabled = false;
				button_BalaAcido.tint=0.4 * 0xffffff;
			}else{
				button_BalaAcido.inputEnabled = true;
				button_BalaAcido.tint=1 * 0xffffff;
			}
		}
		//Boton vuelta al Menu
		this.button_menu = this.add.button(this.world.centerX, 200, 'botonTipo', this.vuelta_menu, this, 2, 1, 0);
		this.button_menu.visible=false;
		this.textMenu=this.game.add.text(0, 0, "MENU", style_compra);
		this.textMenu.visible=false;

		//Boton Tipos de Objetos
		this.button_Rect_Vert = this.add.button(this.world.width/3+100, 40, 'boton_Tipo', this.create_tipo_rectV, this, 2, 1, 0);
		this.button_Rect_Vert.visible=false;
		this.textRectV=this.game.add.sprite(this.button_Rect_Vert.x+this.cache.getImage('boton_Tipo').width/2,this.button_Rect_Vert.y+5,"Bloq_mad_rectV");
		this.textRectV.anchor.setTo(0.5,0);
		this.textRectV.visible=false;
		this.button_Rect_Horz = this.add.button(this.world.width/3+100, 40+this.cache.getImage('boton_Tipo').height+5, 'boton_Tipo', this.create_tipo_rectH, this, 2, 1, 0);
		this.button_Rect_Horz.visible=false;
		this.textRectH=this.game.add.sprite(this.button_Rect_Horz.x+25,this.button_Rect_Horz.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_rectH");
		this.textRectH.anchor.setTo(0,0.5);
		this.textRectH.visible=false;
		this.button_Trian = this.add.button(this.world.width/3+100, 40+(this.cache.getImage('boton_Tipo').height+5)*2, 'boton_Tipo', this.create_tipo_trian, this, 2, 1, 0);
		this.button_Trian.visible=false;
		this.textTrian=this.game.add.sprite(this.button_Trian.x+this.cache.getImage('boton_Tipo').width/2,this.button_Trian.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_trian");
		this.textTrian.anchor.setTo(0.5,0.5);
		this.textTrian.visible=false;
		this.button_Cuad = this.add.button(this.world.width/3+100, 40+(this.cache.getImage('boton_Tipo').height+5)*3, 'boton_Tipo', this.create_tipo_cuad, this, 2, 1, 0);
		this.button_Cuad.visible=false;
		this.textCuad=this.game.add.sprite(this.button_Cuad.x+this.cache.getImage('boton_Tipo').width/2,this.button_Cuad.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_cuad");
		this.textCuad.anchor.setTo(0.5,0.5);
		this.textCuad.visible=false;

		//Boton Materiales
		this.button_Madera = this.add.button(this.button_Rect_Vert.x+this.cache.getImage('boton_Tipo').width+30, 40, 'boton_Material', this.change_material_madera, this, 2, 1, 0);
		this.button_Madera.visible=false;
		this.textMad=this.game.add.text(this.button_Madera.x+this.cache.getImage('boton_Material').width/3,this.button_Madera.y+this.cache.getImage('boton_Material').height/2,"Madera", style_compra);
		this.textMad.anchor.setTo(0.5,0.5);
		this.textMad.visible=false;
		this.precioMad=this.game.add.text(this.button_Madera.x+this.cache.getImage('boton_Material').width/3*2+10,this.textMad.y,"10$", style_compra);
		this.precioMad.anchor.setTo(0.5,0.5);
		this.precioMad.visible=false;
		this.button_Piedra = this.add.button(this.button_Madera.x, 40+this.cache.getImage('boton_Material').height+5, 'boton_Material', this.change_material_piedra, this, 2, 1, 0);
		this.button_Piedra.visible=false;
		this.textPied=this.game.add.text(this.button_Piedra.x+this.cache.getImage('boton_Material').width/3,this.button_Piedra.y+this.cache.getImage('boton_Material').height/2,"Piedra", style_compra);
		this.textPied.anchor.setTo(0.5,0.5);
		this.textPied.visible=false;
		this.precioPied=this.game.add.text(this.button_Piedra.x+this.cache.getImage('boton_Material').width/3*2+10,this.textPied.y,"20$", style_compra);
		this.precioPied.anchor.setTo(0.5,0.5);
		this.precioPied.visible=false;
		this.button_Metal = this.add.button(this.button_Madera.x, 40+(this.cache.getImage('boton_Material').height+5)*2, 'boton_Material', this.change_material_metal, this, 2, 1, 0);
		this.button_Metal.visible=false;
		this.textMet=this.game.add.text(this.button_Metal.x+this.cache.getImage('boton_Material').width/3,this.button_Metal.y+this.cache.getImage('boton_Material').height/2,"Metal", style_compra);
		this.textMet.anchor.setTo(0.5,0.5);
		this.textMet.visible=false;
		this.precioMet=this.game.add.text(this.button_Metal.x+this.cache.getImage('boton_Material').width/3*2+10,this.textMet.y,"35$", style_compra);
		this.precioMet.anchor.setTo(0.5,0.5);
		this.precioMet.visible=false;

		//Boton Tiempo
		this.cuadroTiempo=this.add.sprite(this.world.width-this.cache.getImage('cuadro_Tiempo').width,this.world.height-this.cache.getImage('cuadro_Tiempo').height,'cuadro_Tiempo');
		this.cuadroTiempo.visible=false;
		cuenta_atras=this.time.create();
		final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * auxTiempoConstrucion, this.finTiempo);
		text_cuenta_atras=this.game.add.text(this.world.width-this.cache.getImage('cuadro_Tiempo').width/2,this.world.height-this.cache.getImage('cuadro_Tiempo').height/2, '00',style_tiempo);
		text_cuenta_atras.anchor.setTo(0.5,0.5);
		text_cuenta_atras.visible=false;

		//Boton balas
		this.button_bala_fuego=this.add.button(1350,200,'BotonBala_B',this.compraBalaFuego,this,2,1,0);
		this.button_bala_fuego.anchor.setTo(0.5,0.5);
		this.button_bala_fuego.visible=false;
		this.balaF=this.game.add.sprite(this.button_bala_fuego.x-20,this.button_bala_fuego.y-10,"balaFuego");
		this.balaF.anchor.setTo(0.5,0.5);
		this.balaF.visible=false;
		this.textBFue=this.add.text(this.button_bala_fuego.x,this.button_bala_fuego.y+50,num_balas_fue_J1, style_compra);
		this.textBFue.anchor.setTo(0.5,0.5);
		this.textBFue.visible=false;
		this.precioBFue=this.game.add.text(this.button_bala_fuego.x+this.cache.getImage("BotonBala_B").width/3-5,this.button_bala_fuego.y-this.cache.getImage("BotonBala_B").height/3,"15$", style_compra);
		this.precioBFue.anchor.setTo(0.5,0.5);
		this.precioBFue.visible=false;
		this.button_bala_agua=this.add.button(1350+20+this.cache.getImage('BotonBala_B').width,200,'BotonBala_B',this.compraBalaAgua,this,2,1,0);
		this.button_bala_agua.anchor.setTo(0.5,0.5);
		this.button_bala_agua.visible=false;
		this.balaAg=this.game.add.sprite(this.button_bala_agua.x-20,this.button_bala_agua.y-10,"balaAgua");
		this.balaAg.anchor.setTo(0.5,0.5);
		this.balaAg.visible=false;
		this.textBAgu=this.add.text(this.button_bala_agua.x,this.button_bala_agua.y+50,num_balas_agu_J1, style_compra);
		this.textBAgu.anchor.setTo(0.5,0.5);
		this.textBAgu.visible=false;
		this.precioBAgu=this.add.text(this.button_bala_agua.x+this.cache.getImage("BotonBala_B").width/3-5,this.button_bala_agua.y-this.cache.getImage("BotonBala_B").height/3,"30$", style_compra);
		this.precioBAgu.anchor.setTo(0.5,0.5);
		this.precioBAgu.visible=false;
		this.button_bala_acido=this.add.button(1350+(20+this.cache.getImage('BotonBala_B').width)*2,200,'BotonBala_B',this.compraBalaAcido,this,2,1,0);
		this.button_bala_acido.anchor.setTo(0.5,0.5);
		this.button_bala_acido.visible=false;
		this.balaAc=this.game.add.sprite(this.button_bala_acido.x-20,this.button_bala_acido.y-10,"balaAcido");
		this.balaAc.anchor.setTo(0.5,0.5);
		this.balaAc.visible=false;
		this.textBAci=this.add.text(this.button_bala_acido.x,this.button_bala_acido.y+50,num_balas_aci_J1, style_compra);
		this.textBAci.anchor.setTo(0.5,0.5);
		this.textBAci.visible=false;
		this.precioBAci=this.add.text(this.button_bala_acido.x+this.cache.getImage("BotonBala_B").width/3-5,this.button_bala_acido.y-this.cache.getImage("BotonBala_B").height/3,"50$", style_compra);
		this.precioBAci.anchor.setTo(0.5,0.5);
		this.precioBAci.visible=false;

		//Boton personaje
		this.button_Jugador=this.add.sprite(this.button_Madera.x+20,this.button_Trian.y,'botonPersonaje');
		this.button_Jugador.visible=false;
		this.cartel=this.add.sprite(this.button_Jugador.x+this.cache.getImage("botonPersonaje").width/2,this.button_Jugador.y+this.cache.getImage("botonPersonaje").height+this.cache.getImage("CartelPiratas").height/2,'CartelPiratas');
		this.cartel.anchor.setTo(0.5,0.5);
		this.cartel.visible=false;
		this.personaje=this.game.add.sprite(this.button_Jugador.x+this.cache.getImage("botonPersonaje").width/2,this.button_Jugador.y+this.cache.getImage("botonPersonaje").height/2,"Pirata")
		this.personaje.anchor.setTo(0.5,0.5);
		this.personaje.visible=false;

		//Dinero
		this.dineroMarc=this.add.sprite(1500,40,'BotonDinero');
		this.dineroMarc.anchor.setTo(0.5,0.5);
		this.dineroMarc.visible=false;
		this.textDinero=this.add.text(this.dineroMarc.x,this.dineroMarc.y,dineroJ1, style_compra);
		this.textDinero.anchor.setTo(0.7,0.5);
		this.textDinero.visible=false;

		//Telon					 
		this.telon=this.add.sprite(960,540,'telon');
		this.physics.p2.enable(this.telon);
		this.telon.body.collideWorldBounds = false;
		juego_empezado=false;
	},
	
	//Llamada por el temporizador. 0 inputs, 0 outputs.
	finTiempo:function(){
		fin_tiempo=0;
	},
	
	
	//Selector de las balas. input buttonBala, output 0.
	selector_bala:function(button){	
		if(num_balas_agu_J1==0){
			button_BalaAgua.inputEnabled = false;
			button_BalaAgua.tint=0.4 * 0xffffff;
		}else{
			button_BalaAgua.inputEnabled = true;
			button_BalaAgua.tint=1 * 0xffffff;
		}
		if(num_balas_fue_J1==0){
			button_BalaFuego.inputEnabled = false;
			button_BalaFuego.tint=0.4 * 0xffffff;
		}else{
			button_BalaFuego.inputEnabled = true;
			button_BalaFuego.tint=1* 0xffffff;
		}
		if(num_balas_aci_J1==0){
			button_BalaAcido.inputEnabled = false;
			button_BalaAcido.tint=0.4 * 0xffffff;
		}else{
			button_BalaAcido.inputEnabled = true;
			button_BalaAcido.tint=1 * 0xffffff;
		}
		button_BalaComun.inputEnabled = true;
		button_BalaComun.tint=1 * 0xffffff;
		
		Bala_J1.visible=false;
			switch(button.tipo){
				case 'comun':
					Bala_J1.loadTexture('balaComun');
					Bala_J1.tipo="comun";
					button_BalaComun.tint=0.78 * 0xffffff;
					break;
				case 'agua':
					Bala_J1.loadTexture('balaAgua');
					Bala_J1.tipo="agua";
					button_BalaAgua.tint=0.78 * 0xffffff;
					break;
				case 'fuego':
					Bala_J1.loadTexture('balaFuego');
					Bala_J1.tipo="fuego";
					button_BalaFuego.tint=0.78 * 0xffffff;
					break;
				case 'acido':
					Bala_J1.loadTexture('balaAcido');
					Bala_J1.tipo="acido";
					button_BalaAcido.tint=0.78 * 0xffffff;
					break;
			}

		jugadorPropio.balaT=Bala_J1.tipo;

		Bala_J1.visible=true;
	},

	//Funciones para el disparo. inputs Jugador,PosicionRaton, outputs 0.
	set:function(player,pointer) {
		if(disparos>0){
			catchFlag = true;
			Bala_J1.body.velocity.x=0;
			Bala_J1.body.velocity.y=0;
			arrow.reset(pointer.x, pointer.y);
			analog.reset(pointer.x, pointer.y);
		}
	},

	//Disparo. input PosicionRaton, output 0.
	launch:function(pointer) {
		if(disparos>0){
			jugadorPropio.numeroDisparos++;
			//limitar fuerza de disparo
			fuerza=Math.min(analog.height,600); 
			cuenta_atras.pause();
			switch(true){
				case (Bala_J1.tipo=="agua"):
					num_balas_agu_J1--;
					text_num_balas_agu.text=num_balas_agu_J1;
					break;
				case (Bala_J1.tipo=="fuego"):
					num_balas_fue_J1--;
					text_num_balas_fue.text=num_balas_fue_J1;
					break;
				case (Bala_J1.tipo=="acido"):
					num_balas_aci_J1--;
					text_num_balas_aci.text=num_balas_aci_J1;
					break;
			}
			disparos--;
			catchFlag = false;
			arrow.alpha = 0;
			analog.alpha = 0;
			if(jugador=="J1"){
				Xvector = Math.cos(Math.asin(angulo_rotacion))*Math.max(fuerza,275)*5;
				Yvector = angulo_rotacion*Math.max(fuerza,275)*5;
			}else{
				if(angulo_rotacion<0){
					angulo_rotacion=-Math.PI-angulo_rotacion;
				}else{
					angulo_rotacion=Math.PI-angulo_rotacion;
				}
				//alert(angulo_rotacion);
				Xvector = Math.cos(Math.asin(angulo_rotacion))*Math.min(-fuerza,-275)*5;
				Yvector = angulo_rotacion*Math.max(fuerza,275)*5;
			}
			Bala_J1.body.moves = true;
			Bala_J1.body.dynamic = true;
			Bala_J1.body.velocity.x=Xvector;
			Bala_J1.body.velocity.y=Yvector;
			jugadorPropio.BalaVelX=Xvector;
			jugadorPropio.BalaVelY=Yvector;
			
			if(num_balas_agu_J1==0){
				button_BalaAgua.tint=0.4 * 0xffffff;
			}else{
				button_BalaAgua.tint=1 * 0xffffff;
			}
			if(num_balas_fue_J1==0){
				button_BalaFuego.tint=0.4 * 0xffffff;
			}else{
				button_BalaFuego.tint=1* 0xffffff;
			}
			if(num_balas_aci_J1==0){
				button_BalaAcido.tint=0.4 * 0xffffff;
			}else{
				button_BalaAcido.tint=1 * 0xffffff;
			}
			button_BalaComun.tint=0.78 * 0xffffff;
			button_BalaAgua.inputEnabled = false;
			button_BalaFuego.inputEnabled = false;
			button_BalaAcido.inputEnabled = false;
			button_BalaComun.inputEnabled = false;			

			data = {
				type: 'enviar_bala',
				jugadorPropio: jugadorPropio
			}
			connection.send(JSON.stringify(data))
			/*$.ajax({
				url: '/pasar_bala',
				type: "PUT",
				data:JSON.stringify(jugadorPropio),
				dataType:'json',
				headers: {
					"Content-Type": "application/json"
				}
			}).done(function (item) {
				console.log("Item created: " + JSON.stringify(objeto));
			})*/
		}
	},
	
	//Llamada por un boton.0 inputs, 0 outputs
	compraBalaFuego:function(){
		if(fin_tiempo!=0){
			if((dineroJ1-15)>=0){
				num_balas_fue_J1++;
				dineroJ1-=15;
			}
		}
	},

	//Llamada por un boton.0 inputs, 0 outputs
	compraBalaAgua:function(){
		if(fin_tiempo!=0){
			if((dineroJ1-50)>=0){
				num_balas_agu_J1++;
				dineroJ1-=50;
			}
					}		
	},

	//Llamada por un boton.0 inputs, 0 outputs
	compraBalaAcido:function(){
		if(fin_tiempo!=0){
			if((dineroJ1-30)>=0){
				num_balas_aci_J1++;
				dineroJ1-=30;
			}
		}		
	},

	//Llamada por un boton.0 inputs, 0 outputs
	change_material_madera:function(){
		if(fin_tiempo!=0 && ((dineroJ1-10)>=0)){
			obj.material="madera";
			this.textRectV.destroy();
			this.textRectV=this.game.add.sprite(this.button_Rect_Vert.x+this.cache.getImage('boton_Tipo').width/2,this.button_Rect_Vert.y+5,"Bloq_mad_rectV");
			this.textRectV.anchor.setTo(0.5,0);
			this.textRectH.destroy();
			this.textRectH=this.game.add.sprite(this.button_Rect_Horz.x+25,this.button_Rect_Horz.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_rectH");
			this.textRectH.anchor.setTo(0,0.5);
			this.textTrian.destroy();
			this.textTrian=this.game.add.sprite(this.button_Trian.x+this.cache.getImage('boton_Tipo').width/2,this.button_Trian.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_trian");
			this.textTrian.anchor.setTo(0.5,0.5);
			this.textCuad.destroy();
			this.textCuad=this.game.add.sprite(this.button_Cuad.x+this.cache.getImage('boton_Tipo').width/2,this.button_Cuad.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_cuad");
			this.textCuad.anchor.setTo(0.5,0.5);
		}
	},

	//Llamada por un boton.0 inputs, 0 outputs
	change_material_piedra:function(){
		if(fin_tiempo!=0 && ((dineroJ1-20)>=0)){
			obj.material="piedra";
			this.textRectV.destroy();
			this.textRectV=this.game.add.sprite(this.button_Rect_Vert.x+this.cache.getImage('boton_Tipo').width/2,this.button_Rect_Vert.y+5,"Bloq_pied_rectV");
			this.textRectV.anchor.setTo(0.5,0);
			this.textRectH.destroy();
			this.textRectH=this.game.add.sprite(this.button_Rect_Horz.x+25,this.button_Rect_Horz.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_pied_rectH");
			this.textRectH.anchor.setTo(0,0.5);
			this.textTrian.destroy();
			this.textTrian=this.game.add.sprite(this.button_Trian.x+this.cache.getImage('boton_Tipo').width/2,this.button_Trian.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_pied_trian");
			this.textTrian.anchor.setTo(0.5,0.5);
			this.textCuad.destroy();
			this.textCuad=this.game.add.sprite(this.button_Cuad.x+this.cache.getImage('boton_Tipo').width/2,this.button_Cuad.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_pied_cuad");
			this.textCuad.anchor.setTo(0.5,0.5);
		}	
	},

	//Llamada por un boton.0 inputs, 0 outputs
	change_material_metal:function(){
		if(fin_tiempo!=0 && ((dineroJ1-35)>=0)){
			obj.material="metal";
			this.textRectV.destroy();
			this.textRectV=this.game.add.sprite(this.button_Rect_Vert.x+this.cache.getImage('boton_Tipo').width/2,this.button_Rect_Vert.y+5,"Bloq_met_rectV");
			this.textRectV.anchor.setTo(0.5,0);
			this.textRectH.destroy();
			this.textRectH=this.game.add.sprite(this.button_Rect_Horz.x+25,this.button_Rect_Horz.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_met_rectH");
			this.textRectH.anchor.setTo(0,0.5);
			this.textTrian.destroy();
			this.textTrian=this.game.add.sprite(this.button_Trian.x+this.cache.getImage('boton_Tipo').width/2,this.button_Trian.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_met_trian");
			this.textTrian.anchor.setTo(0.5,0.5);
			this.textCuad.destroy();
			this.textCuad=this.game.add.sprite(this.button_Cuad.x+this.cache.getImage('boton_Tipo').width/2,this.button_Cuad.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_met_cuad");
			this.textCuad.anchor.setTo(0.5,0.5);
		}
	},

	//Llamada por un boton.0 inputs, 0 outputs
	create_tipo_trian:function(){
		if(this.construcAux==null&& fin_tiempo!=0){
			if(obj.material=="madera"){
				if((dineroJ1-10)>=0){
					this.bloq_mad_trian=this.add.sprite(this.button_Trian.x,this.button_Trian.y,'Bloq_mad_trian');
					this.physics.p2.enable(this.bloq_mad_trian);
					this.physics.p2.enable(this.bloq_mad_trian,true);//ver formas
					this.bloq_mad_trian.inputEnabled=true;
					this.bloq_mad_trian.num=this.contConstJ1;
					this.bloq_mad_trian.coste=10;
					this.bloq_mad_trian.estado=1;
					this.bloq_mad_trian.forma="tri";
					this.bloq_mad_trian.tipo="madera";
					this.bloq_mad_trian.vida=vida_madera;
					this.bloq_mad_trian.body.mass=peso_madera;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_mad_trian;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}
			}
			if(obj.material=="piedra"){
				if((dineroJ1-20)>=0){
					this.bloq_pied_trian=this.add.sprite(this.button_Trian.x,this.button_Trian.y,'Bloq_pied_trian');
					this.physics.p2.enable(this.bloq_pied_trian);
					this.bloq_pied_trian.inputEnabled=true;
					this.bloq_pied_trian.num=this.contConstJ1;
					this.bloq_pied_trian.coste=20;
					this.bloq_pied_trian.estado=1;
					this.bloq_pied_trian.forma="tri";
					this.bloq_pied_trian.tipo="piedra";
					this.bloq_pied_trian.vida=vida_piedra;
					this.bloq_pied_trian.body.mass=peso_piedra;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_pied_trian;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}
			}
			if(obj.material=="metal"){
				if((dineroJ1-35)>=0){
					this.bloq_met_trian=this.add.sprite(this.button_Trian.x,this.button_Trian.y,'Bloq_met_trian');
					this.physics.p2.enable(this.bloq_met_trian);
					this.bloq_met_trian.inputEnabled=true;
					this.bloq_met_trian.num=this.contConstJ1;
					this.bloq_met_trian.coste=35;
					this.bloq_met_trian.estado=1;
					this.bloq_met_trian.forma="tri";
					this.bloq_met_trian.tipo="metal";
					this.bloq_met_trian.vida=vida_metal;
					this.bloq_met_trian.body.mass=peso_metal;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_met_trian;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}
			}
			dineroJ1-=this.construcJ1[this.contConstJ1].coste;
			this.contConstJ1++;
		}
	},

	//Llamada por un boton.0 inputs, 0 outputs
	create_tipo_cuad:function(){
		if(this.construcAux==null&& fin_tiempo!=0){
			if(obj.material=="madera"){
				if((dineroJ1-10)>=0){
					this.bloq_mad_cuad=this.add.sprite(this.button_Cuad.x,this.button_Cuad.y,'Bloq_mad_cuad');
					this.physics.p2.enable(this.bloq_mad_cuad);
					this.bloq_mad_cuad.inputEnabled=true;
					this.bloq_mad_cuad.num=this.contConstJ1;
					this.bloq_mad_cuad.coste=10;
					this.bloq_mad_cuad.estado=1;
					this.bloq_mad_cuad.forma="cuad";
					this.bloq_mad_cuad.tipo="madera";
					this.bloq_mad_cuad.vida=vida_madera;
					this.bloq_mad_cuad.body.mass=peso_madera;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_mad_cuad;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}
			}
			if(obj.material=="piedra"){
				if((dineroJ1-20)>=0){
					this.bloq_pied_cuad=this.add.sprite(this.button_Cuad.x,this.button_Cuad.y,'Bloq_pied_cuad');
					this.physics.p2.enable(this.bloq_pied_cuad);
					this.bloq_pied_cuad.inputEnabled=true;
					this.bloq_pied_cuad.num=this.contConstJ1;
					this.bloq_pied_cuad.coste=20;
					this.bloq_pied_cuad.estado=1;
					this.bloq_pied_cuad.forma="cuad";
					this.bloq_pied_cuad.tipo="piedra";
					this.bloq_pied_cuad.vida=vida_piedra;
					this.bloq_pied_cuad.body.mass=peso_piedra;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_pied_cuad;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}
			}
			if(obj.material=="metal"){
				if((dineroJ1-35)>=0){
					this.bloq_met_cuad=this.add.sprite(this.button_Cuad.x,this.button_Cuad.y,'Bloq_met_cuad');
					this.physics.p2.enable(this.bloq_met_cuad);
					this.bloq_met_cuad.inputEnabled=true;
					this.bloq_met_cuad.num=this.contConstJ1;
					this.bloq_met_cuad.coste=35;
					this.bloq_met_cuad.estado=1;
					this.bloq_met_cuad.forma="cuad";
					this.bloq_met_cuad.tipo="metal";
					this.bloq_met_cuad.vida=vida_metal;
					this.bloq_met_cuad.body.mass=peso_metal;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_met_cuad;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}
			}
			dineroJ1-=this.construcJ1[this.contConstJ1].coste;
			this.contConstJ1++;		
		}
	},

	//Llamada por un boton.0 inputs, 0 outputs
	create_tipo_rectH:function(){
		if(this.construcAux==null&& fin_tiempo!=0){
			if(obj.material=="madera"){
				if((dineroJ1-10)>=0){
					this.bloq_mad_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_mad_rectH');
					this.physics.p2.enable(this.bloq_mad_rect);
					this.bloq_mad_rect.inputEnabled=true;
					this.bloq_mad_rect.num=this.contConstJ1;
					this.bloq_mad_rect.coste=10;
					this.bloq_mad_rect.estado=1;
					this.bloq_mad_rect.forma="rect_h";
					this.bloq_mad_rect.tipo="madera";
					this.bloq_mad_rect.vida=vida_madera;
					this.bloq_mad_rect.body.mass=peso_madera;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_mad_rect;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}			
			}
			if(obj.material=="piedra"){
				if((dineroJ1-20)>=0){
					this.bloq_pied_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_pied_rectH');
					this.physics.p2.enable(this.bloq_pied_rect);
					this.bloq_pied_rect.inputEnabled=true;
					this.bloq_pied_rect.num=this.contConstJ1;
					this.bloq_pied_rect.coste=20;
					this.bloq_pied_rect.estado=1;
					this.bloq_pied_rect.forma="rect_h";
					this.bloq_pied_rect.tipo="piedra";
					this.bloq_pied_rect.vida=vida_piedra;
					this.bloq_pied_rect.body.mass=peso_piedra;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_pied_rect;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}				
			}
			if(obj.material=="metal"){
				if((dineroJ1-35)>=0){
					this.bloq_met_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_met_rectH');
					this.physics.p2.enable(this.bloq_met_rect);
					this.bloq_met_rect.inputEnabled=true;
					this.bloq_met_rect.num=this.contConstJ1;
					this.bloq_met_rect.coste=35;
					this.bloq_met_rect.estado=1;
					this.bloq_met_rect.forma="rect_h";
					this.bloq_met_rect.tipo="metal";
					this.bloq_met_rect.vida=vida_metal;
					this.bloq_met_rect.body.mass=peso_metal;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_met_rect;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}		
			}
			dineroJ1-=this.construcJ1[this.contConstJ1].coste;
			this.contConstJ1++;
		
		}
	},

	//Llamada por un boton, 0 inputs, 0 outputs
	vuelta_menu:function(){
		this.state.start('MainMenu');
	},
	//Llamada por un boton.0 inputs, 0 outputs
	create_tipo_rectV:function(){
		if(this.construcAux==null&& fin_tiempo!=0){
			this.game.physics.p2.gravity.y = 0;
			if(obj.material=="madera"){
				if((dineroJ1-10)>=0){
					this.bloq_mad_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_mad_rectV');
					this.physics.p2.enable(this.bloq_mad_rect);
					this.bloq_mad_rect.inputEnabled=true;
					this.bloq_mad_rect.num=this.contConstJ1;
					this.bloq_mad_rect.coste=10;
					this.bloq_mad_rect.estado=1;
					this.bloq_mad_rect.forma="rect_v";
					this.bloq_mad_rect.tipo="madera";
					this.bloq_mad_rect.vida=vida_madera;
					this.bloq_mad_rect.body.mass=peso_madera;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_mad_rect;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}			
			}
			if(obj.material=="piedra"){
				if((dineroJ1-20)>=0){
					this.bloq_pied_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_pied_rectV');
					this.physics.p2.enable(this.bloq_pied_rect);
					this.bloq_pied_rect.inputEnabled=true;
					this.bloq_pied_rect.num=this.contConstJ1;
					this.bloq_pied_rect.coste=20;
					this.bloq_pied_rect.estado=1;
					this.bloq_pied_rect.forma="rect_v";
					this.bloq_pied_rect.tipo="piedra";
					this.bloq_pied_rect.vida=vida_piedra;
					this.bloq_pied_rect.body.mass=peso_piedra;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_pied_rect;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}		
			}
			if(obj.material=="metal"){
				if((dineroJ1-35)>=0){
					this.bloq_met_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_met_rectV');
					this.physics.p2.enable(this.bloq_met_rect);
					this.bloq_met_rect.inputEnabled=true;
					this.bloq_met_rect.num=this.contConstJ1;
					this.bloq_met_rect.coste=35;
					this.bloq_met_rect.estado=1;
					this.bloq_met_rect.forma="rect_v";
					this.bloq_met_rect.tipo="metal";
					this.bloq_met_rect.vida=vida_metal;
					this.bloq_met_rect.body.mass=peso_metal;
					this.num0=this.contConstJ1;
					this.construcAux=this.bloq_met_rect;
					this.construcJ1[this.contConstJ1]=this.construcAux;
				}			
			}
			dineroJ1-=this.construcJ1[this.contConstJ1].coste;
			this.contConstJ1++;		
		}
	},

	//Llamada por un boton.0 inputs, 0 outputs
	crearJugador:function(){
		if(this.construcAux==null && fin_tiempo!=0){
			this.game.physics.p2.gravity.y = 0;
			if(jugador=="J1"&&this.numJ1<3){
				//this.jugador=this.add.sprite(this.button_Jugador.x,this.button_Jugador.y,'Pirata');
				this.jugador=this.add.sprite(this.button_Jugador.x,this.button_Jugador.y,'PirataMov');
				this.idle = this.jugador.animations.add('idle');  //Animacion Pirata
				this.jugador.animations.play('idle', 5, true);
				this.physics.p2.enable(this.jugador);
				this.jugador.body.mass=peso_personaje;
				this.jugador.vida=vida_personaje;
				this.jugador.estado=1;
				this.jugador.forma="personaje";
				this.jugador.inputEnabled=true;
				this.jugador.num=this.contJugJ1;
				this.num1=this.contJugJ1;
				this.construcAux=this.jugador;
				this.jugadoresJ1[this.contJugJ1]=this.construcAux;
				this.contJugJ1++;
				this.numJ1++;
			}

			if(jugador=="J2"&&this.numJ2<3){
				//this.jugador=this.add.sprite(this.button_Jugador.x,this.button_Jugador.y,'Vaquero');
				this.jugador=this.add.sprite(this.button_Jugador.x,this.button_Jugador.y,'VaqueroMov');
				this.idle = this.jugador.animations.add('idle');  //Animacion Pirata
				this.jugador.animations.play('idle', 5, true);
				this.physics.p2.enable(this.jugador);
				this.jugador.body.mass=peso_personaje;
				this.jugador.vida=vida_personaje;
				this.jugador.estado=1;
				this.jugador.forma="personaje";
				this.jugador.inputEnabled=true;
				this.jugador.num=this.contJugJ2;
				this.num1=this.contJugJ2;
				this.construcAux=this.jugador;
				this.jugadoresJ2[this.contJugJ2]=this.construcAux;
				this.contJugJ2++;
				this.numJ2++;
			}
		}
	},

	//Establece la posicion del objeto y verifica si la posicion es correcta. inputs objeto, outputs 0.
	move_sprite:function(objeto){
		objeto.body.angle=0;
		objeto.body.kinematic=true;
		if(jugador=="J1"){
			if(objeto.y+objeto.height/2<this.SueloPirata.y-this.SueloPirata.height/2 && objeto.x+objeto.width/2<this.world.width/3){
				if(objeto.y-objeto.height/2<510 && objeto.x-objeto.width/2<323){
					objeto.tint=0.4 * 0xffffff;
				}
				else{
					objeto.tint=1 * 0xffffff;
				}
			}
			else{
				objeto.tint=0.4 * 0xffffff;
			}
			for(var i=0;i<this.contConstJ1;i++){
				if(this.construcJ1[i]!=objeto){
					if(objeto.x+objeto.width/2>this.construcJ1[i].x-this.construcJ1[i].width/2 && objeto.x-objeto.width/2<this.construcJ1[i].x+this.construcJ1[i].width/2){
						if(objeto.y+objeto.height/2>this.construcJ1[i].y-this.construcJ1[i].height/2 && objeto.y-objeto.height/2<this.construcJ1[i].y+this.construcJ1[i].height/2){
							objeto.tint=0.4 * 0xffffff;
						}
					}
				}
			}
			for(var i=0;i<this.contJugJ1;i++){
				if(this.jugadoresJ1[i]!=objeto){
					if(objeto.x+objeto.width/2>this.jugadoresJ1[i].x-this.jugadoresJ1[i].width/2 && objeto.x-objeto.width/2<this.jugadoresJ1[i].x+this.jugadoresJ1[i].width/2){
						if(objeto.y+objeto.height/2>this.jugadoresJ1[i].y-this.jugadoresJ1[i].height/2 && objeto.y-objeto.height/2<this.jugadoresJ1[i].y+this.jugadoresJ1[i].height/2){
							objeto.tint=0.4 * 0xffffff;
						}
					}
				}
			}
		}

		if(jugador=="J2"){
			if(objeto.y+objeto.height/2<this.SueloVaquero.y-this.SueloVaquero.height/2 && objeto.x-objeto.width/2>this.world.width/3*2){
				if(objeto.y-objeto.height/2<510 && objeto.x+objeto.width/2>1592){
					objeto.tint=0.4 * 0xffffff;
				}
				else{
					objeto.tint=1 * 0xffffff;
				}
			}
			else{
				objeto.tint=0.4 * 0xffffff;
			}
			for(var i=0;i<this.contConstJ1;i++){
				if(this.construcJ1[i]!=objeto){
					if(objeto.x+objeto.width/2>this.construcJ1[i].x-this.construcJ1[i].width/2 && objeto.x-objeto.width/2<this.construcJ1[i].x+this.construcJ1[i].width/2){
						if(objeto.y+objeto.height/2>this.construcJ1[i].y-this.construcJ1[i].height/2 && objeto.y-objeto.height/2<this.construcJ1[i].y+this.construcJ1[i].height/2){
							objeto.tint=0.4 * 0xffffff;
						}
					}
				}
			}
			for(var i=0;i<this.contJugJ1;i++){
				if(this.jugadoresJ1[i]!=objeto){
					if(objeto.x+objeto.width/2>this.jugadoresJ1[i].x-this.jugadoresJ1[i].width/2 && objeto.x-objeto.width/2<this.jugadoresJ1[i].x+this.jugadoresJ1[i].width/2){
						if(objeto.y+objeto.height/2>this.jugadoresJ1[i].y-this.jugadoresJ1[i].height/2 && objeto.y-objeto.height/2<this.jugadoresJ1[i].y+this.jugadoresJ1[i].height/2){
							objeto.tint=0.4 * 0xffffff;
						}
					}
				}
			}
		}
		objeto.body.x=this.input.mousePointer.x;
		objeto.body.y=this.input.mousePointer.y;
	},

	//Construye el objeto si esta en la posicion correcta o lo elimina si este no lo esta. inputs 0, outputs 0.
	stop_move:function(){
		if((this.input.mousePointer.isDown && this.construcAux!=null && this.delayAux>15) ||this.construcAux!=null && fin_tiempo==0){
			this.game.physics.p2.enable(this.construcAux, true);
			this.construcAux.body.angularVelocity=0;											   
			this.construcAux.body.velocity.x=0;
			this.construcAux.body.velocity.y=0;
			this.construcAux.body.kinematic=true;

			if(this.num0>-1){
				if(this.construcJ1[this.num0].tint==0.4 * 0xffffff){
					dineroJ1+=this.construcJ1[this.num0].coste;
					this.construcJ1[this.num0].destroy();
					this.construcJ1.splice(this.num0, 1);
					this.contConstJ1--;
					this.num0=-2;
				}
				else{
					this.construcJ1[this.num0].events.onInputDown.add(this.click_sprite,this);
					this.construcJ1[this.num0].estado=0;
					//Modificar para crear forma de triangulo
					if(this.construcJ1[this.num0].forma=="tri"){
						this.construcJ1[this.num0].body.clearShapes();
						this.construcJ1[this.num0].body.loadPolygon('triangulo', 'triangulo');
					}
					this.num0=-2;
				}
				
			}
			if(this.num1>-1){
				if(this.jugadoresJ1[this.num1].tint==0.4 * 0xffffff){
					this.jugadoresJ1[this.num1].body.y=this.auxY;
					this.jugadoresJ1[this.num1].body.x=this.auxX;
					this.jugadoresJ1[this.num1].tint=1 * 0xffffff
					this.num1=-2;
				}
				else{
					this.jugadoresJ1[this.num1].events.onInputDown.add(this.click_jugador,this);
					this.num1=-2;
				}
			}
			this.construcAux=null;
		}
	},

	//establece el numero de la posicion del array del material. input objeto, output 0.
	click_sprite:function(objeto){
		if(this.num0==-2){
			this.num0=objeto.num;
			this.delayAux=0;
		}
	},
	//establece el numero de la posicion del array del jugador. input objeto, output 0.
	click_jugador:function(objeto){
		if(this.num1==-2){
			this.auxX=objeto.body.x;
			this.auxY=objeto.body.y;
			this.num1=objeto.num;
			this.delayAux=0;
		}
	},
	
	//cambia la posicion del objeto a su posicion invertida por eje y. input objeto, output 0
	espejo:function(objeto){
		this.distanciaMedio=objeto.x-(this.world.width/2);
			objeto.x=this.world.width/2-this.distanciaMedio-objeto.width;
	},

	//mira si los objetos estan dentro de los limites del mundo. input 1, output 0
	dentro_mundo:function(objeto){
		if(objeto.body.x - objeto.width/2 > this.world.width || objeto.body.x + objeto.width/2 < 0 || objeto.body.y + objeto.height/2 < 0 || objeto.body.y - objeto.height/2 > this.world.height){
			objeto.destroy();
		}
	},

	//devuelve true si todos los objetos estan parados. input 1, output 1
	movimentoParado:function(arr){
		this.Aux=true;
		for(var i=0;i<arr.length;i++){
			if(arr[i].body.velocity.x<1 && arr[i].body.velocity.x>-1){
				arr[i].body.velocity.x=0;
			}
			else{
				this.Aux= false;
			}
			if(arr[i].body.velocity.y<1 && arr[i].body.velocity.y>-1){
				arr[i].body.velocity.y=0;
			}
			else{
				this.Aux= false;
			}
		}
		return this.Aux;
	},
	
	update:function(){		
		if(jugador!=undefined && Crearpersonajes!=1){
			if(jugador=="J1"){
				//colocacion piratas
				for(var i=this.numJ1;i<3;i++){
					this.jugador=this.add.sprite(0,0,'PirataMov')
					this.idle = this.jugador.animations.add('idle');  //Animacion Pirata
					this.jugador.animations.play('idle', 5, true);
					this.jugador.x=this.jugador.width/2+this.world.width/7*(2-i);
					this.jugador.y=this.world.height-this.SueloVaquero.height-this.jugador.height/2;
					this.jugador.vida=vida_personaje;
					this.jugador.anchor.setTo(0.5,0.5);
					this.physics.p2.enable(this.jugador);
					this.jugador.body.kinematic = true;
					this.jugador.body.mass=peso_personaje;
					this.jugador.body.estado=1;
					this.jugador.tipo="personaje";
					this.jugador.inputEnabled=true;
					this.jugador.num=this.contJugJ1;
					this.num1=this.contJugJ1;
					this.construcAux=this.jugador;
					this.jugadoresJ1[this.contJugJ1]=this.construcAux;
					this.jugadoresJ1[this.contJugJ1].events.onInputDown.add(this.click_jugador,this);
					this.contJugJ1++;
					this.numJ1++;
					this.construcAux=null;
					this.num1=-2;
				}

				for(var i=this.numJ2;i<3;i++){
					this.jugador=this.add.sprite(0,0,'VaqueroMov')
					this.idle = this.jugador.animations.add('idle');  //Animacion Pirata
					this.jugador.animations.play('idle', 5, true);
					this.jugador.x=this.world.width-(this.jugador.width/2)-this.world.width/7*(2-i);
					this.jugador.y=this.world.height-this.SueloVaquero.height-this.jugador.height/2;
					this.jugador.vida=vida_personaje;
					this.jugador.anchor.setTo(0.5,0.5);
					this.physics.p2.enable(this.jugador);
					this.jugador.body.kinematic = true;
					this.jugador.body.mass=peso_personaje;
					this.jugador.tipo="personaje";
					this.jugador.body.estado=1;
					this.jugador.inputEnabled=true;
					this.jugador.num=this.contJugJ2;
					this.num1=this.contJugJ2;
					this.construcAux=this.jugador;
					this.jugadoresJ2[this.contJugJ2]=this.construcAux;
					array[this.contJugJ2]=this.construcAux;
					//this.jugadoresJ2[this.contJugJ2].events.onInputDown.add(this.click_jugador,this);
					this.contJugJ2++;
					this.numJ2++;
					this.num1=-2;
					this.construcAux=null;
				}
				//Bala J1
				Bala_J1=this.add.sprite(0,0, 'balaComun');
				Bala_J1.x=100;
				Bala_J1.y=420;
				this.physics.p2.enable(Bala_J1,true);
				Bala_J1.body.setCircle(35);
				Bala_J1.body.kinematic = true;
				Bala_J1.tipo="comun";
				Bala_J1.body.mass=peso_balas;

				//Bala J2
				Bala_J2=this.add.sprite(0,0, 'balaComun');
				Bala_J2.x=1820;
				Bala_J2.y=400;
				this.physics.p2.enable(Bala_J2,true);
				Bala_J2.body.setCircle(35);
				Bala_J2.body.kinematic = true;
				Bala_J2.body.mass=peso_balas;
				Bala_J2.tipo="comun";
			}else{
				//colocacion piratas
				for(var i=this.numJ2;i<3;i++){
					this.jugador=this.add.sprite(0,0,'PirataMov')
					this.idle = this.jugador.animations.add('idle');  //Animacion Pirata
					this.jugador.animations.play('idle', 5, true);
					this.jugador.x=this.jugador.width/2+this.world.width/7*(2-i);
					this.jugador.y=this.world.height-this.SueloVaquero.height-this.jugador.height/2;
					this.jugador.vida=vida_personaje;
					this.jugador.anchor.setTo(0.5,0.5);
					this.physics.p2.enable(this.jugador);
					this.jugador.body.kinematic = true;
					this.jugador.body.mass=peso_personaje;
					this.jugador.body.estado=1;
					this.jugador.tipo="personaje";
					this.jugador.inputEnabled=true;
					this.jugador.num=this.contJugJ2;
					this.num1=this.contJugJ2;
					this.construcAux=this.jugador;
					this.jugadoresJ2[this.contJugJ2]=this.construcAux;
					//this.jugadoresJ2[this.contJugJ2].events.onInputDown.add(this.click_jugador,this);
					this.contJugJ2++;
					this.numJ2++;
					this.construcAux=null;
					this.num1=-2;
				}

				for(var i=this.numJ1;i<3;i++){
					this.jugador=this.add.sprite(0,0,'VaqueroMov')
					this.idle = this.jugador.animations.add('idle');  //Animacion Pirata
					this.jugador.animations.play('idle', 5, true);
					this.jugador.x=this.world.width-(this.jugador.width/2)-this.world.width/7*(2-i);
					this.jugador.y=this.world.height-this.SueloVaquero.height-this.jugador.height/2;
					this.jugador.vida=vida_personaje;
					this.jugador.anchor.setTo(0.5,0.5);
					this.physics.p2.enable(this.jugador);
					this.jugador.body.kinematic = true;
					this.jugador.body.mass=peso_personaje;
					this.jugador.tipo="personaje";
					this.jugador.body.estado=1;
					this.jugador.inputEnabled=true;
					this.jugador.num=this.contJugJ1;
					this.num1=this.contJugJ1;
					this.construcAux=this.jugador;
					this.jugadoresJ1[this.contJugJ1]=this.construcAux;
					array[this.contJugJ1]=this.construcAux;
					this.jugadoresJ1[this.contJugJ1].events.onInputDown.add(this.click_jugador,this);
					this.contJugJ1++;
					this.numJ2++;
					this.num1=-2;
					this.construcAux=null;			
				}
				//Bala J1
				Bala_J1=this.add.sprite(0,0, 'balaComun');
				Bala_J1.x=1820;
				Bala_J1.y=400;
				this.physics.p2.enable(Bala_J1,true);
				Bala_J1.body.setCircle(35);
				Bala_J1.body.kinematic = true;
				Bala_J1.body.mass=peso_balas;
				Bala_J1.tipo="comun";

				//Bala J2
				Bala_J2=this.add.sprite(0,0, 'balaComun');
				Bala_J2.x=100;
				Bala_J2.y=420;
				this.physics.p2.enable(Bala_J2,true);
				Bala_J2.body.setCircle(35);
				Bala_J2.body.kinematic = true;
				Bala_J2.body.mass=peso_balas;
				Bala_J2.tipo="comun";
			}
			this.telon.bringToTop();
			Crearpersonajes=1;
			this.CannonPirata.bringToTop();
			this.CannonVaquero.bringToTop();
			this.telon.bringToTop();
		}
		
		if(this.SueloMar1.x<0 && this.controlmar1==0){
			this.SueloMar1.x+=1;
		}else{
			this.SueloMar1.x-=1;
			this.controlmar1=1;
			if(this.SueloMar1.x<-480){
				this.controlmar1=0;
			}
		};
		if(this.SueloMar2.x>-480 && this.controlmar2==0){
			this.SueloMar2.x-=1;
		}else{
			this.SueloMar2.x+=1;
			this.controlmar2=1;
			if(this.SueloMar2.x>0){
				this.controlmar2=0;
			}
		}

		if(juego_empezado==false){
			if(jugador=="J1"){
				this.telon.body.velocity.x = 360;
				this.telon.body.data.gravityScale=0;
				if(this.telon.x>=this.world.width/3+this.cache.getImage("telon").width/2){
					this.telon.body.velocity.x=0;
					juego_empezado=true;
					//Boton Tipos de Objetos
					this.button_Rect_Vert.bringToTop();
					this.button_Rect_Vert.visible=true;
					this.textRectV.bringToTop();
					this.textRectV.visible=true;
					this.button_Rect_Horz.bringToTop();
					this.button_Rect_Horz.visible=true;
					this.textRectH.bringToTop();
					this.textRectH.visible=true;
					this.button_Trian.bringToTop();
					this.button_Trian.visible=true;
					this.textTrian.bringToTop();
					this.textTrian.visible=true;
					this.button_Cuad.bringToTop();
					this.button_Cuad.visible=true;
					this.textCuad.bringToTop();
					this.textCuad.visible=true;
	
					//Boton Materiales
					this.button_Madera.bringToTop();
					this.button_Madera.visible=true;
					this.textMad.bringToTop();
					this.textMad.visible=true;
					this.precioMad.bringToTop();
					this.precioMad.visible=true;
					this.button_Piedra.bringToTop();
					this.button_Piedra.visible=true;
					this.textPied.bringToTop();
					this.textPied.visible=true;
					this.precioPied.bringToTop();
					this.precioPied.visible=true;
					this.button_Metal.bringToTop();
					this.button_Metal.visible=true;
					this.textMet.bringToTop();
					this.textMet.visible=true;
					this.precioMet.bringToTop();
					this.precioMet.visible=true;
	
					//Boton Tiempo
					this.cuadroTiempo.bringToTop();
					this.cuadroTiempo.visible=true;
					text_cuenta_atras.bringToTop();
					text_cuenta_atras.visible=true;
	
					//Boton balas
					this.button_bala_fuego.bringToTop();
					this.button_bala_fuego.visible=true;
					this.balaF.bringToTop();
					this.balaF.visible=true;
					this.textBFue.bringToTop();
					this.textBFue.visible=true;
					this.precioBFue.bringToTop();
					this.precioBFue.visible=true;
					this.button_bala_agua.bringToTop();
					this.button_bala_agua.visible=true;
					this.balaAg.bringToTop();
					this.balaAg.visible=true;
					this.textBAgu.bringToTop();
					this.textBAgu.visible=true;
					this.precioBAgu.bringToTop();
					this.precioBAgu.visible=true;
					this.button_bala_acido.bringToTop();
					this.button_bala_acido.visible=true;
					this.balaAc.bringToTop();
					this.balaAc.visible=true;
					this.textBAci.bringToTop();
					this.textBAci.visible=true;
					this.precioBAci.bringToTop();
					this.precioBAci.visible=true;
	
					//Boton personaje
					this.button_Jugador.bringToTop();
					this.button_Jugador.visible=true;
					this.cartel.bringToTop();
					this.cartel.visible=true;
					this.personaje.bringToTop();
					this.personaje.visible=true;
					
					//Dinero
					this.dineroMarc.bringToTop();
					this.dineroMarc.visible=true;
					this.textDinero.bringToTop();
					this.textDinero.visible=true;
					cuenta_atras.start();
				}
			}
			if(jugador=="J2"){
				this.telon.body.velocity.x = -360;
				this.telon.body.data.gravityScale=0;
				if(this.telon.x+this.telon.width/2<=this.world.width/3*2){
					this.telon.body.x=this.world.width/3*2-this.telon.width/2;
					this.telon.body.velocity.x = 0;
					dineroJ1=dineroJugadores;
					this.espejo(this.button_Madera);
					this.textMad.x=this.button_Madera.x+this.cache.getImage("boton_Material").width/3;
					this.precioMad.x=this.button_Madera.x+this.cache.getImage('boton_Material').width/3*2+10;
					this.espejo(this.button_Piedra);
					this.textPied.x=this.button_Piedra.x+this.cache.getImage("boton_Material").width/3;
					this.precioPied.x=this.button_Piedra.x+this.cache.getImage("boton_Material").width/3*2+10;
					this.espejo(this.button_Metal);
					this.textMet.x=this.button_Metal.x+this.cache.getImage("boton_Material").width/3;
					this.precioMet.x=this.button_Metal.x+this.cache.getImage("boton_Material").width/3*2+10;
					this.espejo(this.button_Rect_Horz);
					this.textRectH=this.game.add.sprite(this.button_Rect_Horz.x+25,this.button_Rect_Horz.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_rectH");
					this.textRectH.anchor.setTo(0,0.5);
					this.espejo(this.button_Rect_Vert);
					this.textRectV=this.game.add.sprite(this.button_Rect_Vert.x+this.cache.getImage('boton_Tipo').width/2,this.button_Rect_Vert.y+5,"Bloq_mad_rectV");
					this.textRectV.anchor.setTo(0.5,0);
					this.espejo(this.button_Trian);
					this.textTrian=this.game.add.sprite(this.button_Trian.x+this.cache.getImage('boton_Tipo').width/2,this.button_Trian.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_trian");
					this.textTrian.anchor.setTo(0.5,0.5);
					this.espejo(this.button_Cuad);
					this.textCuad=this.game.add.sprite(this.button_Cuad.x+this.cache.getImage('boton_Tipo').width/2,this.button_Cuad.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_cuad");
					this.textCuad.anchor.setTo(0.5,0.5);
					this.espejo(this.cuadroTiempo);
					this.espejo(this.button_bala_acido);
					this.balaAc.x=this.button_bala_acido.x-20;
					this.balaAc.anchor.setTo(0.5,0.5);
					this.textBAci.x=this.button_bala_acido.x;
					this.textBAci.anchor.setTo(0.5,0.5);
					this.precioBAci.x=this.button_bala_acido.x+this.cache.getImage("BotonBala_B").width/3-5;
					this.precioBAci.anchor.setTo(0.5,0.5);
					this.espejo(this.button_bala_agua);
					this.balaAg.x=this.button_bala_agua.x-20;
					this.balaAg.anchor.setTo(0.5,0.5);
					this.textBAgu.x=this.button_bala_agua.x;
					this.textBAgu.anchor.setTo(0.5,0.5);
					this.precioBAgu.x=this.button_bala_agua.x+this.cache.getImage("BotonBala_B").width/3-5;
					this.precioBAgu.anchor.setTo(0.5,0.5);
					this.espejo(this.button_bala_fuego);
					this.balaF.x=this.button_bala_fuego.x-20;
					this.balaF.anchor.setTo(0.5,0.5);
					this.textBFue.x=this.button_bala_fuego.x;
					this.textBFue.anchor.setTo(0.5,0.5);
					this.precioBFue.x=this.button_bala_fuego.x+this.cache.getImage("BotonBala_B").width/3-5;
					this.precioBFue.anchor.setTo(0.5,0.5);
					this.espejo(this.dineroMarc);
					this.espejo(this.button_Jugador);
					this.cartel=this.add.sprite(this.button_Jugador.x+this.cache.getImage("botonPersonaje").width/2,this.button_Jugador.y+this.cache.getImage("botonPersonaje").height+this.cache.getImage("CartelPiratas").height/2,'CartelVaqueros');
					this.cartel.anchor.setTo(0.5,0.5);
					this.personaje.destroy();
					this.personaje=this.game.add.sprite(this.button_Jugador.x+this.cache.getImage("botonPersonaje").width/2,this.button_Jugador.y+this.cache.getImage("botonPersonaje").height/2,"Vaquero")
					this.personaje.anchor.setTo(0.5,0.5);

					this.button_Madera.visible=true;
					this.button_Madera.bringToTop();
					this.textMad.visible=true;
					this.textMad.bringToTop();
					this.button_Piedra.visible=true;
					this.button_Piedra.bringToTop();
					this.textPied.visible=true;
					this.textPied.bringToTop();
					this.button_Metal.visible=true;
					this.button_Metal.bringToTop();
					this.textMet.visible=true;
					this.textMet.bringToTop();
					this.button_Rect_Horz.visible=true;
					this.button_Rect_Horz.bringToTop();
					this.textRectH.visible=true;
					this.textRectH.bringToTop();
					this.button_Rect_Vert.visible=true;
					this.button_Rect_Vert.bringToTop();
					this.textRectV.visible=true;
					this.textRectV.bringToTop();
					this.button_Trian.visible=true;
					this.button_Trian.bringToTop();
					this.textTrian.visible=true;
					this.textTrian.bringToTop();
					this.button_Cuad.visible=true;
					this.button_Cuad.bringToTop();
					this.textCuad.visible=true;
					this.textCuad.bringToTop();
					this.cuadroTiempo.visible=true;
					this.cuadroTiempo.bringToTop();
					this.button_bala_acido.visible=true;
					this.button_bala_acido.bringToTop();
					this.button_bala_agua.visible=true;
					this.button_bala_agua.bringToTop();
					this.button_bala_fuego.visible=true;
					this.button_bala_fuego.bringToTop();
					this.dineroMarc.visible=true;
					this.dineroMarc.bringToTop();
					this.button_Jugador.visible=true;
					this.button_Jugador.bringToTop();
					this.cartel.visible=true;
					this.cartel.bringToTop();
					text_cuenta_atras.visible=true;
					text_cuenta_atras.bringToTop();
					this.textDinero.visible=true;
					this.textDinero.bringToTop();
					this.textDinero.x=this.dineroMarc.x;
					this.textDinero.y=this.dineroMarc.y;
					this.textDinero.anchor.setTo(0.7,0.5);
					this.textBFue.visible=true;
					this.textBFue.bringToTop();
					this.textBAgu.visible=true;
					this.textBAgu.bringToTop();
					this.textBAci.visible=true;
					this.textBAci.bringToTop();
					this.balaF.visible=true;
					this.balaF.bringToTop();
					this.balaAg.visible=true;
					this.balaAg.bringToTop();
					this.balaAc.visible=true;
					this.balaAc.bringToTop();
					this.personaje.bringToTop();
					this.textCuad.bringToTop();
					this.textTrian.bringToTop();
					this.textRectV.bringToTop();
					this.textRectH.bringToTop();
					this.precioBAci.visible=true;
					this.precioBAci.bringToTop();
					this.precioBAgu.visible=true;
					this.precioBAgu.bringToTop();
					this.precioBFue.visible=true;
					this.precioBFue.bringToTop();
					this.precioPied.bringToTop();
					this.precioMet.bringToTop();
					this.precioMad.bringToTop();

					juego_empezado=true;
					text_cuenta_atras.x=this.cuadroTiempo.width/2;
					cuenta_atras.start();
				}
			}
			
		}
		else
		{
			//Inicio Actualizar cuenta atrás
			segundos="0" + Math.round((final_cuent_atras.delay - cuenta_atras.ms) / 1000);
			text_cuenta_atras.text=segundos.substr(-2); 
			//Fin  Actualizar cuenta atrás

			if(estado=="CONSTRUCCION"){
				this.game.physics.p2.gravity.y=100;
				if(fin_tiempo!=0){
					if(this.construcAux!=null){
						this.move_sprite(this.construcAux);
						if(this.delayAux>15){
							this.stop_move();
						}
					}
				}
				if(this.num0>=0){
					this.construcAux=this.construcJ1[this.num0];
				}
				if(this.num1>=0){
					this.construcAux=this.jugadoresJ1[this.num1];
				}
				if(fin_tiempo!=0){
					//Actualizacion de textos
					//alert(jugador)
					if(jugador=="J1"){
						this.textDinero.destroy();
						this.textDinero=this.add.text(this.dineroMarc.x,this.dineroMarc.y,dineroJ1, style_compra);
						this.textDinero.anchor.setTo(0.7,0.5);
						this.textBFue.destroy();
						this.textBFue=this.add.text(this.button_bala_fuego.x,this.button_bala_fuego.y+50,num_balas_fue_J1, style_compra);
						this.textBFue.anchor.setTo(0.5,0.5);
						this.textBAgu.destroy();
						this.textBAgu=this.add.text(this.button_bala_agua.x,this.button_bala_agua.y+50,num_balas_agu_J1, style_compra);
						this.textBAgu.anchor.setTo(0.5,0.5);
						this.textBAci.destroy();
						this.textBAci=this.add.text(this.button_bala_acido.x,this.button_bala_acido.y+50,num_balas_aci_J1, style_compra);
						this.textBAci.anchor.setTo(0.5,0.5);
					}
					if(jugador=="J2"){
						this.textDinero.destroy();
						this.textDinero=this.add.text(this.dineroMarc.x,this.dineroMarc.y,dineroJ1, style_compra);
						this.textDinero.anchor.setTo(0.7,0.5);
						this.textBFue.destroy();
						this.textBFue=this.add.text(this.button_bala_fuego.x,this.button_bala_fuego.y+50,num_balas_fue_J1, style_compra);
						this.textBFue.anchor.setTo(0.5,0.5);
						this.textBAgu.destroy();
						this.textBAgu=this.add.text(this.button_bala_agua.x,this.button_bala_agua.y+50,num_balas_agu_J1, style_compra);
						this.textBAgu.anchor.setTo(0.5,0.5);
						this.textBAci.destroy();
						this.textBAci=this.add.text(this.button_bala_acido.x,this.button_bala_acido.y+50,num_balas_aci_J1, style_compra);
						this.textBAci.anchor.setTo(0.5,0.5);
					}
				}
				if(fin_tiempo==0){
					this.stop_move();
					

					//enviar objetos al servidor
					if (crear_objetos==0){
						for(var i=0;i<this.contConstJ1;i++){
							objeto.duenio=id_propio;
							objeto.tipo_material=this.construcJ1[i].tipo;
							objeto.forma=this.construcJ1[i].forma;
							objeto.posx=this.construcJ1[i].x;
							objeto.posy=this.construcJ1[i].y;
							data = {
									type: 'enviar_objetos',
									objeto: objeto
								}
							connection.send(JSON.stringify(data))
							
							/*$.ajax({
								url: '/objeto_creado',
								type: "POST",
								data:JSON.stringify(objeto),
								dataType:'json',
								headers: {
									"Content-Type": "application/json"
								}
							}).done(function (item) {
								console.log("Item created: " + JSON.stringify(objeto));
							})*/
						}
						for(var i=0;i<this.contJugJ1;i++){
							personaje.duenio=id_propio;
							personaje.posx=this.jugadoresJ1[i].x;
							personaje.posy=this.jugadoresJ1[i].y;
							data = {
									type: 'enviar_personajes',
									personaje: personaje
								}
							connection.send(JSON.stringify(data))
							/*$.ajax({
								url: '/personaje_creado',
								type: "POST",
								data:JSON.stringify(personaje),
								dataType:'json',
								headers: {
									"Content-Type": "application/json"
								}
							}).done(function (item) {
								console.log("Item created: " + JSON.stringify(personaje));
							})*/
						}
						crear_personajes=1;
						crear_objetos=1;
					}

					//destruccion objetos
					this.button_Madera.destroy();
					this.textMad.destroy();
					this.button_Piedra.destroy();
					this.textPied.destroy();
					this.button_Metal.destroy();
					this.textMet.destroy();
					this.button_Rect_Horz.destroy();
					this.textRectH.destroy();
					this.button_Rect_Vert.destroy();
					this.textRectV.destroy();
					this.button_Trian.destroy();
					this.textTrian.destroy();
					this.button_Cuad.destroy();
					this.textCuad.destroy();
					this.cuadroTiempo.destroy();
					this.button_bala_acido.destroy();
					this.button_bala_agua.destroy();
					this.button_bala_fuego.destroy();
					this.dineroMarc.destroy();
					this.button_Jugador.destroy();
					this.cartel.destroy();
					text_cuenta_atras.visible=false;
					this.textDinero.destroy();
					this.textBFue.destroy();
					this.textBAgu.destroy();
					this.textBAci.destroy();
					this.precioPied.destroy();
					this.precioMet.destroy();
					this.precioMad.destroy();
					this.balaF.destroy();
					this.balaAg.destroy();
					this.balaAc.destroy();
					this.personaje.destroy();
					this.precioBAci.destroy();
					this.precioBFue.destroy();
					this.precioBAgu.destroy();					
	
					//mover el telon desde J1
					if(this.telon.x>960){
						this.telon.bringToTop();
						this.telon.body.allowGravity = false;
						this.telon.body.velocity.x=-300;
					}
					//mover el telon desde J2 
					if(this.telon.x<960){
						this.telon.body.velocity.x=300;
						this.telon.body.allowGravity = false;
						this.telon.bringToTop();
					}
					
					
					//parar el movimiento horizontal del telon
					if(this.telon.x<=963 && this.telon.x>=957){
						//Bajar construcciones rival
						if(crear_objetos==1 && crear_personajes==1){
							data = {
									type: 'cargar_enemigo',
									id_rival: id_rival
								}
							connection.send(JSON.stringify(data));

							connection.onerror = function(e) {
								console.log("WS error: " + e);
							}
							connection.onmessage = function(message) {
								console.log("WS message: " + message.data);
								var msg = JSON.parse(message.data)

								console.log('INFO BATALLA_ONLINE RECIBIDA ' + msg.type)

								switch (msg.type) {			            
									case "enemigo":
										console.log('##### BATALLA cargar objeto enemigos #####')
										for(i=0;i<msg.Enemigo.Construc.length;i++){
											console.log('##### Construye objeto #####')
											contruccion_enemigo.push({
												duenio: msg.Enemigo.Construc[i].duenio,
												tipo_material: msg.Enemigo.Construc[i].tipo_material,
												forma: msg.Enemigo.Construc[i].forma,
												posx: msg.Enemigo.Construc[i].posx,
												posy: msg.Enemigo.Construc[i].posy
											});
										}
										for(i=0;i<msg.Enemigo.Personajes.length;i++){
											personajes_enemigo.push({
												duenio: msg.Enemigo.Personajes[i].duenio,
												posx: msg.Enemigo.Personajes[i].posx,
												posy: msg.Enemigo.Personajes[i].posy
											});
										}
										crear_personajes=2;
										crear_objetos=2;
									break;
								}
							}
							connection.onclose = function() {
								console.log("Closing socket");
							}
							
							/*$.ajax({
								type: 'GET',
								url:"/cargar_objeto/"+ id_rival,
								headers: {
									"Content-type": "application/json"
								}
								}).done(function(info_construccion) {
									for(i=0;i<info_construccion.length;i++){
										contruccion_enemigo.push({
											duenio: info_construccion[i].duenio,
											tipo_material: info_construccion[i].tipo_material,
											forma: info_construccion[i].forma,
											posx: info_construccion[i].posx,
											posy: info_construccion[i].posy
										});
									}
									crear_objetos=2;
								});*/
							
							/*$.ajax({
								type: 'GET',
								url:"/cargar_personaje/"+ id_rival,
								headers: {
									"Content-type": "application/json"
								}
								}).done(function(info_construccion) {
									for(i=0;i<info_construccion.length;i++){
										personajes_enemigo.push({
											duenio: info_construccion[i].duenio,
											posx: info_construccion[i].posx,
											posy: info_construccion[i].posy
										});
									}
									crear_personajes=2;
								});*/
						}
						
						if(crear_objetos==2 && crear_personajes==2){
							for(i=0;i<personajes_enemigo.length;i++){
								this.jugadoresJ2[i].body.x=personajes_enemigo[i].posx;
								this.jugadoresJ2[i].body.y=personajes_enemigo[i].posy;
							};
							for(i=0;i<contruccion_enemigo.length;i++){
								switch(contruccion_enemigo[i].forma){
									case "tri":
										switch(contruccion_enemigo[i].tipo_material){
											case "madera":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_mad_trian');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_madera;
												construcAux.body.mass=peso_madera;
												break;
											case "metal":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_met_trian');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_metal;
												construcAux.body.mass=peso_metal;
												break;
											case "piedra":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_pied_trian');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_piedra;
												construcAux.body.mass=peso_piedra;
												break;
										}
										construcAux.body.clearShapes();
										construcAux.body.loadPolygon('triangulo', 'triangulo');
										break;
									case "cuad":
										switch(contruccion_enemigo[i].tipo_material){
											case "madera":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_mad_cuad');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_madera;
												construcAux.body.mass=peso_madera;
												break;
											case "metal":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_met_cuad');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_metal;
												construcAux.body.mass=peso_metal;
												break;
											case "piedra":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_pied_cuad');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_piedra;
												construcAux.body.mass=peso_piedra;
												break;
										}
										break;
									case "rect_h":
										switch(contruccion_enemigo[i].tipo_material){
											case "madera":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_mad_rectH');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_madera;
												construcAux.body.mass=peso_madera;
												break;
											case "metal":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_met_rectH');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_metal;
												construcAux.body.mass=peso_metal;
												break;
											case "piedra":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_pied_rectH');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_piedra;
												construcAux.body.mass=peso_piedra;
												break;
										}
										break;
									case "rect_v":
										switch(contruccion_enemigo[i].tipo_material){
											case "madera":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_mad_rectV');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_madera;
												construcAux.body.mass=peso_madera;
												break;
											case "metal":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_met_rectV');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_metal;
												construcAux.body.mass=peso_metal;
												break;
											case "piedra":
												construcAux=this.add.sprite(contruccion_enemigo[i].posx,contruccion_enemigo[i].posy,'Bloq_pied_rectV');
												this.physics.p2.enable(construcAux);
												construcAux.vida=vida_piedra;
												construcAux.body.mass=peso_piedra;
												break;
										}
										break;
								};
								//construcciones enemigo
										
								construcAux.num=i;
								construcAux.coste=0;
								construcAux.estado=1;
								construcAux.forma=contruccion_enemigo[i].forma;
								construcAux.tipo=contruccion_enemigo[i].tipo;
								this.construcJ2[i]=construcAux;
								this.construcJ2[i].body.kinematic=true;
								this.contConstJ2=i;
							}
							crear_objetos=3;
						}

						this.telon.body.velocity.x=0;
						this.telon.body.velocity.y=-300;
						if(cargando_batalla==0 && crear_objetos==3){
							this.cargar_batalla();
							cargando_batalla++;
							this.telon.bringToTop();
							this.game.physics.p2.gravity.y = 100;
						}
					}
					
					if(this.telon.y<=-1080){
						this.telon.destroy();
						
						fin_tiempo=1;
						//tiempo cuenta atras
						cuenta_atras.destroy();
						cuenta_atras=this.time.create();
						final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * auxTiempoBatalla, this.finTiempo);
						text_cuenta_atras.visible=false;
						if(this.contConstJ2!=undefined){
							this.contConstJ2++;
						}
						estado="PREBATALLA";
						cuenta_atras.start();
						this.delayAux=0;
					}
				}
				this.delayAux++;
		}
		if(estado=="PREBATALLA"){

			jugadorPropio.id=id_propio;
			jugadorPropio.lado=jugador;

			jugadorRival.id=id_rival;
			jugadorRival.lado=jugador;

			if(disparos==0){
				button_BalaAgua.inputEnabled = false;
				button_BalaComun.inputEnabled = false;
				button_BalaFuego.inputEnabled = false;
				button_BalaAcido.inputEnabled = false;
			}
			this.game.physics.p2.gravity.y = 1000;
			for(var i=0;i<this.contConstJ1;i++){
				this.construcJ1[i].body.dynamic=true;
			}
			//alert(this.contConstJ2);
			for(var i=0;i<this.contConstJ2;i++){
				this.construcJ2[i].body.dynamic=true;
			}
			for(var i=0;i<this.contJugJ1;i++){
				this.jugadoresJ1[i].body.dynamic=true;
			}
			for(var i=0;i<this.contJugJ2;i++){
				this.jugadoresJ2[i].body.dynamic=true;
			}
			if(this.movimentoParado(this.construcJ1) && this.movimentoParado(this.construcJ2) && this.movimentoParado(this.jugadoresJ1) && this.movimentoParado(this.jugadoresJ2)){
				estado="BATALLA";
				this.background.events.onInputDown.add(this.set);
				this.background.events.onInputUp.add(this.launch);
				this.CannonVaquero.scale.x *= -1;
				this.CannonVaquero.scale.y *= -1;
			}
		}

		if(estado=="BATALLA"){
			/******************/
			data = {
					type: 'cargar_enemigo',
					id_rival: id_rival
				}
			connection.send(JSON.stringify(data));			
			
			connection.onerror = function(e) {
				console.log("WS error: " + e);
			}
			connection.onmessage = function(message) {
				console.log("WS message: " + message.data);
				var msg = JSON.parse(message.data)

				console.log('INFO BATALLA_ONLINE BATALLA ' + msg.type)

				switch (msg.type) {
					case "enemigo":
						console.log('##### BATALLA cargar objeto enemigos #####')
						console.log('Velocidad X:'+msg.Enemigo.BalaVelX)
						console.log('Velocidad X:'+msg.Enemigo.BalaVelY)
						console.log('Velocidad X:'+msg.Enemigo.balaT)
						console.log('Velocidad X:'+msg.Enemigo.numeroDisparos)
						auxDisparos=msg.Enemigo.numeroDisparos;
						Xvector=msg.Enemigo.BalaVelX;
						Yvector=msg.Enemigo.BalaVelY;
						jugadorRival.anguloCanon=msg.Enemigo.anguloCanon;
						jugadorRival.balaT=msg.Enemigo.balaT;
						Bala_J2.tipo=msg.Enemigo.balaT;
						switch(jugadorRival.balaT){
							case "comun":
								Bala_J2.loadTexture('balaComun');
								break;
							case "agua":
								Bala_J2.loadTexture('balaAgua');
								break;
							case "acido":
								Bala_J2.loadTexture('balaAcido');
								break;
							case "fuego":
								Bala_J2.loadTexture('balaFuego');
								break;
						}
						if(jugadorRival.numeroDisparos<msg.Enemigo.numeroDisparos){
							//alert(msg.Enemigo.BalaVelX);
							jugadorRival.numeroDisparos=msg.Enemigo.numeroDisparos;
							Bala_J2.body.dynamic = true;
							Bala_J2.body.velocity.x=msg.Enemigo.BalaVelX;
							Bala_J2.body.velocity.y=msg.Enemigo.BalaVelY;
							//alert(Bala_J2.body.velocity.x);
						}
					break;
				}
			}
			connection.onclose = function() {
				console.log("Closing socket");
			}
			
			
			/*$.ajax({
				type: 'GET',
				url:"/cargar_numDisparos/num_dis" + id_rival,
				headers: {
					"Content-type": "application/json"
				}
				}).done(function(rival) {
					auxDisparos=rival.numeroDisparos;
					Xvector=rival.BalaVelX;
					Yvector=rival.BalaVelY;
					jugadorRival.anguloCanon=rival.anguloCanon;
					jugadorRival.balaT=rival.balaT;
					Bala_J2.tipo=rival.balaT;
					switch(jugadorRival.balaT){
						case "comun":
							Bala_J2.loadTexture('balaComun');
							break;
						case "agua":
							Bala_J2.loadTexture('balaAgua');
							break;
						case "acido":
							Bala_J2.loadTexture('balaAcido');
							break;
						case "fuego":
							Bala_J2.loadTexture('balaFuego');
							break;
					}
				})*/
			if(jugador=="J1"){
				jugadorPropio.anguloCanon=this.CannonPirata.rotation;
				this.CannonVaquero.destroy();
				this.CannonVaquero=this.add.sprite(0,0, 'Cannon_Vaquero');	    
				this.CannonVaquero.x=this.world.width- (this.CannonVaquero.height/2)*1.2;    
				this.CannonVaquero.y=(this.world.height- this.CannonVaquero.height)*0.46;	    
				this.CannonVaquero.anchor.setTo(0.85, 0.65);
				this.CannonVaquero.scale.x *= -1;
				this.CannonVaquero.scale.y *= -1;
				this.game.physics.arcade.enable([this.CannonVaquero]);
				this.CannonVaquero.rotation=jugadorRival.anguloCanon;
			}
			else{
				jugadorPropio.anguloCanon=this.CannonVaquero.rotation;
				this.CannonPirata.destroy();
				this.CannonPirata=this.add.sprite(0,0, 'Cannon_Pirata');
				this.CannonPirata.x=this.world.width*0.05;
				this.CannonPirata.y=(this.world.height- this.CannonPirata.height)*0.42;
				this.CannonPirata.anchor.setTo(0.15, 0.35);
				this.game.physics.arcade.enable([this.CannonPirata]);
				this.CannonPirata.rotation=jugadorRival.anguloCanon;
			}
			data = {
				type: 'enviar_angulo_canon',
				jugadorPropio: jugadorPropio
			}
			connection.send(JSON.stringify(data))
			/*$.ajax({
				url: '/pasar_angulo_canon',
				type: "PUT",
				data:JSON.stringify(jugadorPropio),
				dataType:'json',
				headers: {
					"Content-Type": "application/json"
				}
			}).done(function (item) {
				console.log("Item created: " + JSON.stringify(objeto));
			})*/

			/*Inicio Eliminacion choques con costrucciones propias*/
			if(jugador=="J1"){
				if(Bala_J1.body.x<this.world.width/2 && Bala_J1.body.collideWorldBounds == true){
					Bala_J1.body.collideWorldBounds = false;
				}
				if(Bala_J2.body.x>this.world.width/2 && Bala_J2.body.collideWorldBounds == true){
					Bala_J2.body.collideWorldBounds = false;
				}
				if(Bala_J1.body.x>=this.world.width/2 && Bala_J1.body.collideWorldBounds == false){
					tipo_J1=Bala_J1.tipo;
					X_J1=Bala_J1.body.x;
					Y_J1=Bala_J1.body.y;
					vel_X_J1=Bala_J1.body.velocity.x;
					vel_Y_J1=Bala_J1.body.velocity.y;
					Bala_J1.destroy();
					switch(tipo_J1){
						case 'comun':
							Bala_J1=this.add.sprite(0,0, 'balaComun');
						break;
						case 'agua':
							Bala_J1=this.add.sprite(0,0, 'balaAgua');
						break;
						case 'fuego':
							Bala_J1=this.add.sprite(0,0, 'balaFuego');
						break;
						case 'acido':
							Bala_J1=this.add.sprite(0,0, 'balaAcido');
						break;
					}
					this.physics.p2.enable(Bala_J1,true);
					Bala_J1.body.collideWorldBounds = true;
					Bala_J1.body.velocity.x=vel_X_J1;
					Bala_J1.body.velocity.y=vel_Y_J1;
					Bala_J1.body.x=X_J1;
					Bala_J1.body.y=Y_J1;
					Bala_J1.body.setCircle(35);
					Bala_J1.tipo=tipo_J1;
					Bala_J1.body.mass=peso_balas;
					for(var i=0;i<this.contJugJ2;i++){
						this.jugadoresJ2[i].body.createBodyCallback(Bala_J1, this.colision, this);
					}
					for(var i=0;i<this.contConstJ2;i++){
						this.construcJ2[i].body.createBodyCallback(Bala_J1, this.colision, this);
					}
					this.CannonVaquero.bringToTop();
					this.CannonPirata.bringToTop();
				}
				if(Bala_J2.body.x<=this.world.width/2 && Bala_J2.body.collideWorldBounds == false){
					tipo_J2=Bala_J2.tipo;
					X_J2=Bala_J2.body.x;
					Y_J2=Bala_J2.body.y;
					vel_X_J2=Bala_J2.body.velocity.x;
					vel_Y_J2=Bala_J2.body.velocity.y;
					Bala_J2.destroy();
					switch(tipo_J2){
						case 'comun':
							Bala_J2=this.add.sprite(0,0, 'balaComun');
						break;
						case 'agua':
							Bala_J2=this.add.sprite(0,0, 'balaAgua');
						break;
						case 'fuego':
							Bala_J2=this.add.sprite(0,0, 'balaFuego');
						break;
						case 'acido':
							Bala_J2=this.add.sprite(0,0, 'balaAcido');
						break;
					}
					this.physics.p2.enable(Bala_J2,true);
					Bala_J2.body.collideWorldBounds = true;
					Bala_J2.body.velocity.x=vel_X_J2;
					Bala_J2.body.velocity.y=vel_Y_J2;
					Bala_J2.body.x=X_J2;
					Bala_J2.body.y=Y_J2;
					Bala_J2.body.setCircle(35);
					Bala_J2.tipo=tipo_J2;
					Bala_J2.body.mass=peso_balas;
					for(var i=0;i<this.contJugJ1;i++){
						this.jugadoresJ1[i].body.createBodyCallback(Bala_J2, this.colision, this);
					}
					for(var i=0;i<this.contConstJ1;i++){
						this.construcJ1[i].body.createBodyCallback(Bala_J2, this.colision, this);
					}
					this.CannonVaquero.bringToTop();
					this.CannonPirata.bringToTop();
				}
			}
			if(jugador=="J2"){
				if(Bala_J2.body.x<this.world.width/2 && Bala_J2.body.collideWorldBounds == true){
					Bala_J2.body.collideWorldBounds = false;
				}
				if(Bala_J1.body.x>this.world.width/2 && Bala_J1.body.collideWorldBounds == true){
					Bala_J1.body.collideWorldBounds = false;
				}
				if(Bala_J2.body.x>=this.world.width/2 && Bala_J2.body.collideWorldBounds == false){
					tipo_J2=Bala_J2.tipo;
					X_J2=Bala_J2.body.x;
					Y_J2=Bala_J2.body.y;
					vel_X_J2=Bala_J2.body.velocity.x;
					vel_Y_J2=Bala_J2.body.velocity.y;
					Bala_J2.destroy();
					switch(tipo_J2){
						case 'comun':
							Bala_J2=this.add.sprite(0,0, 'balaComun');
						break;
						case 'agua':
							Bala_J2=this.add.sprite(0,0, 'balaAgua');
						break;
						case 'fuego':
							Bala_J2=this.add.sprite(0,0, 'balaFuego');
						break;
						case 'acido':
							Bala_J2=this.add.sprite(0,0, 'balaAcido');
						break;
					}
					this.physics.p2.enable(Bala_J2,true);
					Bala_J2.body.collideWorldBounds = true;
					Bala_J2.body.velocity.x=vel_X_J2;
					Bala_J2.body.velocity.y=vel_Y_J2;
					Bala_J2.body.x=X_J2;
					Bala_J2.body.y=Y_J2;
					Bala_J2.body.setCircle(35);
					Bala_J2.tipo=tipo_J2;
					Bala_J2.body.mass=peso_balas;
					for(var i=0;i<this.contJugJ1;i++){
						this.jugadoresJ1[i].body.createBodyCallback(Bala_J2, this.colision, this);
					}
					for(var i=0;i<this.contConstJ1;i++){
						this.construcJ1[i].body.createBodyCallback(Bala_J2, this.colision, this);
					}
					this.CannonVaquero.bringToTop();
					this.CannonPirata.bringToTop();
				}
				if(Bala_J1.body.x<=this.world.width/2 && Bala_J1.body.collideWorldBounds == false){
					tipo_J1=Bala_J1.tipo;
					X_J1=Bala_J1.body.x;
					Y_J1=Bala_J1.body.y;
					vel_X_J1=Bala_J1.body.velocity.x;
					vel_Y_J1=Bala_J1.body.velocity.y;
					Bala_J1.destroy();
					switch(tipo_J1){
						case 'comun':
							Bala_J1=this.add.sprite(0,0, 'balaComun');
						break;
						case 'agua':
							Bala_J1=this.add.sprite(0,0, 'balaAgua');
						break;
						case 'fuego':
							Bala_J1=this.add.sprite(0,0, 'balaFuego');
						break;
						case 'acido':
							Bala_J1=this.add.sprite(0,0, 'balaAcido');
						break;
					}
					this.physics.p2.enable(Bala_J1,true);
					Bala_J1.body.collideWorldBounds = true;
					Bala_J1.body.velocity.x=vel_X_J1;
					Bala_J1.body.velocity.y=vel_Y_J1;
					Bala_J1.body.x=X_J1;
					Bala_J1.body.y=Y_J1;
					Bala_J1.body.setCircle(35);
					Bala_J1.tipo=tipo_J1;
					Bala_J1.body.mass=peso_balas;
					for(var i=0;i<this.contJugJ2;i++){
						this.jugadoresJ2[i].body.createBodyCallback(Bala_J1, this.colision, this);
					}
					for(var i=0;i<this.contConstJ2;i++){
						this.construcJ2[i].body.createBodyCallback(Bala_J1, this.colision, this);
					}
					this.CannonVaquero.bringToTop();
					this.CannonPirata.bringToTop();
				}
			}
			/*Fin Eliminacion choques con costrucciones propias*/
			this.SueloMar2.bringToTop();
			this.SueloMar1.bringToTop();
			this.SueloPirata.bringToTop();
			this.SueloVaquero.bringToTop();
			
			
			Bala_J1.body.gravity.y=2000;
			//CONTROL DESTRUCCION
			if(jugador=="J1"){
				for(var i=0;i<this.contConstJ2;i++){
					if(this.construcJ2[i].vida<=0 || this.construcJ2[i].body.x<this.world.width/3 || this.construcJ2[i].body.y>=this.world.height/10*8.5 ){
						this.expl = this.add.sprite(this.construcJ2[i].body.x-30,this.construcJ2[i].body.y-30,'Explosion');
						this.secExpl = this.expl.animations.add('secExpl');  //Animacion explosion
						this.expl.animations.play('secExpl', 15, false, true);
						this.construcJ2[i].destroy();
						this.construcJ2[i].estado=0;
						this.construcJ2.splice(i, 1);
						this.contConstJ2--;
					}
				}
				for(var i=0;i<this.contJugJ2;i++){
					if((this.jugadoresJ2[i].vida<=0 || this.jugadoresJ2[i].body.x<this.world.width/3 || this.jugadoresJ2[i].body.y>=this.world.height/10*8.5 ) && this.jugadoresJ2[i].estado!=0){
						this.expl = this.add.sprite(this.jugadoresJ2[i].body.x-30,this.jugadoresJ2[i].body.y-30,'Explosion');
						this.secExpl = this.expl.animations.add('secExpl');  //Animacion explosion
						this.expl.animations.play('secExpl', 15, false, true);
						this.jugadoresJ2[i].destroy();
						this.jugadoresJ2[i].estado=0;
						this.jugadoresJ2.splice(i, 1);
						this.contJugJ2--;
						puntuacion1++;
					}
				}
				for(var i=0;i<this.contConstJ1;i++){
					if(this.construcJ1[i].vida<=0 || this.construcJ1[i].body.x>this.world.width/3*2 || this.construcJ1[i].body.y>=this.world.height/10*8.5 ){
						this.expl = this.add.sprite(this.construcJ1[i].body.x-30,this.construcJ1[i].body.y-30,'Explosion');
						this.secExpl = this.expl.animations.add('secExpl');  //Animacion explosion
						this.expl.animations.play('secExpl', 15, false, true);
						this.construcJ1[i].destroy();
						this.construcJ1[i].estado=0;
						this.construcJ1.splice(i, 1);
						this.contConstJ1--;
					}
				}
				for(var i=0;i<this.contJugJ1;i++){
					if((this.jugadoresJ1[i].vida<=0 || this.jugadoresJ1[i].body.x>this.world.width/3*2 || this.jugadoresJ1[i].body.y>=this.world.height/10*8.5 ) && this.jugadoresJ1[i].estado!=0){
						this.expl = this.add.sprite(this.jugadoresJ1[i].body.x-30,this.jugadoresJ1[i].body.y-30,'Explosion');
						this.secExpl = this.expl.animations.add('secExpl');  //Animacion explosion
						this.expl.animations.play('secExpl', 15, false, true);
						this.jugadoresJ1[i].destroy();
						this.jugadoresJ1[i].estado=0;
						this.jugadoresJ1.splice(i, 1);
						this.contJugJ1--;
						puntuacion2++;
					}
				}
			}
			if(jugador=="J2"){
				for(var i=0;i<this.contConstJ1;i++){
					if(this.construcJ1[i].vida<=0 || this.construcJ1[i].body.x<this.world.width/3 || this.construcJ1[i].body.y>=this.world.height/10*8.5 ){
						this.expl = this.add.sprite(this.construcJ1[i].body.x-30,this.construcJ1[i].body.y-30,'Explosion');
						this.secExpl = this.expl.animations.add('secExpl');  //Animacion explosion
						this.expl.animations.play('secExpl', 15, false, true);
						this.construcJ1[i].destroy();
						this.construcJ1[i].estado=0;
						this.construcJ1.splice(i, 1);
						this.contConstJ1--;
					}
				}
				for(var i=0;i<this.contJugJ1;i++){
					if((this.jugadoresJ1[i].vida<=0 || this.jugadoresJ1[i].body.x<this.world.width/3 || this.jugadoresJ1[i].body.y>=this.world.height/10*8.5 ) && this.jugadoresJ1[i].estado!=0){
						this.expl = this.add.sprite(this.jugadoresJ1[i].body.x-30,this.jugadoresJ1[i].body.y-30,'Explosion');
						this.secExpl = this.expl.animations.add('secExpl');  //Animacion explosion
						this.expl.animations.play('secExpl', 15, false, true);
						this.jugadoresJ1[i].destroy();
						this.jugadoresJ1[i].estado=0;
						this.jugadoresJ1.splice(i, 1);
						this.contJugJ1--;
						puntuacion2++;
					}
				}
				for(var i=0;i<this.contConstJ2;i++){
					if(this.construcJ2[i].vida<=0 || this.construcJ2[i].body.x>this.world.width/3*2 || this.construcJ2[i].body.y>=this.world.height/10*8.5 ){
						this.expl = this.add.sprite(this.construcJ2[i].body.x-30,this.construcJ2[i].body.y-30,'Explosion');
						this.secExpl = this.expl.animations.add('secExpl');  //Animacion explosion
						this.expl.animations.play('secExpl', 15, false, true);
						this.construcJ2[i].destroy();
						this.construcJ2[i].estado=0;
						this.construcJ2.splice(i, 1);
						this.contConstJ2--;
					}
				}
				for(var i=0;i<this.contJugJ2;i++){
					if((this.jugadoresJ2[i].vida<=0 || this.jugadoresJ2[i].body.x>this.world.width/3*2 || this.jugadoresJ2[i].body.y>=this.world.height/10*8.5 ) && this.jugadoresJ2[i].estado!=0){
						this.expl = this.add.sprite(this.jugadoresJ2[i].body.x-30,this.jugadoresJ2[i].body.y-30,'Explosion');
						this.secExpl = this.expl.animations.add('secExpl');  //Animacion explosion
						this.expl.animations.play('secExpl', 15, false, true);
						this.jugadoresJ2[i].destroy();
						this.jugadoresJ2[i].estado=0;
						this.jugadoresJ2.splice(i, 1);
						this.contJugJ2--;
						puntuacion1++;
					}
				}
			}
			
			//FIN CONTROL DESTRUCCION			
			
			//CONTROL FINAL JUEGO
			if(puntuacion1==3 || puntuacion2==3){
				Bala_J1.x=2000;
				Bala_J1.y=2000;
				Bala_J2.x=-2000;
				Bala_J2.y=-2000;
				this.telon=this.add.sprite(-40,-1080,'telon');
				this.physics.enable(this.telon, Phaser.Physics.p2);
				this.game.physics.p2.gravity.y = 0;
				this.telon.body.velocity.setTo(0, +300);
				this.delayAux=0;
				if(puntuacion1==3){
					if(jugador=="J1"){
						this.telon.x=this.world.width/3;
					}
					else{
						this.telon.x=-this.cache.getImage("telon").width+this.world.width/3*2;
					}
					
				}
				if(puntuacion2==3){
					if(jugador=="J2"){
						this.telon.x=this.world.width/3;
					}
					else{
						this.telon.x=-this.cache.getImage("telon").width+this.world.width/3*2;
					}
				}
				this.cartelFin=this.game.add.sprite((this.world.width/3)+60,0,'CartelEspera');
				this.cartelFin.visible = false;
				this.textVictoria=this.add.text(this.world.width/3,this.world.height/2,"Victoria",style_ganador);
				this.textVictoria.visible=false;
				this.textDerrota=this.add.text(this.world.width/3,this.world.height/2,"Derrota",style_ganador);
				this.textDerrota.visible=false;
				estado="FINAL";
			}
			//FIN CONTROL FINAL JUEGO
			
			//Inicio Disparo
			puntero=this.input.activePointer;
			arrow.rotation = this.physics.arcade.angleBetween(arrow, Bala_J1);
			
			if (catchFlag == true)
			{
				//Track the ball sprite to the mouse
				arrow.alpha = 1;    
				analog.alpha = 0.5;
				analog.rotation = arrow.rotation - 3.14 / 2;
				analog.height = this.physics.arcade.distanceBetween(arrow, this.input.activePointer);    
				launchVelocityPropia = analog.height;
				this.delayAux=0;
			}
			//Fin Disparo
			
			//Inicio Control bala J1
			if((disparos==0 && (Bala_J1.body.x-Bala_J1.width<0 || Bala_J1.body.x + Bala_J1.width>1920 || Bala_J1.body.y+Bala_J1.height>1080 || (Bala_J1.body.velocity.x<=velocidad_minima && Bala_J1.body.velocity.y<=velocidad_minima && Bala_J1.body.velocity.x>=-velocidad_minima && Bala_J1.body.velocity.y>=-velocidad_minima)))){
				Bala_J1.body.moves = false;
				Bala_J1.body.kinematic = true;
				Bala_J1.body.velocity.x=0;
				Bala_J1.body.velocity.y=0;
				
				if(jugador=="J1"){
					//this.CartelVaqueros.tint=1 * 0xffffff;
					//this.CartelPiratas.tint=0.4 * 0xffffff;
					Bala_J1.body.x=100;
					Bala_J1.body.y=420;
					Bala_J1.visible = false;
					Bala_J1.tipo="comun";
					Bala_J1.loadTexture('balaComun');
					Bala_J1.visible = true;
				}
				else
				{
					//this.CartelVaqueros.tint=0.4 * 0xffffff;
					//this.CartelPiratas.tint=1 * 0xffffff;
					Bala_J1.body.x=1820;
					Bala_J1.body.y=400;
					Bala_J1.visible = false;
					Bala_J1.tipo="comun";
					Bala_J1.loadTexture('balaComun');
					Bala_J1.visible = true;
				}
				disparos=1;
				fin_tiempo=1;
				cuenta_atras.destroy();
				cuenta_atras=this.time.create();
				final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * auxTiempoBatalla, this.finTiempo);
				cuenta_atras.start();
				
				if(num_balas_agu_J1==0){
					button_BalaAgua.inputEnabled = false;
				}else{
					button_BalaAgua.inputEnabled = true;
				}
				if(num_balas_fue_J1==0){
					button_BalaFuego.inputEnabled = false;
				}else{
					button_BalaFuego.inputEnabled = true;
				}
				if(num_balas_aci_J1==0){
					button_BalaAcido.inputEnabled = false;
				}else{
					button_BalaAcido.inputEnabled = true;
				}
				button_BalaComun.inputEnabled = true;
				
				//Fin Control bala J1
			}

			//Inicio Control bala J2
			if(((Bala_J2.body.x-Bala_J2.width<0 || Bala_J2.body.x + Bala_J2.width>1920 || Bala_J2.body.y+Bala_J2.height>1080 || (Bala_J2.body.velocity.x<=velocidad_minima && Bala_J2.body.velocity.y<=velocidad_minima && Bala_J2.body.velocity.x>=-velocidad_minima && Bala_J2.body.velocity.y>=-velocidad_minima)))){
				//alert();
				Bala_J2.body.moves = false;
				Bala_J2.body.kinematic = true;
				Bala_J2.body.velocity.x=0;
				Bala_J2.body.velocity.y=0;
				if(jugador=="J2"){
					//this.CartelVaqueros.tint=1 * 0xffffff;
					//this.CartelPiratas.tint=0.4 * 0xffffff;
					Bala_J2.body.x=100;
					Bala_J2.body.y=420;
					Bala_J2.visible = false;
					Bala_J2.tipo="comun";
					Bala_J2.loadTexture('balaComun');
					Bala_J2.visible = true;
				}
				else
				{
					//this.CartelVaqueros.tint=0.4 * 0xffffff;
					//this.CartelPiratas.tint=1 * 0xffffff;
					Bala_J2.body.x=1820;
					Bala_J2.body.y=400;
					Bala_J2.visible = false;
					Bala_J2.tipo="comun";
					Bala_J2.loadTexture('balaComun');
					Bala_J2.visible = true;
				}
				//Fin Control bala J2
			}

			//Inicio Giro de los cañones
			if (catchFlag != true && disparos>0){
				if (jugador=="J1"){
					if (this.game.physics.arcade.angleToPointer(this.CannonPirata)>-1 && this.game.physics.arcade.angleToPointer(this.CannonPirata)<0.55){
						this.CannonPirata.rotation = this.game.physics.arcade.angleToPointer(this.CannonPirata);
						angulo_rotacion=this.CannonPirata.rotation;
						//this.CannonVaquero.rotation =jugadorRival.anguloCanon;
					}
					
				}
				if (jugador=="J2"){
					if (this.game.physics.arcade.angleToPointer(this.CannonVaquero)<-2 || this.game.physics.arcade.angleToPointer(this.CannonVaquero)>2.5){
						this.CannonVaquero.rotation = this.game.physics.arcade.angleToPointer(this.CannonVaquero);
						angulo_rotacion=this.CannonVaquero.rotation;
						//this.CannonPirata.rotation =jugadorRival.anguloCanon;
					}
				}
			}
			//Fin Giro de los cañones
			this.delayAux++;
		}

		if(estado=="FINAL"){
			if(this.telon.y>=0){
				this.telon.y=0;
				this.telon.body.immovable = true;
				this.telon.body.velocity.setTo(0,0);
					if(puntuacion1==3){
						if(jugador=="J1"){
							this.cartelFin.x = (this.world.width/3)+230;
							this.cartelFin.visible = true;
							this.textVictoria.visible=true;
							this.textVictoria.x=this.world.width/3*2;
							this.textVictoria.y=(this.world.height/2)+95;
							this.textVictoria.anchor.setTo(0.5,0.5);
						}
						else{
							this.cartelFin.x = 230;
							this.cartelFin.visible = true;
							this.textVictoria.x=this.world.width/3;
							this.textVictoria.y=(this.world.height/2)+95;
							this.textVictoria.visible=true;
							this.textVictoria.anchor.setTo(0.5,0.5);
						}
					}
					if(puntuacion2==3){
						if(jugador=="J2"){
							this.cartelFin.x = (this.world.width/3)+230;
							this.cartelFin.visible = true;
							this.textDerrota.visible=true;
							this.textDerrota.x=this.world.width/3*2;
							this.textDerrota.y=(this.world.height/2)+95;
							this.textDerrota.anchor.setTo(0.5,0.5);
						}
						else{
							this.cartelFin.x = 230;
							this.cartelFin.visible = true;
							this.textDerrota.x=this.world.width/3;
							this.textDerrota.y=(this.world.height/2)+95;
							this.textDerrota.visible=true;
							this.textDerrota.anchor.setTo(0.5,0.5);
						}
					}
					this.button_menu.visible=true;
					this.button_menu.bringToTop();
					this.button_menu.anchor.setTo(0.5,0.5);
					this.button_menu.x=this.cartelFin.x + this.cache.getImage("CartelEspera").width/2 ;
					this.button_menu.y=this.cartelFin.y+this.cache.getImage("CartelEspera").height-150;
					this.textMenu.visible=true;
					this.textMenu.bringToTop();
					this.textMenu.anchor.setTo(0.5,0.5);
					this.textMenu.x=this.button_menu.x;
					this.textMenu.y=this.button_menu.y;
				//}
				if(this.delayAux>=600){
					this.musica1.destroy();
					this.state.start('MainMenu');
				}
			}
		}
	}
},
	
	colision:function(juga_constr){
		if(disparos==0){
			if(isNaN(Number(Bala_J1.body.velocity.y))){
				Val1=0;
			}else{
				Val1=Number(Bala_J1.body.velocity.y);
			}
			if(isNaN(Number(Bala_J1.body.velocity.x))){
				Val2=0;
			}else{
				Val2=Number(Bala_J1.body.velocity.x);
			}
			velocidad_global=Math.abs(Val1)+Math.abs(Val2);
			if(estado=="BATALLA"){
				if(velocidad_global>200 && (Bala_J1.tipo=="comun") ){
					switch (velocidad_global){
						case (velocidad_global<1500):
							juga_constr.sprite.vida=juga_constr.sprite.vida-8;
							break;
						case (velocidad_global<2000):
							juga_constr.sprite.vida=juga_constr.sprite.vida-15;
							break;
						default:
							juga_constr.sprite.vida=juga_constr.sprite.vida-20;
							break;
					}
				}
				if(Bala_J1.tipo=="fuego"){
					switch (juga_constr.sprite.tipo){
						case ("madera"):
							juga_constr.sprite.vida=1;
							switch(juga_constr.sprite.forma){
								case "tri":
									juga_constr.sprite.loadTexture('Bloq_mad_trian_quem');
								break;
								case "cuad":
									juga_constr.sprite.loadTexture('Bloq_mad_cuad_quem');
								break;
								case "rect_v":
									juga_constr.sprite.loadTexture('Bloq_mad_rectV_quem');
								break;
								case "rect_h":
									juga_constr.sprite.loadTexture('Bloq_mad_rectH_quem');
								break;
							}
						break;
						case ("piedra"):
							juga_constr.sprite.vida=juga_constr.sprite.vida-1;
						break;
						case ("metal"):
							juga_constr.sprite.vida=juga_constr.sprite.vida-1;
						break;
						case ("personaje"):
							juga_constr.sprite.vida=juga_constr.sprite.vida-1;
						break;
					}
					Bala_J1.body.x=2000;
					Bala_J1.body.y=2000;
					juga_constr.sprite.body.velocity.x=0;
					juga_constr.sprite.body.velocity.y=0;
					juga_constr.sprite.body.angularVelocity=0;
				}
				if(Bala_J1.tipo=="acido"){
					switch (juga_constr.sprite.tipo){
						case ("piedra"):
							juga_constr.sprite.vida=1;
							switch(juga_constr.sprite.forma){
								case "tri":
									juga_constr.sprite.loadTexture('Bloq_pied_trian_aci');
								break;
								case "cuad":
									juga_constr.sprite.loadTexture('Bloq_pied_cuad_aci');
								break;
								case "rect_v":
									juga_constr.sprite.loadTexture('Bloq_pied_rectV_aci');
								break;
								case "rect_h":
									juga_constr.sprite.loadTexture('Bloq_pied_rectH_aci');
								break;
							}
							break;
						case ("madera"):
							juga_constr.sprite.vida=juga_constr.sprite.vida-1;
						break;
						case ("metal"):
							juga_constr.sprite.vida=juga_constr.sprite.vida-1;
						break;
						case ("personaje"):
							juga_constr.sprite.vida=juga_constr.sprite.vida-1;
						break;
					}
					Bala_J1.body.x=2000;
					Bala_J1.body.y=2000;
					juga_constr.sprite.body.velocity.x=0;
					juga_constr.sprite.body.velocity.y=0;
					juga_constr.sprite.body.angularVelocity=0;
				}
				if(Bala_J1.tipo=="agua"){
					//alert();
					switch (juga_constr.sprite.tipo){
						case ("metal"):
							juga_constr.sprite.vida=1;
							switch(juga_constr.sprite.forma){
								case "tri":
									juga_constr.sprite.loadTexture('Bloq_met_trian_oxi');
								break;
								case "cuad":
									juga_constr.sprite.loadTexture('Bloq_met_cuad_oxi');
								break;
								case "rect_v":
									juga_constr.sprite.loadTexture('Bloq_met_rectV_oxi');
								break;
								case "rect_h":
									juga_constr.sprite.loadTexture('Bloq_met_rectH_oxi');
								break;
							}
							break;
						case ("madera"):
							juga_constr.sprite.vida=juga_constr.sprite.vida-1;
						break;
						case ("piedra"):
							juga_constr.sprite.vida=juga_constr.sprite.vida-1;
						break;
						case ("personaje"):
							juga_constr.sprite.vida=juga_constr.sprite.vida-1;
						break;
					}
					Bala_J1.body.x=2000;
					Bala_J1.body.y=2000;
					juga_constr.sprite.body.velocity.x=0;
					juga_constr.sprite.body.velocity.y=0;
					juga_constr.sprite.body.angularVelocity=0;
				}
			}
			
		}
		//BalaJ2
		if(isNaN(Number(Bala_J2.body.velocity.y))){
			Val3=0;
		}else{
			Val3=Number(Bala_J2.body.velocity.y);
		}
		if(isNaN(Number(Bala_J2.body.velocity.x))){
			Val4=0;
		}else{
			Val4=Number(Bala_J2.body.velocity.x);
		}
		velocidad_global=Math.abs(Val3)+Math.abs(Val4);
		if(estado=="BATALLA"){
			if(velocidad_global>200 && (Bala_J2.tipo=="comun") ){
				switch (velocidad_global){
					case (velocidad_global<1500):
						juga_constr.sprite.vida=juga_constr.sprite.vida-8;
						break;
					case (velocidad_global<2000):
						juga_constr.sprite.vida=juga_constr.sprite.vida-15;
						break;
					default:
						juga_constr.sprite.vida=juga_constr.sprite.vida-20;
						break;
				}
			}
			if(Bala_J2.tipo=="fuego"){
				switch (juga_constr.sprite.tipo){
					case ("madera"):
						juga_constr.sprite.vida=1;
						switch(juga_constr.sprite.forma){
							case "tri":
								juga_constr.sprite.loadTexture('Bloq_mad_trian_quem');
							break;
							case "cuad":
								juga_constr.sprite.loadTexture('Bloq_mad_cuad_quem');
							break;
							case "rect_v":
								juga_constr.sprite.loadTexture('Bloq_mad_rectV_quem');
							break;
							case "rect_h":
								juga_constr.sprite.loadTexture('Bloq_mad_rectH_quem');
							break;
						}
					break;
					case ("piedra"):
						juga_constr.sprite.vida=juga_constr.sprite.vida-1;
					break;
					case ("metal"):
						juga_constr.sprite.vida=juga_constr.sprite.vida-1;
					break;
					case ("personaje"):
						juga_constr.sprite.vida=juga_constr.sprite.vida-1;
					break;
				}
				Bala_J2.body.x=2000;
				Bala_J2.body.y=2000;
				juga_constr.sprite.body.velocity.x=0;
				juga_constr.sprite.body.velocity.y=0;
				juga_constr.sprite.body.angularVelocity=0;
			}
			if(Bala_J2.tipo=="acido"){
				switch (juga_constr.sprite.tipo){
					case ("piedra"):
						juga_constr.sprite.vida=1;
						switch(juga_constr.sprite.forma){
							case "tri":
								juga_constr.sprite.loadTexture('Bloq_pied_trian_aci');
							break;
							case "cuad":
								juga_constr.sprite.loadTexture('Bloq_pied_cuad_aci');
							break;
							case "rect_v":
								juga_constr.sprite.loadTexture('Bloq_pied_rectV_aci');
							break;
							case "rect_h":
								juga_constr.sprite.loadTexture('Bloq_pied_rectH_aci');
							break;
						}
						break;
					case ("madera"):
						juga_constr.sprite.vida=juga_constr.sprite.vida-1;
					break;
					case ("metal"):
						juga_constr.sprite.vida=juga_constr.sprite.vida-1;
					break;
					case ("personaje"):
						juga_constr.sprite.vida=juga_constr.sprite.vida-1;
					break;
				}
				Bala_J2.body.x=2000;
				Bala_J2.body.y=2000;
				juga_constr.sprite.body.velocity.x=0;
				juga_constr.sprite.body.velocity.y=0;
				juga_constr.sprite.body.angularVelocity=0;
			}
			if(Bala_J2.tipo=="agua"){
				//alert();
				switch (juga_constr.sprite.tipo){
					case ("metal"):
						juga_constr.sprite.vida=1;
						switch(juga_constr.sprite.forma){
							case "tri":
								juga_constr.sprite.loadTexture('Bloq_met_trian_oxi');
							break;
							case "cuad":
								juga_constr.sprite.loadTexture('Bloq_met_cuad_oxi');
							break;
							case "rect_v":
								juga_constr.sprite.loadTexture('Bloq_met_rectV_oxi');
							break;
							case "rect_h":
								juga_constr.sprite.loadTexture('Bloq_met_rectH_oxi');
							break;
						}
						break;
					case ("madera"):
						juga_constr.sprite.vida=juga_constr.sprite.vida-1;
					break;
					case ("piedra"):
						juga_constr.sprite.vida=juga_constr.sprite.vida-1;
					break;
					case ("personaje"):
						juga_constr.sprite.vida=juga_constr.sprite.vida-1;
					break;
				}
				Bala_J2.body.x=2000;
				Bala_J2.body.y=2000;
				juga_constr.sprite.body.velocity.x=0;
				juga_constr.sprite.body.velocity.y=0;
				juga_constr.sprite.body.angularVelocity=0;
			}
		}
	},
	
	
	render:function() {
		if(estado=="BATALLA"){
		this.game.debug.text(Bala_J2.body.velocity.x,32,32,"white");}
		//this.game.debug.text(balaDispara.body.velocity.x +"---"+balaDispara.body.velocity.y ,32,15,"white");
	//	this.game.debug.text(cuenta_atras.duration.toFixed(0),32,15,"white");
	//	this.game.debug.text(fin_tiempo,92,15,"white");
		//this.game.debug.text(this.game.physics.p2.angleToPointer(this.CannonPirata),32,15,"white");
		//this.game.debug.text(this.CannonVaquero.angle,32,35,"white");
		//var primero=this.fuerte[1];
		//this.game.debug.text(primero.material,32,8,"white");
	//	this.game.debug.body(BalaCom1_J2);
	//	this.game.debug.body(BalaCom1_J1);
		/*this.game.debug.body(this.SueloPirata);
		this.game.debug.body(this.SueloVaquero);
		this.game.debug.text(this.delayAux,10,200,"white");
		//this.game.debug.text(dineroJ1,10,10,"white");
		/*if(this.construcJ1[1]!=null){
			this.game.debug.text(this.construcJ1[1].coste,10,20,"white");
		}
		if(this.construcJ1[2]!=null){
			this.game.debug.text(this.construcJ1[2].coste,10,30,"white");
		}
		if(this.construcJ1[3]!=null){
			this.game.debug.text(this.construcJ1[3].coste,10,40,"white");
		}
		if(this.construcJ1[4]!=null){
			this.game.debug.text(this.construcJ1[4].coste,10,50,"white");
		}
		/*if(this.construcJ1[0]!=null){
			this.game.debug.text(this.construcJ1[1].coste,10,30,"white");
		}*/
		/*if(this.jugadoresJ2[0]!=null){
			this.game.debug.text(this.jugadoresJ2[0].num,10,50,"white");
		}*/

		/*this.game.debug.text(this.game.physics.p2.gravity.y ,32,60,'white');
		this.game.debug.text(obj.material,32,32,'white');*/
		
		
		/*for(var i=0;i<this.contConstJ1;i++){
			this.game.debug.body(this.construcJ1[i]);
			this.game.debug.text("<-----" + this.construcJ1[i].vida,32+i*20,32,'white');
		}
		for(var i=0;i<this.contJugJ1;i++){
			this.game.debug.body(this.jugadoresJ1[i]);
			this.game.debug.text(this.jugadoresJ1[i].vida,32+i*20,82,'white');
		}
		for(var i=0;i<this.contConstJ2;i++){
			this.game.debug.body(this.construcJ2[i]);
			this.game.debug.text("----->" + this.construcJ2[i].vida,32+i*20,132,'white');
		}
		for(var i=0;i<this.contJugJ2;i++){
			this.game.debug.body(this.jugadoresJ2[i]);
			this.game.debug.text(this.jugadoresJ2[i].vida,32+i*20,192+i*20,'white');
		}
		this.game.debug.text(catchFlag,20,192,'white');
		this.game.debug.text('0',20,242,'white');*/
		//this.game.debug.text(this.movimentoParado(this.construcJ1),20,50,'white');
		//this.game.debug.text(this.input.mousePointer.y,20,100,'white');
		/*for(var i=0;i<this.contConstJ1;i++){
			this.game.debug.text(this.construcJ1[i],20,30+20*i,'white');
		}
		this.game.debug.text(this.telon.x,30,this.telon.y,'white');*/
		
		/*
		this.game.debug.text(turno,500, 300,'white');*/

		
		this.game.debug.text(this.construcAux,600, 500,'white');
		
	},
	
};