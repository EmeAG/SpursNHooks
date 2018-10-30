//Merge sin flechas
Game.Battle = function(game){
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
var dineroJ1;
var dineroJ2;
var dineroJugadores;

var arrow;
var catchFlag = false;
var BalaCom1_J1;
var BalaCom1_J2;
var puntero;
var launchVelocity = 0;
var turno=1;
var disparos=1;
var balaDispara=null;
var fin_tiempo=1;
//cambiar en la compra
var num_balas_fue_J1=0;
var num_balas_fue_J2=0;
var num_balas_agu_J1=0;
var num_balas_agu_J2=0;
var num_balas_aci_J1=0;
var num_balas_aci_J2=0;
var style_contador={font: "60px Arial"};
var style_ganador={font: "200px Arial"};
var cargando_batalla=0;

var auxTiempoConstruc=25;//contador de tiempo global
var auxTiempoBatalla=15;
//Pesos
var peso_madera=1;
var peso_piedra=2;
var peso_metal=3;
var peso_balas=0;
var peso_personaje=1;
//Vida
var vida_madera=20;
var vida_piedra=40;
var vida_metal=65;
var vida_personaje=10;

var puntuacion1=0;
var puntuacion2=0;

var juego_terminado=false;

var musica;

Game.Battle.prototype ={
	create:function(){
		//var musica=this.game.add.audio("batallaMusic",0.09,true);
	//	musica.play();

		dineroJugadores=300;
		dineroJ1=dineroJugadores;
		dineroJ2=-1;
		this.construcAux=null;
		
		estado="CONSTRUCCION";
		this.turno="J1";
		
		obj=new Objeto();
		this.contConstJ1=0;
		this.contConstJ2=0;
		this.construcJ1=[];
		this.construcJ2=[];
		this.contJugJ1=0;
		this.contJugJ2=0;
		this.numJ1=0;
		this.numJ2=0;
		this.jugadoresJ1=[];
		this.grupoColisionJ1=this.game.add.group();
		this.grupoColisionJ2=this.game.add.group();
		this.jugadoresJ2=[];
		this.num0=-2;
		this.num1=-2;
		this.delayAux=0;


		//imagen mala orientacion
		this.image_turn =this.add.image(0, 0, "landscape");	
		//Imagen Fondo
        this.background = this.add.image(0, 0, "FondoBatalla");
        this.background.height = this.game.height;
        this.background.width = this.game.width;

		//Suelos
	    this.SueloMar=this.add.sprite(-50, 720, 'Suelo_Mar');
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


		this.physics.p2.enable(this.SueloPirata,true);
		this.physics.p2.enable(this.SueloVaquero,true);

		this.SueloPirata.body.static = true;
		this.SueloVaquero.body.static = true;
		/*this.SueloVaquero.body.bounce.set(1);
		this.SueloPirata.body.bounce.set(1);
		this.SueloVaquero.body.friction = new Phaser.Point(8,8);
		this.SueloPirata.body.friction = new Phaser.Point(8, 8);*/
		
		
/*
		//Cargar los objetos del estado batalla. 0 inputs, 0 outputs
		this.cargar_batalla = function (){
			//Activar lanzamiento desde el fondo de la pantalla
			this.background.inputEnabled = true;
			this.background.input.start(0, true);
			this.background.events.onInputDown.add(this.set);
			this.background.events.onInputUp.add(this.launch);
			this.angulo2=0;
			this.angulo1=0;
			this.game.physics.p2.setBoundsToWorld();

			//Marcador
			this.Marcador=this.add.sprite(637, 0, 'Marcador');
			this.CartelVaqueros=this.add.sprite(1040, 35, 'CartelVaqueros');
			this.CartelPiratas=this.add.sprite(670, 35, 'CartelPiratas');
			this.CartelVaqueros.tint=0.4 * 0xffffff;

			//Cañon
			this.CannonPirata=this.add.sprite(this.world.width*0.04, (this.world.height- this.cache.getImage("Cannon_Pirata").height)*0.4, 'Cannon_Pirata');
			this.CannonVaquero=this.add.sprite((this.world.width- this.cache.getImage("Cannon_Vaquero").width)*0.99, (this.world.height- this.cache.getImage("Cannon_Vaquero").height)*0.4, 'Cannon_Vaquero');	    
			this.CannonVaquero.anchor.setTo(0.85, 0.65);
			this.CannonVaquero.scale.x *= -1;
			this.CannonVaquero.scale.y *= -1;
			this.CannonPirata.anchor.setTo(0.15, 0.35);
			this.game.physics.p2.enable([this.CannonPirata, this.CannonVaquero]);
			this.CannonPirata.body.moves = false;
			this.CannonVaquero.body.moves = false;
			
			//Balas comunes J1
			BalaCom1_J1=this.add.sprite(135,420, 'balaComun');
			this.physics.enable(BalaCom1_J1, Phaser.Physics.p2);
			BalaCom1_J1.anchor.set(0.5,0.5);
			BalaCom1_J1.body.bounce.set(0.4);
			BalaCom1_J1.body.drag.set(20, 20);
			BalaCom1_J1.body.moves = false;	
			BalaCom1_J1.pivot.x=-200;
			BalaCom1_J1.pivot.y=-20;
			BalaCom1_J1.scale.x *= 0.75;
			BalaCom1_J1.scale.y *= 0.75;
			BalaCom1_J1.body.setCircle(35);
			BalaCom1_J1.body.mass=peso_balas;

			//Balas Agua J1
			BalaAgu_J1=this.add.sprite(135,420, 'balaAgua');
			this.physics.enable(BalaAgu_J1, Phaser.Physics.p2);
			BalaAgu_J1.anchor.set(0.5,0.5);
			BalaAgu_J1.body.bounce.set(0.4);
			BalaAgu_J1.body.drag.set(20, 20);
			BalaAgu_J1.body.moves = false;	
			BalaAgu_J1.pivot.x=-200;
			BalaAgu_J1.pivot.y=-20;
			BalaAgu_J1.scale.x *= 0.75;
			BalaAgu_J1.scale.y *= 0.75;
			BalaAgu_J1.body.setCircle(35);
			BalaAgu_J1.body.mass=peso_balas;
			
			//Balas Fuego J1
			BalaFueg_J1=this.add.sprite(135,420, 'balaFuego');
			this.physics.enable(BalaFueg_J1, Phaser.Physics.p2);
			BalaFueg_J1.anchor.set(0.5,0.5);
			BalaFueg_J1.body.bounce.set(0.4);
			BalaFueg_J1.body.drag.set(20, 20);
			BalaFueg_J1.body.moves = false;	
			BalaFueg_J1.pivot.x=-200;
			BalaFueg_J1.pivot.y=-20;
			BalaFueg_J1.scale.x *= 0.75;
			BalaFueg_J1.scale.y *= 0.75;
			BalaFueg_J1.body.setCircle(35);
			BalaFueg_J1.body.mass=peso_balas;
			
			//Balas Acido J1
			BalaAcid_J1=this.add.sprite(135,420, 'balaAcido');
			this.physics.enable(BalaAcid_J1, Phaser.Physics.p2);
			BalaAcid_J1.anchor.set(0.5,0.5);
			BalaAcid_J1.body.bounce.set(0.4);
			BalaAcid_J1.body.drag.set(20, 20);
			BalaAcid_J1.body.moves = false;	
			BalaAcid_J1.pivot.x=-200;
			BalaAcid_J1.pivot.y=-20;
			BalaAcid_J1.scale.x *= 0.75;
			BalaAcid_J1.scale.y *= 0.75;
			BalaAcid_J1.body.setCircle(35);
			BalaAcid_J1.body.mass=peso_balas;
			
			//Balas comunes J2
			BalaCom1_J2=this.add.sprite(1825,450, 'balaComun');
			this.physics.enable(BalaCom1_J2, Phaser.Physics.p2);
			BalaCom1_J2.anchor.set(0.5,0.5);
			BalaCom1_J2.body.bounce.set(0.4);
			BalaCom1_J2.body.drag.set(20, 20);
			BalaCom1_J2.body.moves = false;
			BalaCom1_J2.pivot.x=-225;
			BalaCom1_J2.pivot.y=-20;
			BalaCom1_J2.scale.x *= 0.75;
			BalaCom1_J2.scale.y *= 0.75;
			BalaCom1_J2.body.setCircle(35);
			BalaCom1_J2.body.mass=peso_balas;
			
			//Balas Agua J2
			BalaAgu_J2=this.add.sprite(1825,450, 'balaAgua');
			this.physics.enable(BalaAgu_J2, Phaser.Physics.p2);
			BalaAgu_J2.anchor.set(0.5,0.5);
			BalaAgu_J2.body.bounce.set(0.4);
			BalaAgu_J2.body.drag.set(20, 20);
			BalaAgu_J2.body.moves = false;
			BalaAgu_J2.pivot.x=-225;
			BalaAgu_J2.pivot.y=-20;
			BalaAgu_J2.scale.x *= 0.75;
			BalaAgu_J2.scale.y *= 0.75;
			BalaAgu_J2.body.setCircle(35);
			BalaAgu_J2.body.mass=peso_balas;
			
			//Balas Fuego J2
			BalaFueg_J2=this.add.sprite(1825,450, 'balaFuego');
			this.physics.enable(BalaFueg_J2, Phaser.Physics.p2);
			BalaFueg_J2.anchor.set(0.5,0.5);
			BalaFueg_J2.body.bounce.set(0.4);
			BalaFueg_J2.body.drag.set(20, 20);
			BalaFueg_J2.body.moves = false;
			BalaFueg_J2.pivot.x=-225;
			BalaFueg_J2.pivot.y=-20;
			BalaFueg_J2.scale.x *= 0.75;
			BalaFueg_J2.scale.y *= 0.75;
			BalaFueg_J2.body.setCircle(35);
			BalaFueg_J2.body.mass=peso_balas;
			
			//Balas Acido J2
			BalaAcid_J2=this.add.sprite(1825,450, 'balaAcido');
			this.physics.enable(BalaAcid_J2, Phaser.Physics.p2);
			BalaAcid_J2.anchor.set(0.5,0.5);
			BalaAcid_J2.body.bounce.set(0.4);
			BalaAcid_J2.body.drag.set(20, 20);
			BalaAcid_J2.body.moves = false;
			BalaAcid_J2.pivot.x=-225;
			BalaAcid_J2.pivot.y=-20;
			BalaAcid_J2.scale.x *= 0.75;
			BalaAcid_J2.scale.y *= 0.75;
			BalaAcid_J2.body.setCircle(35);	
			BalaAcid_J2.body.mass=peso_balas;

			//Invisiblizar balas no seleccionadas
			BalaAgu_J1.visible=false;
			BalaAgu_J2.visible=false;
			BalaAcid_J1.visible=false;
			BalaAcid_J2.visible=false;
			BalaFueg_J1.visible=false;
			BalaFueg_J2.visible=false;

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
			text_num_balas_agu=this.game.add.text(260, 65, num_balas_agu_J1);
			
			button_BalaFuego = this.add.button(300, 20, 'BotonBala', this.selector_bala, this, 2, 1, 0);
			this.imagen_BalaComun=this.add.sprite(305, 23, 'balaFuego');
			button_BalaFuego.tipo='fuego';
			text_num_balas_fue=this.game.add.text(360, 65, num_balas_fue_J1);
			
			button_BalaAcido = this.add.button(400, 20, 'BotonBala', this.selector_bala, this, 2, 1, 0);
			this.imagen_BalaComun=this.add.sprite(405, 23, 'balaAcido');
			button_BalaAcido.tipo='acido';
			text_num_balas_aci=this.game.add.text(460, 65, num_balas_aci_J1);

			balaDispara=BalaCom1_J1;
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
*/
		//Boton Tipos de Objetos
		this.button_Rect_Vert = this.add.button(this.world.width/3+100, 40, 'boton_Tipo', this.create_tipo_rectV, this, 2, 1, 0);
		this.textRectV=this.game.add.sprite(this.button_Rect_Vert.x+this.cache.getImage('boton_Tipo').width/2,this.button_Rect_Vert.y+5,"Bloq_mad_rectV");
		this.textRectV.anchor.setTo(0.5,0);
		this.button_Rect_Horz = this.add.button(this.world.width/3+100, 40+this.cache.getImage('boton_Tipo').height+5, 'boton_Tipo', this.create_tipo_rectH, this, 2, 1, 0);
		this.textRectH=this.game.add.sprite(this.button_Rect_Horz.x+25,this.button_Rect_Horz.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_rectH");
		this.textRectH.anchor.setTo(0,0.5);
		this.button_Trian = this.add.button(this.world.width/3+100, 40+(this.cache.getImage('boton_Tipo').height+5)*2, 'boton_Tipo', this.create_tipo_trian, this, 2, 1, 0);
		this.textTrian=this.game.add.sprite(this.button_Trian.x+this.cache.getImage('boton_Tipo').width/2,this.button_Trian.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_trian");
		this.textTrian.anchor.setTo(0.5,0.5)
		this.button_Cuad = this.add.button(this.world.width/3+100, 40+(this.cache.getImage('boton_Tipo').height+5)*3, 'boton_Tipo', this.create_tipo_cuad, this, 2, 1, 0);
		this.textCuad=this.game.add.sprite(this.button_Cuad.x+this.cache.getImage('boton_Tipo').width/2,this.button_Cuad.y+this.cache.getImage('boton_Tipo').height/2,"Bloq_mad_cuad");
		this.textCuad.anchor.setTo(0.5,0.5);

		//Boton Materiales
		this.button_Madera = this.add.button(this.button_Rect_Vert.x+this.cache.getImage('boton_Tipo').width+30, 40, 'boton_Material', this.change_material_madera, this, 2, 1, 0);
		this.textMad=this.game.add.text(this.button_Madera.x+this.cache.getImage('boton_Material').width/3,this.button_Madera.y+this.cache.getImage('boton_Material').height/2,"Madera");
		this.textMad.anchor.setTo(0.5,0.5);
		this.precioMad=this.game.add.text(this.button_Madera.x+this.cache.getImage('boton_Material').width/3*2+10,this.textMad.y,"10$");
		this.precioMad.anchor.setTo(0.5,0.5);
		this.button_Piedra = this.add.button(this.button_Madera.x, 40+this.cache.getImage('boton_Material').height+5, 'boton_Material', this.change_material_piedra, this, 2, 1, 0);
		this.textPied=this.game.add.text(this.button_Piedra.x+this.cache.getImage('boton_Material').width/3,this.button_Piedra.y+this.cache.getImage('boton_Material').height/2,"Piedra");
		this.textPied.anchor.setTo(0.5,0.5);
		this.precioPied=this.game.add.text(this.button_Piedra.x+this.cache.getImage('boton_Material').width/3*2+10,this.textPied.y,"20$");
		this.precioPied.anchor.setTo(0.5,0.5);
		this.button_Metal = this.add.button(this.button_Madera.x, 40+(this.cache.getImage('boton_Material').height+5)*2, 'boton_Material', this.change_material_metal, this, 2, 1, 0);
		this.textMet=this.game.add.text(this.button_Metal.x+this.cache.getImage('boton_Material').width/3,this.button_Metal.y+this.cache.getImage('boton_Material').height/2,"Metal");
		this.textMet.anchor.setTo(0.5,0.5);
		this.precioMet=this.game.add.text(this.button_Metal.x+this.cache.getImage('boton_Material').width/3*2+10,this.textMet.y,"35$");
		this.precioMet.anchor.setTo(0.5,0.5);

		//Boton Tiempo
		this.cuadroTiempo=this.add.sprite(this.world.width-this.cache.getImage('cuadro_Tiempo').width,this.world.height-this.cache.getImage('cuadro_Tiempo').height,'cuadro_Tiempo');
		cuenta_atras=this.time.create();
		final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * auxTiempoConstruc, this.finTiempo);
		text_cuenta_atras=this.game.add.text(this.world.width-this.cache.getImage('cuadro_Tiempo').width/2,this.world.height-this.cache.getImage('cuadro_Tiempo').height/2, '00',style_contador);
		text_cuenta_atras.anchor.setTo(0.5,0.5);

		//Boton balas
		this.button_bala_fuego=this.add.button(1350,200,'BotonBala_B',this.compraBalaFuego,this,2,1,0);
		this.button_bala_fuego.anchor.setTo(0.5,0.5);
		this.balaF=this.game.add.sprite(this.button_bala_fuego.x-20,this.button_bala_fuego.y-10,"balaFuego");
		this.balaF.anchor.setTo(0.5,0.5);
		this.textBFue=this.add.text(this.button_bala_fuego.x,this.button_bala_fuego.y+50,num_balas_fue_J1);
		this.textBFue.anchor.setTo(0.5,0.5);
		this.precioBFue=this.game.add.text(this.button_bala_fuego.x+this.cache.getImage("BotonBala_B").width/3-5,this.button_bala_fuego.y-this.cache.getImage("BotonBala_B").height/3,"15$");
		this.precioBFue.anchor.setTo(0.5,0.5);
		this.button_bala_agua=this.add.button(1350+20+this.cache.getImage('BotonBala_B').width,200,'BotonBala_B',this.compraBalaAgua,this,2,1,0);
		this.button_bala_agua.anchor.setTo(0.5,0.5);
		this.balaAg=this.game.add.sprite(this.button_bala_agua.x-20,this.button_bala_agua.y-10,"balaAgua");
		this.balaAg.anchor.setTo(0.5,0.5);
		this.textBAgu=this.add.text(this.button_bala_agua.x,this.button_bala_agua.y+50,num_balas_agu_J1);
		this.textBAgu.anchor.setTo(0.5,0.5);
		this.precioBAgu=this.add.text(this.button_bala_agua.x+this.cache.getImage("BotonBala_B").width/3-5,this.button_bala_agua.y-this.cache.getImage("BotonBala_B").height/3,"30$");
		this.precioBAgu.anchor.setTo(0.5,0.5);
		this.button_bala_acido=this.add.button(1350+(20+this.cache.getImage('BotonBala_B').width)*2,200,'BotonBala_B',this.compraBalaAcido,this,2,1,0);
		this.button_bala_acido.anchor.setTo(0.5,0.5);
		this.balaAc=this.game.add.sprite(this.button_bala_acido.x-20,this.button_bala_acido.y-10,"balaAcido");
		this.balaAc.anchor.setTo(0.5,0.5);
		this.textBAci=this.add.text(this.button_bala_acido.x,this.button_bala_acido.y+50,num_balas_aci_J1);
		this.textBAci.anchor.setTo(0.5,0.5);
		this.precioBAci=this.add.text(this.button_bala_acido.x+this.cache.getImage("BotonBala_B").width/3-5,this.button_bala_acido.y-this.cache.getImage("BotonBala_B").height/3,"50$");
		this.precioBAci.anchor.setTo(0.5,0.5);

		//Boton personaje
		this.button_Jugador=this.add.button(this.button_Madera.x+20,this.button_Trian.y,'botonPersonaje',this.crearJugador,this,2,1,0);
		this.personaje=this.game.add.sprite(this.button_Jugador.x+this.cache.getImage("botonPersonaje").width/2,this.button_Jugador.y+this.cache.getImage("botonPersonaje").height/2,"Pirata")
		this.personaje.anchor.setTo(0.5,0.5);
		this.textNum=this.add.text(this.personaje.x-50,this.personaje.y+80,"3");

		//Dinero
		this.dineroMarc=this.add.sprite(1500,40,'BotonDinero');
		this.dineroMarc.anchor.setTo(0.5,0.5);
		this.textDinero=this.add.text(this.dineroMarc.x,this.dineroMarc.y,dineroJ1);
		this.textDinero.anchor.setTo(0.7,0.5);

		//Telon
		//this.telon=this.add.sprite(this.world.width/3,0,'telon');							 
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

		if(turno==2){
			if(num_balas_agu_J2==0){
				button_BalaAgua.inputEnabled = false;
				button_BalaAgua.tint=0.4 * 0xffffff;
			}else{
				button_BalaAgua.inputEnabled = true;
				button_BalaAgua.tint=1 * 0xffffff;
			}
			if(num_balas_fue_J2==0){
				button_BalaFuego.inputEnabled = false;
				button_BalaFuego.tint=0.4 * 0xffffff;
			}else{
				button_BalaFuego.inputEnabled = true;
				button_BalaFuego.tint=1* 0xffffff;
			}
			if(num_balas_aci_J2==0){
				button_BalaAcido.inputEnabled = false;
				button_BalaAcido.tint=0.4 * 0xffffff;
			}else{
				button_BalaAcido.inputEnabled = true;
				button_BalaAcido.tint=1 * 0xffffff;
			}
		}else{
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
		}
		button_BalaComun.inputEnabled = true;
		button_BalaComun.tint=1 * 0xffffff;
		
		balaDispara.visible=false;
		if(turno==1){
			switch(button.tipo){
				case 'comun':
					balaDispara=BalaCom1_J1;
					button_BalaComun.tint=0.78 * 0xffffff;
					break;
				case 'agua':
					balaDispara=BalaAgu_J1;
					button_BalaAgua.tint=0.78 * 0xffffff;
					break;
				case 'fuego':
					balaDispara=BalaFueg_J1;
					button_BalaFuego.tint=0.78 * 0xffffff;
					break;
				case 'acido':
					balaDispara=BalaAcid_J1;
					button_BalaAcido.tint=0.78 * 0xffffff;
					break;
			}
		}
		else{
			switch(button.tipo){
				case 'comun':
					balaDispara=BalaCom1_J2;
					button_BalaComun.tint=0.78 * 0xffffff;
					break;
				case 'agua':
					balaDispara=BalaAgu_J2;
					button_BalaAgua.tint=0.78 * 0xffffff;
					break;
				case 'fuego':
					balaDispara=BalaFueg_J2;
					button_BalaFuego.tint=0.78 * 0xffffff;
					break;
				case 'acido':
					balaDispara=BalaAcid_J2;
					button_BalaAcido.tint=0.78 * 0xffffff;
					break;
			}			
		}
		balaDispara.visible=true;
	},

	//Funciones para el disparo. inputs Jugador,PosicionRaton, outputs 0.
	set:function(player,pointer) {
		if(disparos>0){
			catchFlag = true;
			balaDispara.body.moves = false;
			balaDispara.body.velocity.setTo(0, 0);
			arrow.reset(pointer.x, pointer.y);
			analog.reset(pointer.x, pointer.y);
		}
	},

	//Disparo. input PosicionRaton, output 0.
	launch:function(pointer) {
		if(disparos>0){
			cuenta_atras.pause();
			switch(balaDispara){
				case BalaAgu_J2:
					num_balas_agu_J2--;
					text_num_balas_agu.text=num_balas_agu_J2;
					break;
				case BalaFueg_J2:
					num_balas_fue_J2--;
					text_num_balas_fue.text=num_balas_fue_J2;
					break;
				case BalaAcid_J2:
					num_balas_aci_J2--;
					text_num_balas_aci.text=num_balas_aci_J2;
					break;
				case BalaAgu_J1:
					num_balas_agu_J1--;
					text_num_balas_agu.text=num_balas_agu_J1;

					break;
				case BalaFueg_J1:
					num_balas_fue_J1--;
					text_num_balas_fue.text=num_balas_fue_J1;

					break;
				case BalaAcid_J1:
					num_balas_aci_J1--;
					text_num_balas_aci.text=num_balas_aci_J1;
					break;
			}
			disparos--;
			catchFlag = false;
			arrow.alpha = 0;
			analog.alpha = 0;
			Xvector = (arrow.x - puntero.x)*5;
			Yvector = (arrow.y - puntero.y)*5;
			balaDispara.body.moves = true;
			if(turno==1){
				balaDispara.body.velocity.setTo(Math.max(Xvector,1000), Yvector);
				if(num_balas_agu_J1==0){
					button_BalaAgua.inputEnabled = false;
				}
				if(num_balas_fue_J1==0){
					button_BalaFuego.inputEnabled = false;
				}			
				if(num_balas_aci_J1==0){
					button_BalaAcido.inputEnabled = false;
				}
			}
			else{
				balaDispara.body.velocity.setTo(Math.min(Xvector,-1000), Yvector);
				if(num_balas_agu_J2==0){
					button_BalaAgua.inputEnabled = false;
				}		
				if(num_balas_fue_J2==0){
					button_BalaFuego.inputEnabled = false;
				}
				if(num_balas_aci_J2==0){
					button_BalaAcido.inputEnabled = false;
				}
			}
		}
	},
	
	//Llamada por un boton.0 inputs, 0 outputs
	compraBalaFuego:function(){
		if(fin_tiempo!=0){
			if(this.turno=="J1" && (dineroJ1-15)>=0){
				num_balas_fue_J1++;
				dineroJ1-=15;
			}
			if(this.turno=="J2" && (dineroJ2-15)>=0){
				num_balas_fue_J2++;
				dineroJ2-=15;
			}
		}
	},

	//Llamada por un boton.0 inputs, 0 outputs
	compraBalaAgua:function(){
		if(fin_tiempo!=0){
			if(this.turno=="J1" && (dineroJ1-30)>=0){
				num_balas_agu_J1++;
				dineroJ1-=30;
			}
			if(this.turno=="J2" && (dineroJ2-30)>=0){
				num_balas_agu_J2++;
				dineroJ2-=30;
			}
		}		
	},

	//Llamada por un boton.0 inputs, 0 outputs
	compraBalaAcido:function(){
		if(fin_tiempo!=0){
			if(this.turno=="J1" && (dineroJ1-50)>=0){
				num_balas_aci_J1++;
				dineroJ1-=50;
			}
			if(this.turno=="J2" && (dineroJ2-50)>=0){
				num_balas_aci_J2++;
				dineroJ2-=50;
			}
		}		
	},

	//Llamada por un boton.0 inputs, 0 outputs
	change_material_madera:function(){
		if(fin_tiempo!=0 && ((dineroJ1-10)>=0||(dineroJ2-10)>=0)){
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
		if(fin_tiempo!=0 && ((dineroJ1-20)>=0||(dineroJ2-20)>=0)){
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
		if(fin_tiempo!=0 && ((dineroJ1-35)>=0||(dineroJ2-35)>=0)){
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
				if(this.turno=="J1" && (dineroJ1-10)>=0){
					this.bloq_mad_trian=this.add.sprite(this.button_Trian.x,this.button_Trian.y,'Bloq_mad_trian');
					this.physics.p2.enable(this.bloq_mad_trian);
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
				if(this.turno=="J2" && (dineroJ2-10)>=0){
					this.bloq_mad_trian=this.add.sprite(this.button_Trian.x,this.button_Trian.y,'Bloq_mad_trian');
					this.physics.p2.enable(this.bloq_mad_trian);
					this.bloq_mad_trian.inputEnabled=true;
					this.bloq_mad_trian.num=this.contConstJ2;
					this.bloq_mad_trian.coste=10;
					this.bloq_mad_trian.estado=1;
					this.bloq_mad_trian.forma="tri";
					this.bloq_mad_trian.tipo="madera";
					this.bloq_mad_trian.vida=vida_madera;
					this.bloq_mad_trian.body.mass=peso_madera;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_mad_trian;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}
			}
			if(obj.material=="piedra"){
				if(this.turno=="J1" && (dineroJ1-20)>=0){
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
				if(this.turno=="J2" && (dineroJ2-20)>=0){
					this.bloq_pied_trian=this.add.sprite(this.button_Trian.x,this.button_Trian.y,'Bloq_pied_trian');
					this.physics.p2.enable(this.bloq_pied_trian);
					this.bloq_pied_trian.inputEnabled=true;
					this.bloq_pied_trian.num=this.contConstJ2;
					this.bloq_pied_trian.coste=20;
					this.bloq_pied_trian.estado=1;
					this.bloq_pied_trian.forma="tri";
					this.bloq_pied_trian.tipo="piedra";
					this.bloq_pied_trian.vida=vida_piedra;
					this.bloq_pied_trian.body.mass=peso_piedra;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_pied_trian;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}
			}
			if(obj.material=="metal"){
				if(this.turno=="J1" && (dineroJ1-35)>=0){
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
				if(this.turno=="J2" && (dineroJ2-35)>=0){
					this.bloq_met_trian=this.add.sprite(this.button_Trian.x,this.button_Trian.y,'Bloq_met_trian');
					this.physics.p2.enable(this.bloq_met_trian);
					this.bloq_met_trian.inputEnabled=true;
					this.bloq_met_trian.num=this.contConstJ2;
					this.bloq_met_trian.coste=35;
					this.bloq_met_trian.estado=1;
					this.bloq_met_trian.forma="tri";
					this.bloq_met_trian.tipo="metal";
					this.bloq_met_trian.vida=vida_metal;
					this.bloq_met_trian.body.mass=peso_metal;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_met_trian;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}
			}
			if(this.turno=="J1"){
				dineroJ1-=this.construcJ1[this.contConstJ1].coste;
				this.contConstJ1++;
			}
			if(this.turno=="J2"){
				dineroJ2-=this.construcJ2[this.contConstJ2].coste;
				this.contConstJ2++;
			}		
		}
	},

	//Llamada por un boton.0 inputs, 0 outputs
	create_tipo_cuad:function(){
		if(this.construcAux==null&& fin_tiempo!=0){
			if(obj.material=="madera"){
				if(this.turno=="J1"){
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
				if(this.turno=="J2"){
					this.bloq_mad_cuad=this.add.sprite(this.button_Cuad.x,this.button_Cuad.y,'Bloq_mad_cuad');
					this.physics.p2.enable(this.bloq_mad_cuad);
					this.bloq_mad_cuad.inputEnabled=true;
					this.bloq_mad_cuad.num=this.contConstJ2;
					this.bloq_mad_cuad.coste=10;
					this.bloq_mad_cuad.estado=1;
					this.bloq_mad_cuad.forma="cuad";
					this.bloq_mad_cuad.tipo="madera";
					this.bloq_mad_cuad.vida=vida_madera;
					this.bloq_mad_cuad.body.mass=peso_madera;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_mad_cuad;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}
			}
			if(obj.material=="piedra"){
				if(this.turno=="J1"){
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
				if(this.turno=="J2"){
					this.bloq_pied_cuad=this.add.sprite(this.button_Cuad.x,this.button_Cuad.y,'Bloq_pied_cuad');
					this.physics.p2.enable(this.bloq_pied_cuad);
					this.bloq_pied_cuad.inputEnabled=true;
					this.bloq_pied_cuad.num=this.contConstJ2;
					this.bloq_pied_cuad.coste=20;
					this.bloq_pied_cuad.estado=1;
					this.bloq_pied_cuad.forma="cuad";
					this.bloq_pied_cuad.tipo="piedra";
					this.bloq_pied_cuad.vida=vida_piedra;
					this.bloq_pied_cuad.body.mass=peso_piedra;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_pied_cuad;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}
			}
			if(obj.material=="metal"){
				if(this.turno=="J1"){
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
				if(this.turno=="J2"){
					this.bloq_met_cuad=this.add.sprite(this.button_Cuad.x,this.button_Cuad.y,'Bloq_met_cuad');
					this.physics.p2.enable(this.bloq_met_cuad);
					this.bloq_met_cuad.inputEnabled=true;
					this.bloq_met_cuad.num=this.contConstJ2;
					this.bloq_met_cuad.coste=35;
					this.bloq_met_cuad.estado=1;
					this.bloq_met_cuad.forma="cuad";
					this.bloq_met_cuad.tipo="metal";
					this.bloq_met_cuad.vida=vida_metal;
					this.bloq_met_cuad.body.mass=peso_metal;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_met_cuad;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}
			}
			if(this.turno=="J1"){
				dineroJ1-=this.construcJ1[this.contConstJ1].coste;
				this.contConstJ1++;
			}
			if(this.turno=="J2"){
				dineroJ2-=this.construcJ2[this.contConstJ2].coste;
				this.contConstJ2++;
			}		
		}
	},

	//Llamada por un boton.0 inputs, 0 outputs
	create_tipo_rectH:function(){
		if(this.construcAux==null&& fin_tiempo!=0){
			if(obj.material=="madera"){
				if(this.turno=="J1"){
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
				if(this.turno=="J2"){
					this.bloq_mad_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_mad_rectH');
					this.physics.p2.enable(this.bloq_mad_rect);
					this.bloq_mad_rect.inputEnabled=true;
					this.bloq_mad_rect.num=this.contConstJ2;
					this.bloq_mad_rect.coste=10;
					this.bloq_mad_rect.estado=1;
					this.bloq_mad_rect.forma="rect_h";
					this.bloq_mad_rect.tipo="madera";
					this.bloq_mad_rect.vida=vida_madera;
					this.bloq_mad_rect.body.mass=peso_madera;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_mad_rect;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}				
			}
			if(obj.material=="piedra"){
				if(this.turno=="J1"){
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
				if(this.turno=="J2"){
					this.bloq_pied_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_pied_rectH');
					this.physics.p2.enable(this.bloq_pied_rect);
					this.bloq_pied_rect.inputEnabled=true;
					this.bloq_pied_rect.num=this.contConstJ2;
					this.bloq_pied_rect.coste=20;
					this.bloq_pied_rect.estado=1;
					this.bloq_pied_rect.forma="rect_h";
					this.bloq_pied_rect.tipo="piedra";
					this.bloq_pied_rect.vida=vida_piedra;
					this.bloq_pied_rect.body.mass=peso_piedra;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_pied_rect;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}				
			}
			if(obj.material=="metal"){
				if(this.turno=="J1"){
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
				if(this.turno=="J2"){
					this.bloq_met_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_met_rectH');
					this.physics.p2.enable(this.bloq_met_rect);
					this.bloq_met_rect.inputEnabled=true;
					this.bloq_met_rect.num=this.contConstJ2;
					this.bloq_met_rect.coste=35;
					this.bloq_met_rect.estado=1;
					this.bloq_met_rect.forma="rect_h";
					this.bloq_met_rect.tipo="metal";
					this.bloq_met_rect.vida=vida_metal;
					this.bloq_met_rect.body.mass=peso_metal;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_met_rect;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}			
			}
			if(this.turno=="J1"){
				dineroJ1-=this.construcJ1[this.contConstJ1].coste;
				this.contConstJ1++;
			}
			if(this.turno=="J2"){
				dineroJ2-=this.construcJ2[this.contConstJ2].coste;
				this.contConstJ2++;
			}		
		}
	},

	//Llamada por un boton.0 inputs, 0 outputs
	create_tipo_rectV:function(){
		if(this.construcAux==null&& fin_tiempo!=0){
			this.game.physics.p2.gravity.y = 0;
			if(obj.material=="madera"){
				if(this.turno=="J1"){
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
				if(this.turno=="J2"){
					this.bloq_mad_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_mad_rectV');
					this.physics.p2.enable(this.bloq_mad_rect);
					this.bloq_mad_rect.inputEnabled=true;
					this.bloq_mad_rect.num=this.contConstJ2;
					this.bloq_mad_rect.coste=10;
					this.bloq_mad_rect.estado=1;
					this.bloq_mad_rect.forma="rect_v";
					this.bloq_mad_rect.tipo="madera";
					this.bloq_mad_rect.vida=vida_madera;
					this.bloq_mad_rect.body.mass=peso_madera;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_mad_rect;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}				
			}
			if(obj.material=="piedra"){
				if(this.turno=="J1"){
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
				if(this.turno=="J2"){
					this.bloq_pied_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_pied_rectV');
					this.physics.p2.enable(this.bloq_pied_rect);
					this.bloq_pied_rect.inputEnabled=true;
					this.bloq_pied_rect.num=this.contConstJ2;
					this.bloq_pied_rect.coste=20;
					this.bloq_pied_rect.estado=1;
					this.bloq_pied_rect.forma="rect_v";
					this.bloq_pied_rect.tipo="piedra";
					this.bloq_pied_rect.vida=vida_piedra;
					this.bloq_pied_rect.body.mass=peso_piedra;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_pied_rect;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}			
			}
			if(obj.material=="metal"){
				if(this.turno=="J1"){
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
				if(this.turno=="J2"){
					this.bloq_met_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_met_rectV');
					this.physics.p2.enable(this.bloq_met_rect);
					this.bloq_met_rect.inputEnabled=true;
					this.bloq_met_rect.num=this.contConstJ2;
					this.bloq_met_rect.coste=35;
					this.bloq_met_rect.estado=1;
					this.bloq_met_rect.forma="rect_v";
					this.bloq_met_rect.tipo="metal";
					this.bloq_met_rect.vida=vida_metal;
					this.bloq_met_rect.body.mass=peso_metal;
					this.num0=this.contConstJ2;
					this.construcAux=this.bloq_met_rect;
					this.construcJ2[this.contConstJ2]=this.construcAux;
				}				
			}
			if(this.turno=="J1"){
				dineroJ1-=this.construcJ1[this.contConstJ1].coste;
				this.contConstJ1++;
			}
			if(this.turno=="J2"){
				dineroJ2-=this.construcJ2[this.contConstJ2].coste;
				this.contConstJ2++;
			}			
		}
	},

	//Llamada por un boton.0 inputs, 0 outputs
	crearJugador:function(){
		if(this.construcAux==null && fin_tiempo!=0){
			this.game.physics.p2.gravity.y = 0;
			if(this.turno=="J1"&&this.numJ1<3){
				this.jugador=this.add.sprite(this.button_Jugador.x,this.button_Jugador.y,'Pirata');
				this.physics.p2.enable(this.jugador);
				this.jugador.body.mass=peso_personaje;
				this.jugador.vida=vida_personaje;
				this.jugador.estado=1;
				this.jugador.forma="personaje";
				this.jugador.inputEnabled=true;
				this.jugador.num=this.contJugJ1;
				this.num1=this.contJugJ1;
				//alert(this.num1);
				this.construcAux=this.jugador;
				this.jugadoresJ1[this.contJugJ1]=this.construcAux;
				this.contJugJ1++;
				this.numJ1++;
			}

			if(this.turno=="J2"&&this.numJ2<3){
				this.jugador=this.add.sprite(this.button_Jugador.x,this.button_Jugador.y,'Vaquero');
				this.physics.p2.enable(this.jugador);
				this.jugador.body.mass=peso_personaje;
				this.jugador.vida=vida_personaje;
				this.jugador.estado=1;
				this.jugador.forma="personaje";
				this.jugador.inputEnabled=true;
				this.jugador.num=this.contJugJ2;
				this.num1=this.contJugJ2;
				//alert(this.num1);
				this.construcAux=this.jugador;
				this.jugadoresJ2[this.contJugJ2]=this.construcAux;
				this.contJugJ2++;
				this.numJ2++;
			}
		}
	},

	//Establece la posicion del objeto y verifica si la posicion es correcta. inputs objeto, outputs 0.
	move_sprite:function(objeto){
		/*this.game.physics.p2.gravity.y = 0;
		objeto.anchor.setTo(0.5,0.5);*/
		this.game.physics.p2.enable(objeto, false)
		objeto.body.angle=0;
		if(this.turno=="J1"){
			if(objeto.y+objeto.height/2<this.SueloPirata.y && objeto.x+objeto.width/2<this.telon.x){
				objeto.tint=1 * 0xffffff;
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

		if(this.turno=="J2"){
			if(objeto.y+objeto.height/2<this.SueloVaquero.y && objeto.x-objeto.width/2>this.world.width/3*2){
				objeto.tint=1 * 0xffffff;
			}
			else{
				objeto.tint=0.4 * 0xffffff;
			}
			for(var i=0;i<this.contConstJ2;i++){
				if(this.construcJ2[i]!=objeto){
					if(objeto.x+objeto.width/2>this.construcJ2[i].x-this.construcJ2[i].width/2 && objeto.x-objeto.width/2<this.construcJ2[i].x+this.construcJ2[i].width/2){
						if(objeto.y+objeto.height/2>this.construcJ2[i].y-this.construcJ2[i].height/2 && objeto.y-objeto.height/2<this.construcJ2[i].y+this.construcJ2[i].height/2){
							objeto.tint=0.4 * 0xffffff;
						}
					}
				}
			}
			for(var i=0;i<this.contJugJ2;i++){
				if(this.jugadoresJ2[i]!=objeto){
					if(objeto.x+objeto.width/2>this.jugadoresJ2[i].x-this.jugadoresJ2[i].width/2 && objeto.x-objeto.width/2<this.jugadoresJ2[i].x+this.jugadoresJ2[i].width/2){
						if(objeto.y+objeto.height/2>this.jugadoresJ2[i].y-this.jugadoresJ2[i].height/2 && objeto.y-objeto.height/2<this.jugadoresJ2[i].y+this.jugadoresJ2[i].height/2){
							objeto.tint=0.4 * 0xffffff;
						}
					}
				}
			}
		}
		
		
		//objeto.anchor.setTo(0.5,0.5);
		objeto.body.x=this.input.mousePointer.x;
		objeto.body.y=this.input.mousePointer.y;
		//this.game.physics.p2.gravity.y = 100;
	},

	//Construye el objeto si esta en la posicion correcta o lo elimina si este no lo esta. inputs 0, outputs 0.
	stop_move:function(){
		if((this.input.mousePointer.isDown && this.construcAux!=null && this.delayAux>15) || fin_tiempo==0){
			this.game.physics.p2.enable(this.construcAux, true);
			this.construcAux.body.velocity.x=0;
			this.construcAux.body.velocity.y=1;
			this.construcAux.body.angularVelocity=0;
			if(this.turno=="J1"){
				if(this.num0>-1){
					if(this.construcJ1[this.num0].tint==0.4 * 0xffffff){
						dineroJ1+=this.construcJ1[this.num0].coste;
						this.construcJ1[this.num0].destroy();
						this.num0=-2;
					}
					else{
						this.construcJ1[this.num0].events.onInputDown.add(this.click_sprite,this);
						this.construcJ1[this.num0].estado=0;
						this.num0=-2;
					}
					
				}
				if(this.num1>-1){
					if(this.jugadoresJ1[this.num1].tint==0.4 * 0xffffff){
						this.jugadoresJ1[this.num1].destroy();
						this.numJ1--;
						this.num1=-2;
					}
					else{
						this.jugadoresJ1[this.num1].events.onInputDown.add(this.click_jugador,this);
						this.num1=-2;
					}
				}
			}
			if(this.turno=="J2"){
				if(this.num0>-1){
					if(this.construcJ2[this.num0].tint==0.4 * 0xffffff){
						dineroJ2+=this.construcJ2[this.num0].coste;
						this.construcJ2[this.num0].destroy();
						this.num0=-2;
					}
					else{
						this.construcJ2[this.num0].events.onInputDown.add(this.click_sprite,this);
						this.construcJ2[this.num0].estado=0;
						this.num0=-2;
					}
					
				}
				if(this.num1>-1){
					if(this.jugadoresJ2[this.num1].tint==0.4 * 0xffffff){
						this.jugadoresJ2[this.num1].destroy();
						this.numJ2--;
						this.num1=-2;
					}
					else{
						this.jugadoresJ2[this.num1].events.onInputDown.add(this.click_jugador,this);
						this.num1=-2;
					}
				}
			}
			this.construcAux=null;
			this.game.physics.p2.gravity.y = 100;
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
			this.num1=objeto.num;
			this.delayAux=0;
		}
	},
	
	//cambia la posicion del objeto a su posicion invertida por eje y. input objeto, output 0
	espejo:function(objeto){
		this.distanciaMedio=objeto.x-(this.world.width/2);
			objeto.x=this.world.width/2-this.distanciaMedio-objeto.width;
	},

	update:function(){
		/*this.SueloPirata.body.x=this.SueloPirata.width/2;
		this.SueloPirata.body.y=this.world.height-this.SueloPirata.height/2;
		this.SueloPirata.body.angularVelocity=0;
		//Inicio Pantalla en Vertical
	/*	if (this.scale.isPortrait){
			this.image_turn.height = this.game.height;
			this.image_turn.width = this.game.width;
			this.image_turn.visible=true;
			this.image_turn.bringToTop();
		}else{
			if (this.image_turn.visible === true){
				this.image_turn.visible=false;
			}
		}*/
		if(juego_empezado==false){
			this.telon.body.velocity.x = 360;
			this.telon.body.data.gravityScale=0;
			if(this.telon.x>=this.world.width/3+this.cache.getImage("telon").width/2){
				this.telon.body.velocity.x=0;
				juego_empezado=true;
				//Boton Tipos de Objetos
				this.button_Rect_Vert.bringToTop();
				this.textRectV.bringToTop();
				this.button_Rect_Horz.bringToTop();
				this.textRectH.bringToTop();
				this.button_Trian.bringToTop();
				this.textTrian.bringToTop();
				this.button_Cuad.bringToTop();
				this.textCuad.bringToTop();

				//Boton Materiales
				this.button_Madera.bringToTop();
				this.textMad.bringToTop();
				this.precioMad.bringToTop();
				this.button_Piedra.bringToTop();
				this.textPied.bringToTop();
				this.precioPied.bringToTop();
				this.button_Metal.bringToTop();
				this.textMet.bringToTop();
				this.precioMet.bringToTop();

				//Boton Tiempo
				this.cuadroTiempo.bringToTop();
				text_cuenta_atras.bringToTop();

				//Boton balas
				this.button_bala_fuego.bringToTop();
				this.balaF.bringToTop();
				this.textBFue.bringToTop();
				this.precioBFue.bringToTop();
				this.button_bala_agua.bringToTop();
				this.balaAg.bringToTop();
				this.textBAgu.bringToTop();
				this.precioBAgu.bringToTop();
				this.button_bala_acido.bringToTop();
				this.balaAc.bringToTop();
				this.textBAci.bringToTop();
				this.precioBAci.bringToTop();

				//Boton personaje
				this.button_Jugador.bringToTop();
				this.personaje.bringToTop();
				this.textNum.bringToTop();
				
				//Dinero
				this.dineroMarc.bringToTop();
				this.textDinero.bringToTop();
				cuenta_atras.start();
			}
		}else{
			//Inicio Actualizar cuenta atrás
			segundos="0" + Math.round((final_cuent_atras.delay - cuenta_atras.ms) / 1000);
			text_cuenta_atras.text=segundos.substr(-2); 
			//Fin  Actualizar cuenta atrás

			if(estado=="CONSTRUCCION"){
				this.game.physics.p2.gravity.y=1000;
				if(fin_tiempo==0&&this.turno=="J1"){
					if(this.construcAux!=null){
						this.stop_move();
						this.textDinero.destroy();
						this.textDinero=this.add.text(this.dineroMarc.x,this.dineroMarc.y,dineroJ1);
						this.textDinero.anchor.setTo(0.7,0.5);
					}
					for(var i=0;i<this.contJugJ1;i++){
					//	for(var j=0;j<this.contConstJ1;j++){
						this.jugadoresJ1[i].body.angle=0;
						if(this.jugadoresJ1[i].body.velocity.y<0){
							this.jugadoresJ1[i].body.velocity.y=0
							this.jugadoresJ1[i].body.static=true;
						}						
					}
					if(this.numJ1<3){
						for(var i=this.numJ1;i<3;i++){
							if(this.delayAux>120){
								this.jugador=this.add.sprite(this.cache.getImage("Pirata").width/2+this.world.width/7*(2-i),this.cache.getImage("Pirata").height/2,'Pirata');
								this.jugador.vida=vida_personaje;
								this.jugador.anchor.setTo(0.5,0.5);
								this.physics.p2.enable(this.jugador);
								this.jugador.body.mass=peso_personaje;
								this.jugador.body.estado=1;
								this.jugador.inputEnabled=true;
								this.jugador.num=this.contJugJ1;
								this.num1=this.contJugJ1;
								this.construcAux=this.jugador;
								this.jugadoresJ1[this.contJugJ1]=this.construcAux;
								this.contJugJ1++;
								this.numJ1++;
								this.delayAux=0;
								this.construcAux=null;
								this.num1=-2;
								//alert((this.world.width/3)/2*(2-i));
							}
						}
					}

				}
				if(fin_tiempo!=0){
					if(this.construcAux!=null){
						this.move_sprite(this.construcAux);
						if(this.delayAux>15){
							this.stop_move();
						}
					}
				}
				if(this.turno=="J1"){
					if(this.num0>=0){
						this.construcAux=this.construcJ1[this.num0];
					}
					if(this.num1>=0){
						this.construcAux=this.jugadoresJ1[this.num1];
					}
				}

				if(this.turno=="J2"){
					if(this.num0>=0){
						this.construcAux=this.construcJ2[this.num0];
					}
					if(this.num1>=0){
						this.construcAux=this.jugadoresJ2[this.num1];
					}
				}
				this.delayAux++;
			}
/*
		if(estado=="BATALLA"){
			balaDispara.body.gravity.y=3000;
			//CONTROL DESTRUCCION
			for(var i=0;i<this.contConstJ2;i++){
				if(this.construcJ2[i].vida<=0){
					this.construcJ2[i].destroy();
				}
			}
			for(var i=0;i<this.contJugJ2;i++){
				if(this.jugadoresJ2[i].vida<=0 && this.jugadoresJ2[i].estado!=0){
					this.jugadoresJ2[i].destroy();
					this.jugadoresJ2[i].estado=0;
					puntuacion1++;
				}
			}
			for(var i=0;i<this.contConstJ1;i++){
				if(this.construcJ1[i].vida<=0){
					this.construcJ1[i].destroy();
				}
			}
			for(var i=0;i<this.contJugJ1;i++){
				if(this.jugadoresJ1[i].vida<=0 && this.jugadoresJ1[i].estado!=0){
					this.jugadoresJ1[i].destroy();
					this.jugadoresJ1[i].estado=0;
					puntuacion2++;
				}
			}
			//FIN CONTROL DESTRUCCION			
			
			//CONTROL FINAL JUEGO
			if(puntuacion1==3 || puntuacion2==3){
				balaDispara.x=2000;
				balaDispara.y=2000;
                this.telon=this.add.sprite(-40,-1080,'telon');
                this.physics.enable(this.telon, Phaser.Physics.p2);
                this.game.physics.p2.gravity.y = 0;
                this.telon.body.velocity.setTo(0, +300);
                this.delayAux=0;
                if(puntuacion1==3){
                    this.telon.x=this.world.width/3;
                }
                if(puntuacion2==3){
                    this.telon.x=-this.cache.getImage("telon").width+this.world.width/3*2;
                }
                this.textVictoria=this.add.text(this.world.width/3,this.world.height/2,"Victoria",style_ganador);
				this.textVictoria.visible=false;
                estado="FINAL";
            }
			//FIN CONTROL FINAL JUEGO
			
			this.game.physics.p2.gravity.y = 100;
			//Fisicas entre objetos
			this.physics.p2.collide(this.SueloPirata, balaDispara);
			this.physics.p2.collide(this.SueloVaquero, balaDispara);
			
			if(turno==1){
				for(var a=0;a<this.contConstJ2;a++){
					this.physics.p2.collide(this.construcJ2[a], balaDispara, this.colision);
				}
				for(var b=0;b<this.contJugJ2;b++){
					this.physics.p2.collide(this.jugadoresJ2[b], balaDispara, this.colision);
				}
			}else{
				for(var i=0;i<this.contConstJ1;i++){
					this.physics.p2.collide(this.construcJ1[i], balaDispara, this.colision);
				}
				for(var i=0;i<this.contJugJ1;i++){
					this.physics.p2.collide(this.jugadoresJ1[i], balaDispara, this.colision);								
				}
			}

			//Inicio Disparo
			puntero=this.input.activePointer;
			arrow.rotation = this.physics.p2.angleBetween(arrow, balaDispara);
			
			if (catchFlag == true)
			{
				//  Track the ball sprite to the mouse
				arrow.alpha = 1;    
				analog.alpha = 0.5;
				analog.rotation = arrow.rotation - 3.14 / 2;
				analog.height = this.physics.p2.distanceBetween(arrow, this.input.activePointer);    
				launchVelocity = analog.height;
				this.delayAux=0;
			}
			//Fin Disparo
			
			//Inicio Control turnos
			if((disparos==0 && (balaDispara.body.x<0||balaDispara.body.x>1920||balaDispara.body.y>1080 || (balaDispara.body.velocity.x==0 && balaDispara.body.velocity.y==0)))||fin_tiempo==0 || (this.delayAux>180&&disparos==0)){
				balaDispara.body.moves = false;
				balaDispara.body.velocity.setTo(0, 0);
				if(turno==1){
					this.CartelVaqueros.tint=1 * 0xffffff;
					this.CartelPiratas.tint=0.4 * 0xffffff;
					turno=2;
					balaDispara.x=135;
					balaDispara.y=420;
					balaDispara.visible = false;
					balaDispara=BalaCom1_J2;
					text_num_balas_agu.text=num_balas_agu_J2;
					text_num_balas_fue.text=num_balas_fue_J2;
					text_num_balas_aci.text=num_balas_aci_J2;
					if(num_balas_agu_J2==0){
						button_BalaAgua.inputEnabled = false;
						button_BalaAgua.tint=0.4 * 0xffffff;
					}else{
						button_BalaAgua.inputEnabled = true;
						button_BalaAgua.tint=1 * 0xffffff;
					}
					if(num_balas_fue_J2==0){
						button_BalaFuego.inputEnabled = false;
						button_BalaFuego.tint=0.4 * 0xffffff;
					}else{
						button_BalaFuego.inputEnabled = true;
						button_BalaFuego.tint=1* 0xffffff;
					}
					if(num_balas_aci_J2==0){
						button_BalaAcido.inputEnabled = false;
						button_BalaAcido.tint=0.4 * 0xffffff;
					}else{
						button_BalaAcido.inputEnabled = true;
						button_BalaAcido.tint=1 * 0xffffff;
					}
				}
				else
				{
					this.CartelVaqueros.tint=0.4 * 0xffffff;
					this.CartelPiratas.tint=1 * 0xffffff;
					balaDispara.x=1825;
					balaDispara.y=450;
					turno=1;
					balaDispara.visible = false;
					balaDispara=BalaCom1_J1;
					text_num_balas_agu.text=num_balas_agu_J1;
					text_num_balas_fue.text=num_balas_fue_J1;
					text_num_balas_aci.text=num_balas_aci_J1;
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
				balaDispara.visible = true;
				disparos++;
				fin_tiempo=1;
				cuenta_atras.destroy();
				cuenta_atras=this.time.create();
				final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * auxTiempoBatalla, this.finTiempo);
				button_BalaComun.tint=0.78 * 0xffffff;
				cuenta_atras.start();
				//Fin Control turnos
			}

			//Inicio Giro de los cañones
			if (catchFlag != true && disparos>0){
				if (turno==1){
					if (this.game.physics.p2.angleToPointer(this.CannonPirata)>-1.1 && this.game.physics.p2.angleToPointer(this.CannonPirata)<0.55){
						this.CannonPirata.rotation = this.game.physics.p2.angleToPointer(this.CannonPirata);
						this.CannonVaquero.rotation =3.15;
					}
					if (this.game.physics.p2.angleToPointer(balaDispara)>-1.2 && this.game.physics.p2.angleToPointer(balaDispara)<0.65){
						balaDispara.rotation = this.game.physics.p2.angleToPointer(balaDispara);
					}
				}
				if (turno==2){
					if (this.game.physics.p2.angleToPointer(this.CannonVaquero)<-2 || this.game.physics.p2.angleToPointer(this.CannonVaquero)>2.5){
						this.CannonVaquero.rotation = this.game.physics.p2.angleToPointer(this.CannonVaquero);
						this.CannonPirata.rotation =0;
					}
					if (this.game.physics.p2.angleToPointer(balaDispara)<-2 || this.game.physics.p2.angleToPointer(balaDispara)>2.5){
						balaDispara.rotation = this.game.physics.p2.angleToPointer(balaDispara);
					}
				}
			}
			//Fin Giro de los cañones
			this.delayAux++;
		}

		if(estado=="FINAL"){
			this.game.physics.p2.gravity.y = 1;
            if(this.telon.y>=0){
				this.telon.y=0;
				this.telon.body.immovable = true;
                this.telon.body.velocity.setTo(0,0);
                //if(this.delayAux>=500){
                    if(puntuacion1==3){
						this.textVictoria.visible=true;
                        this.textVictoria.x=this.world.width/3*2;
                        this.textVictoria.y=this.world.height/2;
                        this.textVictoria.anchor.setTo(0.5,0.5);
                    }
                    if(puntuacion2==3){
						this.textVictoria.x=this.world.width/3;
						this.textVictoria.y=this.world.height/2;
						this.textVictoria.visible=true;
                        this.textVictoria.anchor.setTo(0.5,0.5);
                    }
                //}
                if(this.delayAux>=600){
                    this.state.start('MainMenu');
                }
            }*/
        }
		//this.delayAux++;
        this.resize();
    },
	

	colision:function(juga_constr, bala){
		if(isNaN(Number(bala.body.velocity.y))){
			Val1=0;
		}else{
			Val1=Number(bala.body.velocity.y);
		}
		if(isNaN(Number(bala.body.velocity.x))){
			Val2=0;
		}else{
			Val2=Number(bala.body.velocity.x);
		}
		velocidad_global=Math.abs(Val1)+Math.abs(Val2);
		if(estado=="BATALLA"){
			if(velocidad_global>300 && (bala==BalaCom1_J1 || bala==BalaCom1_J2) ){
				switch (velocidad_global){
					case (velocidad_global<1500):
						juga_constr.vida=juga_constr.vida-8;
						break;
					case (velocidad_global<2000):
						juga_constr.vida=juga_constr.vida-15;
						break;
					default:
						juga_constr.vida=juga_constr.vida-20;
						break;
				}
			}
			if(bala==BalaFueg_J1 || bala==BalaFueg_J2){
				switch (juga_constr.tipo){
					case ("madera"):
						juga_constr.vida=1;
						switch(juga_constr.forma){
							case "tri":
								juga_constr.loadTexture('Bloq_mad_trian_quem');
							break;
							case "cuad":
								juga_constr.loadTexture('Bloq_mad_cuad_quem');
							break;
							case "rect_v":
								juga_constr.loadTexture('Bloq_mad_rectV_quem');
							break;
							case "rect_h":
								juga_constr.loadTexture('Bloq_mad_rectH_quem');
							break;
						}
					break;
					case ("piedra"):
						juga_constr.vida=juga_constr.vida-1;
					break;
					case ("metal"):
						juga_constr.vida=juga_constr.vida-1;
					break;
				}
				bala.x=2000;
				bala.y=2000;
			}
			if(bala==BalaAcid_J1 || bala==BalaAcid_J2){
				switch (juga_constr.tipo){
					case ("piedra"):
						juga_constr.vida=1;
						switch(juga_constr.forma){
							case "tri":
								juga_constr.loadTexture('Bloq_pied_trian_aci');
							break;
							case "cuad":
								juga_constr.loadTexture('Bloq_pied_cuad_aci');
							break;
							case "rect_v":
								juga_constr.loadTexture('Bloq_pied_rectV_aci');
							break;
							case "rect_h":
								juga_constr.loadTexture('Bloq_pied_rectH_aci');
							break;
						}
						break;
					case ("madera"):
						juga_constr.vida=juga_constr.vida-1;
					break;
					case ("metal"):
						juga_constr.vida=juga_constr.vida-1;
					break;
				}
				bala.x=2000;
				bala.y=2000;
			}
			if(bala==BalaAgu_J1 || bala==BalaAgu_J2){
				//alert();
				switch (juga_constr.tipo){
					case ("metal"):
						juga_constr.vida=1;
						switch(juga_constr.forma){
							case "tri":
								juga_constr.loadTexture('Bloq_met_trian_oxi');
							break;
							case "cuad":
								juga_constr.loadTexture('Bloq_met_cuad_oxi');
							break;
							case "rect_v":
								juga_constr.loadTexture('Bloq_met_rectV_oxi');
							break;
							case "rect_h":
								juga_constr.loadTexture('Bloq_met_rectH_oxi');
							break;
						}
						break;
					case ("madera"):
						juga_constr.vida=juga_constr.vida-1;
					break;
					case ("piedra"):
						juga_constr.vida=juga_constr.vida-1;
					break;
				}
				bala.x=2000;
				bala.y=2000;
			}
		}
	},
	
	getSpriteScale: function (spriteWidth, spriteHeight, availableSpaceWidth, availableSpaceHeight, minPadding) {
		var ratio = 1;
		var currentDevicePixelRatio = window.devicePixelRatio;
		// Sprite needs to fit in either width or height
		
		var widthRatio = (spriteWidth * currentDevicePixelRatio + 2 * minPadding) / availableSpaceWidth;
		var heightRatio = (spriteHeight * currentDevicePixelRatio + 2 * minPadding) / availableSpaceHeight;
		if(widthRatio > 1 || heightRatio > 1){
			ratio = 1 / Math.max(widthRatio, heightRatio);
		} 
		return ratio * currentDevicePixelRatio;
	},
	scaleSprite: function (sprite, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier) {
		var scale = this.getSpriteScale(sprite.width, sprite.height, availableSpaceWidth, availableSpaceHeight, padding);
		sprite.scale.x = scale * scaleMultiplier;
		sprite.scale.y = scale * scaleMultiplier;
	},

	resize: function () {
		this.porcentaje_logo_juego=30;//espacio de la pantalla que se reserva al titulo del juego
		multiplicador_escala=0.75;//valor por el que se escalaran los botones, depende del tamaño de la pantalla

		this.background.height = this.world.height;
		this.background.width = this.world.width;
		
		this.SueloPirata.height = this.world.height/6;
		this.SueloPirata.width = this.world.width/3;
		this.SueloPirata.x=0;
		this.SueloPirata.y=this.world.height-this.SueloPirata.height;
		
		this.SueloVaquero.height = this.world.height/6;
		this.SueloVaquero.width = this.world.width/3;
		this.SueloVaquero.x=this.world.width-this.world.width/3;
		this.SueloVaquero.y=this.world.height-this.SueloVaquero.height;
		
		this.SueloMar.height = this.world.height/6;
		this.SueloMar.width = this.world.width;
		this.SueloMar.x=0;
		this.SueloMar.y=this.world.height-this.SueloMar.height;
		
		if(estado=="BATALLA"){
			this.CannonPirata.height =this.world.height/10;
			this.CannonPirata.width =this.world.width/8;
			this.CannonPirata.x=(this.world.width- this.CannonPirata.width)*0.067;
			this.CannonPirata.y=(this.world.height-this.CannonPirata.height)*0.44;

			this.CannonVaquero.height =this.world.height/10;
			this.CannonVaquero.width =this.world.width/8;
			this.CannonVaquero.x=(this.world.width- (this.CannonVaquero.width*0.35))*0.99;
			this.CannonVaquero.y=(this.world.height)*0.425;
			this.CannonVaquero.scale.x *= -1;
			this.CannonVaquero.scale.y *= -1;
		}
	},

	
	render:function() {
		//this.game.debug.text(this.game.physics.p2.angleToPointer(BalaCom1_J2),32,32,"white");
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
		//this.game.debug.text(this.construcAux,20,292,'white');
		for(var i=0;i<this.contJugJ1;i++){
			this.game.debug.text(this.jugadoresJ1[i].body.velocity.y,20,30+20*i,'white');
		}
		this.game.debug.text(this.telon.x,30,this.telon.y,'white');
		this.game.debug.text(this.world.width/3*2,30,50,'white');
		//this.game.debug.text( this.jugadoresJ2[0],220,292,'white');*/
	},
	
};