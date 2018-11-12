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
var cargando_batalla=0;

var auxTiempoConstruc=0;//contador de tiempo constr
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

var puntuacion1=0;
var puntuacion2=0;

var juego_terminado=false;
var angulo_rotacion;
var musica;

var array=new Array();
Game.Battle_Online.prototype ={
	create:function(){
		this.musica1=this.game.add.audio("batallaMusic",0.09,true);
		this.musica1.play();

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

		this.physics.p2.enable(this.SueloPirata,true);
		this.physics.p2.enable(this.SueloVaquero,true);

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


		//colocacion piratas
		for(var i=this.numJ1;i<3;i++){
			this.jugador=this.add.sprite(0,0,'Pirata')
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
			//this.jugador.body.createBodyCallback(BalaCom1_J2, this.colision, this);
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
			this.jugador=this.add.sprite(0,0,'Vaquero')
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
			//this.jugador.body.createBodyCallback(BalaCom1_J1, this.colision, this);
			this.jugador.num=this.contJugJ2;
			//this.jugador.body.onBeginContact.add(this.colision, this);
			this.num1=this.contJugJ2;
			//alert(this.num1);
			this.construcAux=this.jugador;
			this.jugadoresJ2[this.contJugJ2]=this.construcAux;
			array[this.contJugJ2]=this.construcAux;
			this.jugadoresJ2[this.contJugJ2].events.onInputDown.add(this.click_jugador,this);
			this.contJugJ2++;
			this.numJ2++;
			this.num1=-2;
			this.construcAux=null;
			//alert((this.world.width/3)/2*(2-i));
		}
		
/*		this.SueloVaquero.body.collideWorldBounds = true;
		this.SueloPirata.body.collideWorldBounds = true;
		this.SueloVaquero.body.bounce.set(1);
		this.SueloPirata.body.bounce.set(1);
		this.SueloVaquero.body.friction = new Phaser.Point(8,8);
		this.SueloPirata.body.friction = new Phaser.Point(8, 8);
*/		
		

		//Cargar los objetos del estado batalla. 0 inputs, 0 outputs
		this.cargar_batalla = function (){
			//Activar lanzamiento desde el fondo de la pantalla
			this.background.inputEnabled = true;
			this.background.input.start(0, true);
			this.angulo2=0;
			this.angulo1=0;
			this.game.physics.p2.setBoundsToWorld();

			//Marcador
			this.Marcador=this.add.sprite(637, 0, 'Marcador');
			this.CartelVaqueros=this.add.sprite(1040, 35, 'CartelVaqueros');
			this.CartelPiratas=this.add.sprite(670, 35, 'CartelPiratas');
			this.CartelVaqueros.tint=0.4 * 0xffffff;

			//Fisicas Cañon
			this.game.physics.arcade.enable([this.CannonPirata, this.CannonVaquero]);
			this.CannonPirata.body.moves = false;
			this.CannonVaquero.body.moves = false;
			
			//Balas comunes J1
			Bala_J1=this.add.sprite(0,0, 'balaComun');
			Bala_J1.x=100;
			Bala_J1.y=420;
			this.physics.p2.enable(Bala_J1,true);
			Bala_J1.body.setCircle(35);
			Bala_J1.body.kinematic = true;
			Bala_J1.tipo="comun";
			Bala_J1.body.mass=peso_balas;

			//Balas Agua J1
/*			BalaAgu_J1=this.add.sprite(0,0, 'balaAgua');
			
			//Balas Fuego J1
			BalaFueg_J1=this.add.sprite(0,0, 'balaFuego');

			//Balas Acido J1
			BalaAcid_J1=this.add.sprite(0,0, 'balaAcido');
*/
			//Balas comunes J2
			Bala_J2=this.add.sprite(0,0, 'balaComun');
			Bala_J2.x=1820;
			Bala_J2.y=400;
			this.physics.p2.enable(Bala_J2,true);
			Bala_J2.body.setCircle(35);
			Bala_J2.body.kinematic = true;
			Bala_J2.body.mass=peso_balas;
			Bala_J2.tipo="comun";
			
			//Balas Agua J2
/*			Balgu_J2=this.add.sprite(0,0, 'balaAgua');
			
			//Balas Fuego J2
			BalaFueg_J2=this.add.sprite(0,0, 'balaFuego');
			
			//Balas Acido J2
			BalaAcid_J2=this.add.sprite(0,0, 'balaAcido');
*/
			//Invisiblizar balas no seleccionadas
/*			BalaAgu_J1.visible=false;
			BalaAgu_J2.visible=false;
			BalaAcid_J1.visible=false;
			BalaAcid_J2.visible=false;
			BalaFueg_J1.visible=false;
			BalaFueg_J2.visible=false;
*/

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
		this.textMad=this.game.add.text(this.button_Madera.x+this.cache.getImage('boton_Material').width/3,this.button_Madera.y+this.cache.getImage('boton_Material').height/2,"Madera", style_compra);
		this.textMad.anchor.setTo(0.5,0.5);
		this.precioMad=this.game.add.text(this.button_Madera.x+this.cache.getImage('boton_Material').width/3*2+10,this.textMad.y,"10$", style_compra);
		this.precioMad.anchor.setTo(0.5,0.5);
		this.button_Piedra = this.add.button(this.button_Madera.x, 40+this.cache.getImage('boton_Material').height+5, 'boton_Material', this.change_material_piedra, this, 2, 1, 0);
		this.textPied=this.game.add.text(this.button_Piedra.x+this.cache.getImage('boton_Material').width/3,this.button_Piedra.y+this.cache.getImage('boton_Material').height/2,"Piedra", style_compra);
		this.textPied.anchor.setTo(0.5,0.5);
		this.precioPied=this.game.add.text(this.button_Piedra.x+this.cache.getImage('boton_Material').width/3*2+10,this.textPied.y,"20$", style_compra);
		this.precioPied.anchor.setTo(0.5,0.5);
		this.button_Metal = this.add.button(this.button_Madera.x, 40+(this.cache.getImage('boton_Material').height+5)*2, 'boton_Material', this.change_material_metal, this, 2, 1, 0);
		this.textMet=this.game.add.text(this.button_Metal.x+this.cache.getImage('boton_Material').width/3,this.button_Metal.y+this.cache.getImage('boton_Material').height/2,"Metal", style_compra);
		this.textMet.anchor.setTo(0.5,0.5);
		this.precioMet=this.game.add.text(this.button_Metal.x+this.cache.getImage('boton_Material').width/3*2+10,this.textMet.y,"35$", style_compra);
		this.precioMet.anchor.setTo(0.5,0.5);

		//Boton Tiempo
		this.cuadroTiempo=this.add.sprite(this.world.width-this.cache.getImage('cuadro_Tiempo').width,this.world.height-this.cache.getImage('cuadro_Tiempo').height,'cuadro_Tiempo');
		cuenta_atras=this.time.create();
		final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * auxTiempoConstruc, this.finTiempo);
		text_cuenta_atras=this.game.add.text(this.world.width-this.cache.getImage('cuadro_Tiempo').width/2,this.world.height-this.cache.getImage('cuadro_Tiempo').height/2, '00',style_tiempo);
		text_cuenta_atras.anchor.setTo(0.5,0.5);

		//Boton balas
		this.button_bala_fuego=this.add.button(1350,200,'BotonBala_B',this.compraBalaFuego,this,2,1,0);
		this.button_bala_fuego.anchor.setTo(0.5,0.5);
		this.balaF=this.game.add.sprite(this.button_bala_fuego.x-20,this.button_bala_fuego.y-10,"balaFuego");
		this.balaF.anchor.setTo(0.5,0.5);
		this.textBFue=this.add.text(this.button_bala_fuego.x,this.button_bala_fuego.y+50,num_balas_fue_J1, style_compra);
		this.textBFue.anchor.setTo(0.5,0.5);
		this.precioBFue=this.game.add.text(this.button_bala_fuego.x+this.cache.getImage("BotonBala_B").width/3-5,this.button_bala_fuego.y-this.cache.getImage("BotonBala_B").height/3,"15$", style_compra);
		this.precioBFue.anchor.setTo(0.5,0.5);
		this.button_bala_agua=this.add.button(1350+20+this.cache.getImage('BotonBala_B').width,200,'BotonBala_B',this.compraBalaAgua,this,2,1,0);
		this.button_bala_agua.anchor.setTo(0.5,0.5);
		this.balaAg=this.game.add.sprite(this.button_bala_agua.x-20,this.button_bala_agua.y-10,"balaAgua");
		this.balaAg.anchor.setTo(0.5,0.5);
		this.textBAgu=this.add.text(this.button_bala_agua.x,this.button_bala_agua.y+50,num_balas_agu_J1, style_compra);
		this.textBAgu.anchor.setTo(0.5,0.5);
		this.precioBAgu=this.add.text(this.button_bala_agua.x+this.cache.getImage("BotonBala_B").width/3-5,this.button_bala_agua.y-this.cache.getImage("BotonBala_B").height/3,"30$", style_compra);
		this.precioBAgu.anchor.setTo(0.5,0.5);
		this.button_bala_acido=this.add.button(1350+(20+this.cache.getImage('BotonBala_B').width)*2,200,'BotonBala_B',this.compraBalaAcido,this,2,1,0);
		this.button_bala_acido.anchor.setTo(0.5,0.5);
		this.balaAc=this.game.add.sprite(this.button_bala_acido.x-20,this.button_bala_acido.y-10,"balaAcido");
		this.balaAc.anchor.setTo(0.5,0.5);
		this.textBAci=this.add.text(this.button_bala_acido.x,this.button_bala_acido.y+50,num_balas_aci_J1, style_compra);
		this.textBAci.anchor.setTo(0.5,0.5);
		this.precioBAci=this.add.text(this.button_bala_acido.x+this.cache.getImage("BotonBala_B").width/3-5,this.button_bala_acido.y-this.cache.getImage("BotonBala_B").height/3,"50$", style_compra);
		this.precioBAci.anchor.setTo(0.5,0.5);

		//Boton personaje
		this.button_Jugador=this.add.sprite(this.button_Madera.x+20,this.button_Trian.y,'botonPersonaje');
		this.cartel=this.add.sprite(this.button_Jugador.x+this.cache.getImage("botonPersonaje").width/2,this.button_Jugador.y+this.cache.getImage("botonPersonaje").height+this.cache.getImage("CartelPiratas").height/2,'CartelPiratas');
		this.cartel.anchor.setTo(0.5,0.5);
		this.personaje=this.game.add.sprite(this.button_Jugador.x+this.cache.getImage("botonPersonaje").width/2,this.button_Jugador.y+this.cache.getImage("botonPersonaje").height/2,"Pirata")
		this.personaje.anchor.setTo(0.5,0.5);
		//this.textNum=this.add.text(this.personaje.x-50,this.personaje.y+80,"3");

		//Dinero
		this.dineroMarc=this.add.sprite(1500,40,'BotonDinero');
		this.dineroMarc.anchor.setTo(0.5,0.5);
		this.textDinero=this.add.text(this.dineroMarc.x,this.dineroMarc.y,dineroJ1, style_compra);
		this.textDinero.anchor.setTo(0.7,0.5);

		//Telon
		//this.telon=this.add.sprite(this.world.width/3,0,'telon');							 
		this.telon=this.add.sprite(960,540,'telon');
		this.physics.p2.enable(this.telon);
		this.telon.body.collideWorldBounds = false;
		//this.telon.visible = false;
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
			switch(button.tipo){
				case 'comun':
					balaDispara.loadTexture('balaComun');
					balaDispara.tipo="comun";
					button_BalaComun.tint=0.78 * 0xffffff;
					break;
				case 'agua':
					balaDispara.loadTexture('balaAgua');
					balaDispara.tipo="agua";
					button_BalaAgua.tint=0.78 * 0xffffff;
					break;
				case 'fuego':
					balaDispara.loadTexture('balaFuego');
					balaDispara.tipo="fuego";
					button_BalaFuego.tint=0.78 * 0xffffff;
					break;
				case 'acido':
					balaDispara.loadTexture('balaAcido');
					balaDispara.tipo="acido";
					button_BalaAcido.tint=0.78 * 0xffffff;
					break;
			}
		balaDispara.visible=true;
	},

	//Funciones para el disparo. inputs Jugador,PosicionRaton, outputs 0.
	set:function(player,pointer) {
		if(disparos>0){
			catchFlag = true;
			balaDispara.body.velocity.x=0;
			balaDispara.body.velocity.y=0;
			arrow.reset(pointer.x, pointer.y);
			analog.reset(pointer.x, pointer.y);
		}
	},

	//Disparo. input PosicionRaton, output 0.
	launch:function(pointer) {
		if(disparos>0){
			//limitar fuerza de disparo
			fuerza=Math.min(analog.height,600); 
			cuenta_atras.pause();
			switch(true){
				case (balaDispara.tipo=="agua" && balaDispara==Bala_J2):
					num_balas_agu_J2--;
					text_num_balas_agu.text=num_balas_agu_J2;
					break;
				case (balaDispara.tipo=="fuego" && balaDispara==Bala_J2):
					num_balas_fue_J2--;
					text_num_balas_fue.text=num_balas_fue_J2;
					break;
				case (balaDispara.tipo=="acido" && balaDispara==Bala_J2):
					num_balas_aci_J2--;
					text_num_balas_aci.text=num_balas_aci_J2;
					break;
				case (balaDispara.tipo=="agua" && balaDispara==Bala_J1):
					num_balas_agu_J1--;
					text_num_balas_agu.text=num_balas_agu_J1;
					break;
				case (balaDispara.tipo=="fuego" && balaDispara==Bala_J1):
					num_balas_fue_J1--;
					text_num_balas_fue.text=num_balas_fue_J1;
					break;
				case (balaDispara.tipo=="acido" && balaDispara==Bala_J1):
					num_balas_aci_J1--;
					text_num_balas_aci.text=num_balas_aci_J1;
					break;
			}
			disparos--;
			catchFlag = false;
			arrow.alpha = 0;
			analog.alpha = 0;
			if(turno==1){
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
			balaDispara.body.moves = true;
			if(turno==1){
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
		balaDispara.body.dynamic = true;
		balaDispara.body.velocity.x=Xvector;
		balaDispara.body.velocity.y=Yvector;
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
		if(this.turno=="J1"){
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

		if(this.turno=="J2"){
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
		objeto.body.x=this.input.mousePointer.x;
		objeto.body.y=this.input.mousePointer.y;
	},

	//Construye el objeto si esta en la posicion correcta o lo elimina si este no lo esta. inputs 0, outputs 0.
	stop_move:function(){
		if((this.input.mousePointer.isDown && this.construcAux!=null && this.delayAux>15) || fin_tiempo==0){
			this.game.physics.p2.enable(this.construcAux, true);
			this.construcAux.body.angularVelocity=0;											   
			this.construcAux.body.velocity.x=0;
			this.construcAux.body.velocity.y=0;
			this.construcAux.body.kinematic=true;

			if(this.turno=="J1"){
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
			}
			if(this.turno=="J2"){
				if(this.num0>-1){
					if(this.construcJ2[this.num0].tint==0.4 * 0xffffff){
						dineroJ2+=this.construcJ2[this.num0].coste;
						this.construcJ2[this.num0].destroy();
						this.construcJ2.splice(this.num0, 1);
						this.contConstJ2--;
						this.num0=-2;
					}
					else{
						this.construcJ2[this.num0].events.onInputDown.add(this.click_sprite,this);
						this.construcJ2[this.num0].estado=0;
						if(this.construcJ2[this.num0].forma=="tri"){
							this.construcJ2[this.num0].body.clearShapes();
							this.construcJ2[this.num0].body.loadPolygon('triangulo', 'triangulo');
						}
						this.num0=-2;
					}
					
				}
				if(this.num1>-1){
					if(this.jugadoresJ2[this.num1].tint==0.4 * 0xffffff){
						this.jugadoresJ2[this.num1].body.y=this.auxY;
						this.jugadoresJ2[this.num1].body.x=this.auxX;
						this.jugadoresJ2[this.num1].tint=1 * 0xffffff
						this.num1=-2;
					}
					else{
						this.jugadoresJ2[this.num1].events.onInputDown.add(this.click_jugador,this);
						this.num1=-2;
					}
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
		//Inicio Pantalla en Vertical

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
				this.cartel.bringToTop();
				this.personaje.bringToTop();
				//this.textNum.bringToTop();
				
				//Dinero
				this.dineroMarc.bringToTop();
				this.textDinero.bringToTop();
				cuenta_atras.start();
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
				if(fin_tiempo==0&&this.turno=="J1"){
					if(this.construcAux!=null){
						this.stop_move();
						this.textDinero.destroy();
						this.textDinero=this.add.text(this.dineroMarc.x,this.dineroMarc.y,dineroJ1, style_compra);
						this.textDinero.anchor.setTo(0.7,0.5);
					}

					this.telon.bringToTop();
					this.telon.body.velocity.x=-360;
					this.button_Madera.visible=false;
					this.textMad.visible=false;
					this.button_Piedra.visible=false;
					this.textPied.visible=false;
					this.button_Metal.visible=false;
					this.textMet.visible=false;
					this.button_Rect_Horz.visible=false;
					this.textRectH.destroy();
					this.button_Rect_Vert.visible=false;
					this.textRectV.destroy();
					this.button_Trian.visible=false;
					this.textTrian.destroy();
					this.button_Cuad.visible=false;
					this.textCuad.destroy();
					this.cuadroTiempo.visible=false;
					this.button_bala_acido.visible=false;
					this.button_bala_agua.visible=false;
					this.button_bala_fuego.visible=false;
					this.dineroMarc.visible=false;
					this.button_Jugador.visible=false;
					this.cartel.destroy();
					text_cuenta_atras.visible=false;
					this.textDinero.visible=false;
					this.textBFue.visible=false;
					this.textBAgu.visible=false;
					this.textBAci.visible=false;
					//this.textNum.visible=false;
					this.balaF.visible=false;
					this.balaAg.visible=false;
					this.balaAc.visible=false;
					this.precioBAci.visible=false;
					this.precioBAgu.visible=false;
					this.precioBFue.visible=false;

					if(this.telon.x+this.telon.width/2<=this.world.width/3*2){
						this.telon.body.x=this.world.width/3*2-this.telon.width/2;
						this.telon.body.velocity.x = 0;
						dineroJ1=-1;
						dineroJ2=dineroJugadores;
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

						fin_tiempo=1;
						cuenta_atras.destroy();
						cuenta_atras=this.time.create();
						final_cuenta_atras=cuenta_atras.add(Phaser.Timer.SECOND * auxTiempoConstruc, this.finTiempo);
						cuenta_atras.start();
						text_cuenta_atras.x=this.cuadroTiempo.width/2;
						obj.material="madera";
						this.turno="J2";
					}
				}

				if(fin_tiempo!=0){
					//Actualizacion de textos
					if(this.turno=="J1"){
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
						//this.textNum.destroy();
						//this.textNum=this.add.text(this.personaje.x-50,this.personaje.y+80,3-this.numJ1);
					}
					if(this.turno=="J2"){
						this.textDinero.destroy();
						this.textDinero=this.add.text(this.dineroMarc.x,this.dineroMarc.y,dineroJ2, style_compra);
						this.textDinero.anchor.setTo(0.7,0.5);
						this.textBFue.destroy();
						this.textBFue=this.add.text(this.button_bala_fuego.x,this.button_bala_fuego.y+50,num_balas_fue_J2, style_compra);
						this.textBFue.anchor.setTo(0.5,0.5);
						this.textBAgu.destroy();
						this.textBAgu=this.add.text(this.button_bala_agua.x,this.button_bala_agua.y+50,num_balas_agu_J2, style_compra);
						this.textBAgu.anchor.setTo(0.5,0.5);
						this.textBAci.destroy();
						this.textBAci=this.add.text(this.button_bala_acido.x,this.button_bala_acido.y+50,num_balas_aci_J2, style_compra);
						this.textBAci.anchor.setTo(0.5,0.5);
						//this.textNum.destroy();	
						//this.textNum=this.add.text(this.personaje.x-50,this.personaje.y+80,3-this.numJ2);	
					}
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
				if(fin_tiempo==0&&this.turno=="J2"){
					if(this.construcAux!=null){
						this.stop_move();
						this.textDinero.destroy();
						this.textDinero=this.add.text(this.dineroMarc.x,this.dineroMarc.y,dineroJ2, style_compra);
						this.textDinero.anchor.setTo(0.7,0.5);
					}

					//mover el telon desde J1
					if(this.turno=="J1"&&fin_tiempo==0){
						this.telon.bringToTop();
						this.telon.body.velocity.x=-300;
						this.button_Madera.visible=false;
						this.textMad.visible=false;
						this.button_Piedra.visible=false;
						this.textPied.visible=false;
						this.button_Metal.visible=false;
						this.textMet.visible=false;
						this.button_Rect_Horz.visible=false;
						this.textRectH.visible=false;
						this.button_Rect_Vert.visible=false;
						this.textRectV.visible=false;
						this.button_Trian.visible=false;
						this.textTrian.visible=false;
						this.button_Cuad.visible=false;
						this.textCuad.visible=false;
						this.cuadroTiempo.visible=false;
						this.button_bala_acido.visible=false;
						this.button_bala_agua.visible=false;
						this.button_bala_fuego.visible=false;
						this.dineroMarc.visible=false;
						this.button_Jugador.visible=false;
						text_cuenta_atras.visible=false;
						this.textDinero.visible=false;
						this.textBFue.visible=false;
						this.textBAgu.visible=false;
						this.textBAci.visible=false;
					}
					//mover el telon desde J2 
					//añadir objetos que destruir antes de moverlo
					if(this.telon.x<960){
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
						//this.textNum.destroy();	
						
						this.balaF.destroy();
						this.balaAg.destroy();
						this.balaAc.destroy();
						this.personaje.destroy();
						this.telon.body.velocity.x=300;
						this.telon.body.allowGravity = false;
						this.telon.bringToTop();
						this.precioBAci.destroy();
						this.precioBFue.destroy();
						this.precioBAgu.destroy();
					}
					//parar elmovimiento horizontal del telon
					if(this.telon.x>=960){
						this.telon.body.velocity.x=0;
						this.telon.body.velocity.y=-300;
						if(cargando_batalla==0){
							this.cargar_batalla(); //Arreglar funcion
							cargando_batalla++;
							this.telon.bringToTop();
							this.game.physics.p2.gravity.y = 100;
						}
					}
					if(this.telon.y<=-1080){
						fin_tiempo=1;
						//tiempo cuenta atras
						cuenta_atras.destroy();
						cuenta_atras=this.time.create();
						final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * auxTiempoBatalla, this.finTiempo);
						text_cuenta_atras=this.game.add.text(928, 80, '00',style_tiempo_2);
						
						this.telon.destroy();
						estado="PREBATALLA"; //arreglar update estado=batalla
						this.turno="J1"
						balaDispara=Bala_J1;
						cuenta_atras.start();
						this.delayAux=0;;
					}
				}		
			}
			this.delayAux++;
		}

		if(estado=="PREBATALLA"){

		
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
			/*Inicio Eliminacion choques con costrucciones propias*/
			if(balaDispara==Bala_J1 && balaDispara.body.x<this.world.width/2 && balaDispara.body.collideWorldBounds == true){
				balaDispara.body.collideWorldBounds = false;
			}
			if(balaDispara==Bala_J1 && balaDispara.body.x>=this.world.width/2 && balaDispara.body.collideWorldBounds == false){
				tipo_J1=Bala_J1.tipo;
				X_J1=Bala_J1.body.x;
				Y_J1=Bala_J1.body.y;
				vel_X_J1=Bala_J1.body.velocity.x;
				vel_Y_J1=Bala_J1.body.velocity.y;
				balaDispara.destroy();
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
				balaDispara=Bala_J1;
				for(var i=0;i<this.contJugJ2;i++){
					this.jugadoresJ2[i].body.createBodyCallback(balaDispara, this.colision, this);
				}
				for(var i=0;i<this.contConstJ2;i++){
					this.construcJ2[i].body.createBodyCallback(balaDispara, this.colision, this);
				}
				this.CannonVaquero.bringToTop();
				this.CannonPirata.bringToTop();
			}
			if(balaDispara==Bala_J2 && balaDispara.body.x>this.world.width/2 && balaDispara.body.collideWorldBounds == true){
				balaDispara.body.collideWorldBounds = false;
			}
			if(balaDispara==Bala_J2 && balaDispara.body.x<=this.world.width/2 && balaDispara.body.collideWorldBounds == false){
				tipo_J2=Bala_J2.tipo;
				X_J2=Bala_J2.body.x;
				Y_J2=Bala_J2.body.y;
				vel_X_J2=Bala_J2.body.velocity.x;
				vel_Y_J2=Bala_J2.body.velocity.y;
				balaDispara.destroy();
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
				balaDispara=Bala_J2;
				for(var i=0;i<this.contJugJ1;i++){
					this.jugadoresJ1[i].body.createBodyCallback(balaDispara, this.colision, this);
				}
				for(var i=0;i<this.contConstJ1;i++){
					this.construcJ1[i].body.createBodyCallback(balaDispara, this.colision, this);
				}
				this.CannonVaquero.bringToTop();
				this.CannonPirata.bringToTop();
			}
			/*Fin Eliminacion choques con costrucciones propias*/
			this.SueloMar2.bringToTop();
			this.SueloMar1.bringToTop();
			this.SueloPirata.bringToTop();
			this.SueloVaquero.bringToTop();
			
			balaDispara.body.gravity.y=2000;
			//CONTROL DESTRUCCION
			for(var i=0;i<this.contConstJ2;i++){
				if(this.construcJ2[i].vida<=0 || this.construcJ2[i].body.x<this.world.width/3 || this.construcJ2[i].body.y>=this.world.height/10*8.5 ){
					this.construcJ2[i].destroy();
					this.construcJ2[i].estado=0;
					this.construcJ2.splice(i, 1);
					this.contConstJ2--;
				}
			}
			for(var i=0;i<this.contJugJ2;i++){
				if((this.jugadoresJ2[i].vida<=0 || this.jugadoresJ2[i].body.x<this.world.width/3 || this.jugadoresJ2[i].body.y>=this.world.height/10*8.5 ) && this.jugadoresJ2[i].estado!=0){
					this.jugadoresJ2[i].destroy();
					this.jugadoresJ2[i].estado=0;
					this.jugadoresJ2.splice(i, 1);
					this.contJugJ2--;
					puntuacion1++;
				}
			}
			for(var i=0;i<this.contConstJ1;i++){
				if(this.construcJ1[i].vida<=0 || this.construcJ1[i].body.x>this.world.width/3*2 || this.construcJ1[i].body.y>=this.world.height/10*8.5 ){
					this.construcJ1[i].destroy();
					this.construcJ1[i].estado=0;
					this.construcJ1.splice(i, 1);
					this.contConstJ1--;
				}
			}
			for(var i=0;i<this.contJugJ1;i++){
				if((this.jugadoresJ1[i].vida<=0 || this.jugadoresJ1[i].body.x>this.world.width/3*2 || this.jugadoresJ1[i].body.y>=this.world.height/10*8.5 ) && this.jugadoresJ1[i].estado!=0){
					this.jugadoresJ1[i].destroy();
					this.jugadoresJ1[i].estado=0;
					this.jugadoresJ1.splice(i, 1);
					this.contJugJ1--;
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
			
			//Inicio Disparo
			puntero=this.input.activePointer;
			arrow.rotation = this.physics.arcade.angleBetween(arrow, balaDispara);
			
			if (catchFlag == true)
			{
				//Track the ball sprite to the mouse
				arrow.alpha = 1;    
				analog.alpha = 0.5;
				analog.rotation = arrow.rotation - 3.14 / 2;
				analog.height = this.physics.arcade.distanceBetween(arrow, this.input.activePointer);    
				launchVelocity = analog.height;
				this.delayAux=0;
			}
			//Fin Disparo
			
			//Inicio Control turnos
			if((disparos==0 && (balaDispara.body.x-balaDispara.width<0 || balaDispara.body.x + balaDispara.width>1920 || balaDispara.body.y+balaDispara.height>1080 || (balaDispara.body.velocity.x<=35 && balaDispara.body.velocity.y<=35 && balaDispara.body.velocity.x>=-35 && balaDispara.body.velocity.y>=-35)))||fin_tiempo==0/* || (this.delayAux>180&&disparos==0)*/){
				balaDispara.body.moves = false;
				balaDispara.body.kinematic = true;
				balaDispara.body.velocity.x=0;
				balaDispara.body.velocity.y=0;
				if(turno==1){
					this.CartelVaqueros.tint=1 * 0xffffff;
					this.CartelPiratas.tint=0.4 * 0xffffff;
					turno=2;
					balaDispara.body.x=100;
					balaDispara.body.y=420;
					balaDispara.visible = false;
					balaDispara=Bala_J2;
					balaDispara.tipo="comun";
					balaDispara.loadTexture('balaComun');
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
					balaDispara.body.x=1820;
					balaDispara.body.y=400;
					turno=1;
					balaDispara.visible = false;
					balaDispara=Bala_J1;
					balaDispara.tipo="comun";
					balaDispara.loadTexture('balaComun');
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
				disparos=1;
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
					if (this.game.physics.arcade.angleToPointer(this.CannonPirata)>-1 && this.game.physics.arcade.angleToPointer(this.CannonPirata)<0.55){
						this.CannonPirata.rotation = this.game.physics.arcade.angleToPointer(this.CannonPirata);
						angulo_rotacion=this.CannonPirata.rotation;
						this.CannonVaquero.rotation =3.15;
					}
				}
				if (turno==2){
					if (this.game.physics.arcade.angleToPointer(this.CannonVaquero)<-2 || this.game.physics.arcade.angleToPointer(this.CannonVaquero)>2.5){
						this.CannonVaquero.rotation = this.game.physics.arcade.angleToPointer(this.CannonVaquero);
						angulo_rotacion=this.CannonVaquero.rotation;
						this.CannonPirata.rotation =0;
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
					this.musica1.destroy();
					this.state.start('MainMenu');
				}
			}
		}
    },
	
	colision:function(juga_constr){
		if(disparos==0){
			if(isNaN(Number(balaDispara.body.velocity.y))){
				Val1=0;
			}else{
				Val1=Number(balaDispara.body.velocity.y);
			}
			if(isNaN(Number(balaDispara.body.velocity.x))){
				Val2=0;
			}else{
				Val2=Number(balaDispara.body.velocity.x);
			}
			velocidad_global=Math.abs(Val1)+Math.abs(Val2);
			if(estado=="BATALLA"){
				if(velocidad_global>300 && (balaDispara.tipo=="comun") ){
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
				if(balaDispara.tipo=="fuego"){
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
					balaDispara.body.x=2000;
					balaDispara.body.y=2000;
					juga_constr.sprite.body.velocity.x=0;
					juga_constr.sprite.body.velocity.y=0;
					juga_constr.sprite.body.angularVelocity=0;
				}
				if(balaDispara.tipo=="acido"){
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
					balaDispara.body.x=2000;
					balaDispara.body.y=2000;
					juga_constr.sprite.body.velocity.x=0;
					juga_constr.sprite.body.velocity.y=0;
					juga_constr.sprite.body.angularVelocity=0;
				}
				if(balaDispara.tipo=="agua"){
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
					balaDispara.body.x=2000;
					balaDispara.body.y=2000;
					juga_constr.sprite.body.velocity.x=0;
					juga_constr.sprite.body.velocity.y=0;
					juga_constr.sprite.body.angularVelocity=0;
				}
			}
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
		//this.game.debug.text(this.movimentoParado(this.construcJ1),20,50,'white');
		//this.game.debug.text(this.input.mousePointer.y,20,100,'white');
		/*for(var i=0;i<this.contConstJ1;i++){
			this.game.debug.text(this.construcJ1[i],20,30+20*i,'white');
		}
		this.game.debug.text(this.telon.x,30,this.telon.y,'white');*/
		/*if(balaDispara){
			this.game.debug.text(balaDispara.body.allowSleep,30,50,'white');
		}*/
		//this.game.debug.text(puntuacion1 + "---" + puntuacion2,500, 300,'white');
	},
	
};
