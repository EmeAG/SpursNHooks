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
		this.resize();
		//this.crear_pieza(this.mouse_correct_possition(0,this.world.width/3,true));
		
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
		
	},

	
	render:function() {
		this.game.debug.text(this.SueloPirata.height ,40,50,"white");
		this.game.debug.text(obj.material, 32, 32,"white");
		this.game.debug.text(obj.tipo,32,15,"white");
		//var primero=this.fuerte[1];
		//this.game.debug.text(primero.material,32,8,"white");
	},
	
};