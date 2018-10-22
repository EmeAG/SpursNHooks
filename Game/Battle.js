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
var num_balas_fue_J1=1;
var num_balas_fue_J2=1;
var num_balas_agu_J1=1;
var num_balas_agu_J2=1;
var num_balas_aci_J1=1;
var num_balas_aci_J2=1;
var style_contador={font: "60px Arial"};

Game.Battle.prototype ={
	create:function(){
		this.construcAux=null;
		
		this.estado="CONSTRUCCION";
		this.turno="J1";
		this.auxTiempo=30;

		this.estado="BATALLA";
		this.angulo2=0;
		this.angulo1=0;

		
		obj=new Objeto();
		this.cont=0;
		this.arr=[];
		this.num0=-1;
		this.delayAux=0;


		//imagen mala orientacion
		this.image_turn =this.add.image(0, 0, "landscape");	
		//Imagen Fondo
        this.background = this.add.image(0, 0, "FondoBatalla");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		//Activar lanzamiento
		this.background.inputEnabled = true;
		this.background.input.start(0, true);
		this.background.events.onInputDown.add(this.set);
		this.background.events.onInputUp.add(this.launch);		

		//Suelos
        this.SueloPirata=this.add.sprite(0, this.world.height- this.cache.getImage("Suelo_Pirata").height, 'Suelo_Pirata');
	    this.SueloVaquero=this.add.sprite(this.world.width-this.world.width/3, this.world.height- this.cache.getImage("Suelo_Vaquero").height, 'Suelo_Vaquero');
		this.game.physics.arcade.enable([this.SueloPirata, this.SueloVaquero]);
	    this.SueloMar=this.add.sprite(0, this.world.height- this.cache.getImage("Suelo_Mar").height, 'Suelo_Mar');
		this.SueloPirata.body.immovable = true;
		this.SueloVaquero.body.immovable = true;
		this.SueloVaquero.body.collideWorldBounds = true;
		this.SueloPirata.body.collideWorldBounds = true;
		this.SueloVaquero.body.bounce.set(1);
		this.SueloPirata.body.bounce.set(1);

		if(this.estado=="BATALLA"){
			
			this.angulo2=0;
			this.angulo1=0;
			this.game.physics.arcade.gravity.y = 3800;
			this.game.physics.arcade.setBoundsToWorld();
			//Marcador
			this.Marcador=this.add.sprite(637, 0, 'Marcador');
			this.CartelVaqueros=this.add.sprite(1040, 35, 'CartelVaqueros');
			this.CartelPiratas=this.add.sprite(670, 35, 'CartelPiratas');
			this.CartelVaqueros.tint=0.4 * 0xffffff;
			
			//tiempo cuenta atras
			cuenta_atras=this.time.create();
			final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * 30, this.finTiempo);
			cuenta_atras.start();
			text_cuenta_atras=this.game.add.text(928, 80, '00',style_contador);


			//Cañon
			this.CannonPirata=this.add.sprite(this.world.width*0.04, (this.world.height- this.cache.getImage("Cannon_Pirata").height)*0.4, 'Cannon_Pirata');
			this.CannonVaquero=this.add.sprite((this.world.width- this.cache.getImage("Cannon_Vaquero").width)*0.99, (this.world.height- this.cache.getImage("Cannon_Vaquero").height)*0.4, 'Cannon_Vaquero');	    
			this.CannonVaquero.anchor.setTo(0.85, 0.65);
			this.CannonVaquero.scale.x *= -1;
			this.CannonVaquero.scale.y *= -1;
			this.CannonPirata.anchor.setTo(0.15, 0.35);
			this.game.physics.arcade.enable([this.CannonPirata, this.CannonVaquero]);
			this.CannonPirata.body.moves = false;
			this.CannonVaquero.body.moves = false;
			
			//Balas comunes J1
			BalaCom1_J1=this.add.sprite(135,420, 'balaComun');
			this.physics.enable(BalaCom1_J1, Phaser.Physics.ARCADE);
			BalaCom1_J1.anchor.set(0.5,0.5);
			BalaCom1_J1.body.bounce.set(0.2);
			BalaCom1_J1.body.drag.set(20, 20);
			BalaCom1_J1.body.moves = false;	
			BalaCom1_J1.pivot.x=-200;
			BalaCom1_J1.pivot.y=-20;
			BalaCom1_J1.scale.x *= 0.75;
			BalaCom1_J1.scale.y *= 0.75;
			BalaCom1_J1.body.setCircle(35);

			//Balas Agua J1
			BalaAgu_J1=this.add.sprite(135,420, 'balaAgua');
			this.physics.enable(BalaAgu_J1, Phaser.Physics.ARCADE);
			BalaAgu_J1.anchor.set(0.5,0.5);
			BalaAgu_J1.body.bounce.set(0.2);
			BalaAgu_J1.body.drag.set(20, 20);
			BalaAgu_J1.body.moves = false;	
			BalaAgu_J1.pivot.x=-200;
			BalaAgu_J1.pivot.y=-20;
			BalaAgu_J1.scale.x *= 0.75;
			BalaAgu_J1.scale.y *= 0.75;
			BalaAgu_J1.body.setCircle(35);	
			
			//Balas Fuego J1
			BalaFueg_J1=this.add.sprite(135,420, 'balaFuego');
			this.physics.enable(BalaFueg_J1, Phaser.Physics.ARCADE);
			BalaFueg_J1.anchor.set(0.5,0.5);
			BalaFueg_J1.body.bounce.set(0.2);
			BalaFueg_J1.body.drag.set(20, 20);
			BalaFueg_J1.body.moves = false;	
			BalaFueg_J1.pivot.x=-200;
			BalaFueg_J1.pivot.y=-20;
			BalaFueg_J1.scale.x *= 0.75;
			BalaFueg_J1.scale.y *= 0.75;
			BalaFueg_J1.body.setCircle(35);
			
			//Balas Acido J1
			BalaAcid_J1=this.add.sprite(135,420, 'balaAcido');
			this.physics.enable(BalaAcid_J1, Phaser.Physics.ARCADE);
			BalaAcid_J1.anchor.set(0.5,0.5);
			BalaAcid_J1.body.bounce.set(0.2);
			BalaAcid_J1.body.drag.set(20, 20);
			BalaAcid_J1.body.moves = false;	
			BalaAcid_J1.pivot.x=-200;
			BalaAcid_J1.pivot.y=-20;
			BalaAcid_J1.scale.x *= 0.75;
			BalaAcid_J1.scale.y *= 0.75;
			BalaAcid_J1.body.setCircle(35);
			
			//Balas comunes J2
			BalaCom1_J2=this.add.sprite(1825,450, 'balaComun');
			this.physics.enable(BalaCom1_J2, Phaser.Physics.ARCADE);
			BalaCom1_J2.anchor.set(0.5,0.5);
			BalaCom1_J2.body.bounce.set(0.2);
			BalaCom1_J2.body.drag.set(20, 20);
			BalaCom1_J2.body.moves = false;
			BalaCom1_J2.pivot.x=-225;
			BalaCom1_J2.pivot.y=-20;
			BalaCom1_J2.scale.x *= 0.75;
			BalaCom1_J2.scale.y *= 0.75;
			BalaCom1_J2.body.setCircle(35);
			
			//Balas Agua J2
			BalaAgu_J2=this.add.sprite(1825,450, 'balaAgua');
			this.physics.enable(BalaAgu_J2, Phaser.Physics.ARCADE);
			BalaAgu_J2.anchor.set(0.5,0.5);
			BalaAgu_J2.body.bounce.set(0.2);
			BalaAgu_J2.body.drag.set(20, 20);
			BalaAgu_J2.body.moves = false;
			BalaAgu_J2.pivot.x=-225;
			BalaAgu_J2.pivot.y=-20;
			BalaAgu_J2.scale.x *= 0.75;
			BalaAgu_J2.scale.y *= 0.75;
			BalaAgu_J2.body.setCircle(35);
			
			//Balas Fuego J2
			BalaFueg_J2=this.add.sprite(1825,450, 'balaFuego');
			this.physics.enable(BalaFueg_J2, Phaser.Physics.ARCADE);
			BalaFueg_J2.anchor.set(0.5,0.5);
			BalaFueg_J2.body.bounce.set(0.2);
			BalaFueg_J2.body.drag.set(20, 20);
			BalaFueg_J2.body.moves = false;
			BalaFueg_J2.pivot.x=-225;
			BalaFueg_J2.pivot.y=-20;
			BalaFueg_J2.scale.x *= 0.75;
			BalaFueg_J2.scale.y *= 0.75;
			BalaFueg_J2.body.setCircle(35);
			
			//Balas Acido J2
			BalaAcid_J2=this.add.sprite(1825,450, 'balaAcido');
			this.physics.enable(BalaAcid_J2, Phaser.Physics.ARCADE);
			BalaAcid_J2.anchor.set(0.5,0.5);
			BalaAcid_J2.body.bounce.set(0.2);
			BalaAcid_J2.body.drag.set(20, 20);
			BalaAcid_J2.body.moves = false;
			BalaAcid_J2.pivot.x=-225;
			BalaAcid_J2.pivot.y=-20;
			BalaAcid_J2.scale.x *= 0.75;
			BalaAcid_J2.scale.y *= 0.75;
			BalaAcid_J2.body.setCircle(35);	

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
		}

		if(this.estado=="CONSTRUCCION"){

			this.game.physics.arcade.gravity.y=100;
			TrianguloMad=this.add.sprite(0,0,'Bloq_mad_trian');
			this.physics.enable(TrianguloMad,Phaser.Physics.ARCADE);
			TrianguloMad.inputEnabled=true;
			//this.construcAux=TrianguloMad;
			this.physics.arcade.collide(this.SueloPirata, this.bloq_mad_trian);

			if(this.turno=="J1"){

				//Telon
				this.telon=this.add.sprite(this.world.width/3,0,'telon');

				//Boton Materiales
				this.button_Madera = this.add.button(this.world.width/3+100, 100, 'boton_Material', this.change_material_madera, this, 2, 1, 0);
				this.text0=this.game.add.text(this.button_Madera.x,this.button_Madera.y,"Madera");
				this.button_Piedra = this.add.button(this.world.width/3+100, 100+this.cache.getImage('boton_Material').height+5, 'boton_Material', this.change_material_piedra, this, 2, 1, 0);
				this.text0=this.game.add.text(this.button_Piedra.x,this.button_Piedra.y,"Piedra");
				this.button_Metal = this.add.button(this.world.width/3+100, 100+this.cache.getImage('boton_Material').height*2+5, 'boton_Material', this.change_material_metal, this, 2, 1, 0);
				this.text0=this.game.add.text(this.button_Metal.x,this.button_Metal.y,"Metal");

				//Boton Tipos de Objetos
				this.button_Rect_Vert = this.add.button(this.world.width/3+100+this.cache.getImage('boton_Material').width, 10, 'boton_Tipo', this.create_tipo_rectV, this, 2, 1, 0);
				this.text0=this.game.add.text(this.button_Rect_Vert.x,this.button_Rect_Vert.y,"Rectangulo Vert");
				this.button_Rect_Horz = this.add.button(this.world.width/3+100+this.cache.getImage('boton_Material').width, 10+this.cache.getImage('boton_Tipo').height+5, 'boton_Tipo', this.create_tipo_rectH, this, 2, 1, 0);
				this.text1=this.game.add.text(this.button_Rect_Horz.x,this.button_Rect_Horz.y,"Rectangulo Horz");
				this.button_Trian = this.add.button(this.world.width/3+100+this.cache.getImage('boton_Material').width, 10+this.cache.getImage('boton_Tipo').height*2+5, 'boton_Tipo', this.create_tipo_trian, this, 2, 1, 0);
				this.text2=this.game.add.text(this.button_Trian.x,this.button_Trian.y,"Triangulo");
				this.button_Cuad = this.add.button(this.world.width/3+100+this.cache.getImage('boton_Material').width, 10+this.cache.getImage('boton_Tipo').height*3+5, 'boton_Tipo', this.create_tipo_cuad, this, 2, 1, 0);
				this.text3=this.game.add.text(this.button_Cuad.x,this.button_Cuad.y,"Cuadrado");

				//Boton Tiempo
				this.cuadroTiempo=this.add.sprite(this.world.width-this.cache.getImage('cuadro_Tiempo').width,0,'cuadro_Tiempo');
				tiempo=this.time.create();
				finalTiempo=tiempo.add(Phaser.Timer.SECOND * 30, this.finTiempo);
				tiempo.start();
				text_tiempo=this.game.add.text(this.world.width-this.cache.getImage('cuadro_Tiempo').width,0, '00',style_contador);
			}
		}
		
	},
	

	finTiempo:function(){
		fin_tiempo=0;
	},
	
	
	//Selector de las balas 
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

	//Funciones para el disparo	
	set:function(player,pointer) {
		if(disparos>0){
			catchFlag = true;
			balaDispara.body.moves = false;
			balaDispara.body.velocity.setTo(0, 0);
			arrow.reset(pointer.x, pointer.y);
			analog.reset(pointer.x, pointer.y);
		}
	},

	//Disparo
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

	change_material_madera:function(){
		obj.material="madera";
	},

	change_material_piedra:function(){
		obj.material="piedra";
	},

	change_material_metal:function(){
		obj.material="metal";
	},

	create_tipo_trian:function(){
		if(this.construcAux==null){
			if(obj.material=="madera"){
				this.bloq_mad_trian=this.add.sprite(this.button_Trian.x,this.button_Trian.y,'Bloq_mad_trian');
				this.bloq_mad_trian.inputEnabled=true;
				this.bloq_mad_trian.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_mad_trian;
<<<<<<< HEAD
				this.arr[this.cont]=this.construcAux;
=======
>>>>>>> f45f1004e0f98989f6d64542d8050c8f1084559d
			}
			if(obj.material=="piedra"){
				this.bloq_pied_trian=this.add.sprite(this.button_Trian.x,this.button_Trian.y,'Bloq_pied_trian');
				this.bloq_pied_trian.inputEnabled=true;
				this.bloq_pied_trian.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_pied_trian;
			}
			if(obj.material=="metal"){
				this.bloq_met_trian=this.add.sprite(this.button_Trian.x,this.button_Trian.y,'Bloq_met_trian');
				this.bloq_met_trian.inputEnabled=true;
				this.bloq_met_trian.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_met_trian;
			}
		}
	},
	create_tipo_cuad:function(){
		if(this.construcAux==null){
			if(obj.material=="madera"){
				this.bloq_mad_cuad=this.add.sprite(this.button_Cuad.x,this.button_Cuad.y,'Bloq_mad_cuad');
				this.bloq_mad_cuad.inputEnabled=true;
				this.bloq_mad_cuad.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_mad_cuad;
			}
			if(obj.material=="piedra"){
				this.bloq_pied_cuad=this.add.sprite(this.button_Cuad.x,this.button_Cuad.y,'Bloq_pied_cuad');
				this.bloq_pied_cuad.inputEnabled=true;
				this.bloq_pied_cuad.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_pied_cuad;
			}
			if(obj.material=="metal"){
				this.bloq_met_cuad=this.add.sprite(this.button_Cuad.x,this.button_Cuad.y,'Bloq_met_cuad');
				this.bloq_met_cuad.inputEnabled=true;
				this.bloq_met_cuad.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_met_cuad;
			}
		}
	},
	create_tipo_rectV:function(){
		if(this.construcAux==null){
			if(obj.material=="madera"){
				this.bloq_mad_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_mad_rect');
				this.bloq_mad_rect.inputEnabled=true;
				this.bloq_mad_rect.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_mad_rect;
			}
			if(obj.material=="piedra"){
				this.bloq_pied_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_pied_rect');
				this.bloq_pied_rect.inputEnabled=true;
				this.bloq_pied_rect.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_pied_rect;
			}
			if(obj.material=="metal"){
				this.bloq_met_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_met_rect');
				this.bloq_met_rect.inputEnabled=true;
				this.bloq_met_rect.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_met_rect;
			}
		}
	},
	create_tipo_rectH:function(){
		if(this.construcAux==null){
			if(obj.material=="madera"){
				this.bloq_mad_rect=this.add.sprite(this.button_Rect_Horz.x,this.button_Rect_Horz.y,'Bloq_mad_rect');
				this.bloq_mad_rect.angle+=90;
				this.bloq_mad_rect.inputEnabled=true;
				this.bloq_mad_rect.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_mad_rect;
			}
			if(obj.material=="piedra"){
				this.bloq_pied_rect=this.add.sprite(this.button_Rect_Horz.x,this.button_Rect_Horz.y,'Bloq_pied_rect');
				this.bloq_pied_rect.angle+=90;
				this.bloq_pied_rect.inputEnabled=true;
				this.bloq_pied_rect.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_pied_rect;
			}
			if(obj.material=="metal"){
				this.bloq_met_rect=this.add.sprite(this.button_Rect_Horz.x,this.button_Rect_Horz.y,'Bloq_met_rect');
				this.bloq_met_rect.angle+=90;
				this.bloq_met_rect.inputEnabled=true;
				this.bloq_met_rect.num=this.cont;
				this.num0=this.cont;
				this.construcAux=this.bloq_met_rect;
			}
		}
	},

	move_sprite:function(objeto){
		objeto.anchor.setTo(0.5,0.5);
		objeto.x=this.input.mousePointer.x;
		objeto.y=this.input.mousePointer.y;
	},

	stop_move:function(){
		if(this.input.mousePointer.isDown && this.construcAux!=null && this.delayAux>15){
			//this.arr[this.cont]=this.construcAux;
			this.arr[this.cont].events.onInputDown.add(this.click_sprite,this);
			this.cont++;
			this.construcAux=null;
			this.num0=-1;
		}
	},

	click_sprite:function(objeto){
		if(this.num0==-1){
			this.num0=objeto.num;
			this.delayAux=0;
		}
	},

	update:function(){
		if (this.estado=="BATALLA"){
			//Fisicas entre objetos
			this.physics.arcade.collide(this.SueloPirata, balaDispara);
			this.physics.arcade.collide(this.SueloVaquero, balaDispara);
			
			//Inicio Disparo
			puntero=this.input.activePointer;
			arrow.rotation = this.physics.arcade.angleBetween(arrow, balaDispara);
			
			if (catchFlag == true)
			{
				//  Track the ball sprite to the mouse
				arrow.alpha = 1;    
				analog.alpha = 0.5;
				analog.rotation = arrow.rotation - 3.14 / 2;
				analog.height = this.physics.arcade.distanceBetween(arrow, this.input.activePointer);    
				launchVelocity = analog.height;
			}	
			//Fin Disparo

			//Inicio Actualizar cuenta atrás
			segundos="0" + Math.round((final_cuent_atras.delay - cuenta_atras.ms) / 1000);
			text_cuenta_atras.text=segundos.substr(-2); 
			//Fin  Actualizar cuenta atrás
		}
		
		//Inicio Pantalla en Vertical
		if (this.scale.isPortrait){
			this.image_turn.height = this.game.height;
			this.image_turn.width = this.game.width;
			this.image_turn.visible=true;
			this.image_turn.bringToTop();
		}else{
			if (this.image_turn.visible === true){
				this.image_turn.visible=false;
			}
		}	
		
		if(this.estado=="CONSTRUCCION"){
<<<<<<< HEAD

			for(var i=0;i<this.cont;i++){
				this.physics.arcade.collide(this.arr[i],this.SueloPirata);
				for(var j=0;j<this.cont;j++){
					if(j!=i){
						this.physics.arcade.collide(this.arr[i],this.arr[j]);
					}
				}
			}
			this.physics.arcade.collide(this.SueloPirata,TrianguloMad);

=======
>>>>>>> f45f1004e0f98989f6d64542d8050c8f1084559d
			if(this.num0>=0 && this.construcAux!=null){
				if(this.construcAux!=null){
					this.move_sprite(this.construcAux);
				}
				if(this.delayAux>15){
					this.stop_move();
				}			
			}
			else{
				this.construcAux=this.arr[this.num0];
			}
			fin_tiempo=1;
			tiempo.destroy();
			finalTiempo=this.time.create();
			finalTiempo=tiempo.add(Phaser.Timer.SECOND * 30, this.finTiempo);
			tiempo.start();
			this.delayAux++;

		}
		//this.crear_pieza(this.mouse_correct_possition(0,this.world.width/3,true));
		
		//Inicio Giro de los cañones
		if (this.estado=="BATALLA" && catchFlag != true && disparos>0){
			//Fisicas entre objetos
			this.physics.arcade.collide(this.SueloPirata, balaDispara);
			this.physics.arcade.collide(this.SueloVaquero, balaDispara);
		
			//Inicio Disparo
			puntero=this.input.activePointer;
			arrow.rotation = this.physics.arcade.angleBetween(arrow, balaDispara);
			
			if (catchFlag == true)
			{
				//  Track the ball sprite to the mouse
				arrow.alpha = 1;    
				analog.alpha = 0.5;
				analog.rotation = arrow.rotation - 3.14 / 2;
				analog.height = this.physics.arcade.distanceBetween(arrow, this.input.activePointer);    
				launchVelocity = analog.height;
			}		
			//Fin Disparo
		
			if (turno==1){
				if (this.game.physics.arcade.angleToPointer(this.CannonPirata)>-1.1 && this.game.physics.arcade.angleToPointer(this.CannonPirata)<0.55){
					this.CannonPirata.rotation = this.game.physics.arcade.angleToPointer(this.CannonPirata);
					this.CannonVaquero.rotation =3.15;
				}
				if (this.game.physics.arcade.angleToPointer(balaDispara)>-1.2 && this.game.physics.arcade.angleToPointer(balaDispara)<0.65){
					balaDispara.rotation = this.game.physics.arcade.angleToPointer(balaDispara);
				}
			}
			if (turno==2){
				if (this.game.physics.arcade.angleToPointer(this.CannonVaquero)<-2 || this.game.physics.arcade.angleToPointer(this.CannonVaquero)>2.5){
					this.CannonVaquero.rotation = this.game.physics.arcade.angleToPointer(this.CannonVaquero);
					this.CannonPirata.rotation =0;
				}
				if (this.game.physics.arcade.angleToPointer(balaDispara)<-2 || this.game.physics.arcade.angleToPointer(balaDispara)>2.5){
					balaDispara.rotation = this.game.physics.arcade.angleToPointer(balaDispara);
				}
			}
		}
		//Fin Giro de los cañones

		//Inicio Control turnos
		if((disparos==0 && (balaDispara.body.x<0||balaDispara.body.x>1920||balaDispara.body.y>1080 || (balaDispara.body.velocity.x==0 && balaDispara.body.velocity.y==0)))||fin_tiempo==0){
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
<<<<<<< HEAD
			//Fin Control turnos	
			this.resize();
=======
			balaDispara.visible = true;
			disparos++;
			fin_tiempo=1;
			cuenta_atras.destroy();
			cuenta_atras=this.time.create();
			final_cuent_atras=cuenta_atras.add(Phaser.Timer.SECOND * 30, this.finTiempo);
			button_BalaComun.tint=0.78 * 0xffffff;
			cuenta_atras.start();		
>>>>>>> f45f1004e0f98989f6d64542d8050c8f1084559d
		}
		//Fin Control turnos	
		this.resize();
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
		
		if(this.estado=="BATALLA"){
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
		//this.game.debug.text(this.game.physics.arcade.angleToPointer(BalaCom1_J2),32,32,"white");
		//this.game.debug.text(balaDispara.body.velocity.x +"---"+balaDispara.body.velocity.y ,32,15,"white");
	//	this.game.debug.text(cuenta_atras.duration.toFixed(0),32,15,"white");
	//	this.game.debug.text(fin_tiempo,92,15,"white");
		//this.game.debug.text(this.game.physics.arcade.angleToPointer(this.CannonPirata),32,15,"white");
		//this.game.debug.text(this.CannonVaquero.angle,32,35,"white");
		//var primero=this.fuerte[1];
		//this.game.debug.text(primero.material,32,8,"white");
	//	this.game.debug.body(BalaCom1_J2);
	//	this.game.debug.body(BalaCom1_J1);
		this.game.debug.body(this.SueloPirata);
		this.game.debug.body(this.SueloVaquero);

		this.game.debug.body(TrianguloMad);
		//this.game.debug.text(this.tiempo,32,32,'white');
	},
	
};
