Game.Battle = function(game){
	var SueloPirata =null;
	Objeto=function(){
		this.tipo=null;
		this.material="madera";
		this.vida=null;
		this.peso=null;
	};
	var n1=1;
	var fuerte1=new Array();
	var checkClick=false;
};


Game.Battle.prototype ={
	create:function(){
		
		this.estado="BATALLA";
		this.turno="J1";
		this.angulo2=0;
		this.angulo1=0;
		this.game.physics.arcade.gravity.y = 1;
		
		obj=new Objeto();
		//imagen mala orientacion
		this.image_turn =this.add.image(0, 0, "landscape");	
		//Imagen Fondo
        this.background = this.add.image(0, 0, "background");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
		//Suelos
        this.SueloPirata=this.add.sprite(0, this.world.height- this.cache.getImage("Suelo_Pirata").height, 'Suelo_Pirata');
	    this.SueloVaquero=this.add.sprite(this.world.width-this.world.width/3, this.world.height- this.cache.getImage("Suelo_Vaquero").height, 'Suelo_Vaquero');
	    this.SueloMar=this.add.sprite(this.world.width-this.world.width/3*2, this.world.height- this.cache.getImage("Suelo_Pirata").height, 'Suelo_Pirata');
		
		//Cañon
	    this.CannonPirata=this.add.sprite(this.world.width*0.04, (this.world.height- this.cache.getImage("Cannon_Pirata").height)*0.4, 'Cannon_Pirata');
	    this.CannonVaquero=this.add.sprite((this.world.width- this.cache.getImage("Cannon_Vaquero").width)*0.99, (this.world.height- this.cache.getImage("Cannon_Vaquero").height)*0.4, 'Cannon_Vaquero');	    
		this.CannonVaquero.anchor.setTo(0.85, 0.65);
		this.CannonVaquero.scale.x *= -1;
		this.CannonVaquero.scale.y *= -1;
		this.CannonPirata.anchor.setTo(0.15, 0.35);
		this.game.physics.arcade.enable([this.CannonPirata, this.CannonVaquero]);

		//Balas comunes J1
		this.BalaCom1_J1=this.add.sprite(100,410, 'balaComun');
		this.BalaCom2_J1=this.add.sprite(100,410, 'balaComun');
		this.BalaCom3_J1=this.add.sprite(100,410, 'balaComun');
		this.BalaCom4_J1=this.add.sprite(100,410, 'balaComun');
		this.BalaCom5_J1=this.add.sprite(100,410, 'balaComun');
		this.BalaCom6_J1=this.add.sprite(100,410, 'balaComun');
		this.BalaCom7_J1=this.add.sprite(100,410, 'balaComun');
		this.BalaCom8_J1=this.add.sprite(100,410, 'balaComun');
		this.BalaCom9_J1=this.add.sprite(100,410, 'balaComun');
		this.BalaCom10_J1=this.add.sprite(100,410, 'balaComun');
		//Balas comunes J2
		this.BalaCom1_J2=this.add.sprite(1750,410, 'balaComun');
		this.BalaCom2_J2=this.add.sprite(1750,410, 'balaComun');
		this.BalaCom3_J2=this.add.sprite(1750,410, 'balaComun');
		this.BalaCom4_J2=this.add.sprite(1750,410, 'balaComun');
		this.BalaCom5_J2=this.add.sprite(1750,410, 'balaComun');
		this.BalaCom6_J2=this.add.sprite(1750,410, 'balaComun');
		this.BalaCom7_J2=this.add.sprite(1750,410, 'balaComun');
		this.BalaCom8_J2=this.add.sprite(1750,410, 'balaComun');
		this.BalaCom9_J2=this.add.sprite(1750,410, 'balaComun');
		this.BalaCom10_J2=this.add.sprite(1750,410, 'balaComun');

		
		//Boton Materiales
		this.button_Madera = this.add.button(this.world.centerX, 100, 'button', this.change_material_madera, this, 2, 1, 0);
		this.button_Piedra = this.add.button(this.world.centerX, 200, 'button', this.change_material_piedra, this, 2, 1, 0);
		this.button_Metal = this.add.button(this.world.centerX, 300, 'button', this.change_material_metal, this, 2, 1, 0);

		//Boton Tipos de Objetos
		this.button_Rect_Vert = this.add.button(this.world.centerX+100, 100, 'button', this.change_tipo_rect, this, 2, 1, 0);
		this.button_Rect_Horz = this.add.button(this.world.centerX+100, 200, 'button', this.change_tipo_rect, this, 2, 1, 0);
		this.button_Cuad = this.add.button(this.world.centerX+100, 300, 'button', this.change_tipo_cuad, this, 2, 1, 0);
		this.button_Trian = this.add.button(this.world.centerX+100, 400, 'button', this.change_tipo_trian, this, 2, 1, 0);

		//Objetos
		this.bloq_mad_cuad=this.add.sprite(-100,-100,"Bloq_mad_cuad");
		this.bloq_mad_trian=this.add.sprite(-100,-100,"Bloq_mad_trian");
		this.bloq_mad_rect=this.add.sprite(-100,-100,"Bloq_mad_rect");
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

	change_tipo_trian:function(){
		obj.tipo="trian";
	},
	change_tipo_cuad:function(){
		obj.tipo="cuad";
	},
	change_tipo_rect:function(){
		obj.tipo="rect";
	},

	crear_pieza:function(posicion){
		if(this.input.onDown && posicion){
			//this.fuerte1[this.n]=this.obj;
			this.n++;
		}
	},

	mouse_correct_possition(posx0,posx1){
		
		if(this.input.x<=posx1 && this.input.x>=posx0){
			return true;
		}
		else{
			return false;
		}
	},
	
	update:function(){
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
		//this.crear_pieza(this.mouse_correct_possition(0,this.world.width/3,true));
		
		//Giro de los cañones
		if (this.estado=="BATALLA"){
			if (this.turno=="J1"){
				if (this.game.physics.arcade.angleToPointer(this.CannonPirata)>-1.1 && this.game.physics.arcade.angleToPointer(this.CannonPirata)<0.55){
					this.CannonPirata.rotation = this.game.physics.arcade.angleToPointer(this.CannonPirata);
					this.CannonVaquero.rotation =3.15;
				}
			}
			if (this.turno=="J2"){
				if (this.game.physics.arcade.angleToPointer(this.CannonVaquero)<-2 || this.game.physics.arcade.angleToPointer(this.CannonVaquero)>2.5){
					this.CannonVaquero.rotation = this.game.physics.arcade.angleToPointer(this.CannonVaquero);
					this.CannonPirata.rotation =0;
				}
			}
		}
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
		this.SueloMar.width = this.world.width/3;
		this.SueloMar.x=this.world.width-this.world.width/3*2;
		this.SueloMar.y=this.world.height-this.SueloMar.height;
		
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
	},

	
	render:function() {
		this.game.debug.text(this.game.physics.arcade.angleToPointer(this.CannonPirata),32,15,"white");
		this.game.debug.text(this.CannonVaquero.angle,32,35,"white");
		//var primero=this.fuerte[1];
		//this.game.debug.text(primero.material,32,8,"white");
	},
	
};
