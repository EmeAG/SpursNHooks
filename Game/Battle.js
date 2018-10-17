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


Game.Battle.prototype ={
	create:function(){
		this.construcAux=null;
		obj=new Objeto();
		this.cont=0;
		this.arr=[];
		this.num0=-1;
		this.delayAux=0;


		//imagen mala orientacion
		this.image_turn =this.add.image(0, 0, "landscape");		
		//Imagen Fondo
        this.background = this.add.image(0, 0, "background");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		//Suelos
        this.SueloPirata=this.add.sprite(0, this.world.height- this.cache.getImage("Suelo_Pirata").height, 'Suelo_Pirata');
	    this.SueloVaquero=this.add.sprite(this.world.width-this.world.width/3, this.world.height- this.cache.getImage("Suelo_Vaquero").height, 'Suelo_Pirata');
	    this.SueloMar=this.add.sprite(this.world.width-this.world.width/3*2, this.world.height- this.cache.getImage("Suelo_Pirata").height, 'Suelo_Pirata');

		//Boton Materiales
		this.button_Madera = this.add.button(this.world.centerX, 100, 'button', this.change_material_madera, this, 2, 1, 0);
		this.button_Piedra = this.add.button(this.world.centerX, 200, 'button', this.change_material_piedra, this, 2, 1, 0);
		this.button_Metal = this.add.button(this.world.centerX, 300, 'button', this.change_material_metal, this, 2, 1, 0);

		//Boton Tipos de Objetos
		this.button_Rect_Vert = this.add.button(this.world.centerX+100, 100, 'button', this.create_tipo_rectV, this, 2, 1, 0);
		this.button_Rect_Horz = this.add.button(this.world.centerX+100, 200, 'button', this.create_tipo_rectH, this, 2, 1, 0);
		this.button_Trian = this.add.button(this.world.centerX+100, 400, 'button', this.create_tipo_trian, this, 2, 1, 0);
		this.button_Cuad = this.add.button(this.world.centerX+100, 300, 'button', this.create_tipo_cuad, this, 2, 1, 0);
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
			this.bloq_mad_trian=this.add.sprite(this.button_Trian.x,this.button_Trian.y,'Bloq_mad_trian');
			this.bloq_mad_trian.inputEnabled=true;
			this.bloq_mad_trian.num=this.cont;
			this.num0=this.cont;
			this.construcAux=this.bloq_mad_trian;
		}
	},
	create_tipo_cuad:function(){
		if(this.construcAux==null){
			this.bloq_mad_cuad=this.add.sprite(this.button_Cuad.x,this.button_Cuad.y,'Bloq_mad_cuad');
			this.bloq_mad_cuad.inputEnabled=true;
			this.bloq_mad_cuad.num=this.cont;
			this.num0=this.cont;
			this.construcAux=this.bloq_mad_cuad;
		}
	},
	create_tipo_rectV:function(){
		if(this.construcAux==null){
			this.bloq_mad_rect=this.add.sprite(this.button_Rect_Vert.x,this.button_Rect_Vert.y,'Bloq_mad_rect');
			this.bloq_mad_rect.inputEnabled=true;
			this.bloq_mad_rect.num=this.cont;
			this.num0=this.cont;
			this.construcAux=this.bloq_mad_rect;
		}
	},
	create_tipo_rectH:function(){
		if(this.construcAux==null){
			this.bloq_mad_rect=this.add.sprite(this.button_Rect_Horz.x,this.button_Rect_Horz.y,'Bloq_mad_rect');
			this.bloq_mad_rect.angle+=90;
			this.bloq_mad_rect.inputEnabled=true;
			this.bloq_mad_rect.num=this.cont;
			this.num0=this.cont;
			this.construcAux=this.bloq_mad_rect;
		}
	},

	move_sprite:function(objeto){
		objeto.anchor.setTo(0.5,0.5);
		objeto.x=this.input.mousePointer.x;
		objeto.y=this.input.mousePointer.y;
	},

	stop_move:function(){
		if(this.input.mousePointer.isDown && this.construcAux!=null && this.delayAux>15){
			this.arr[this.cont]=this.construcAux;
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
		if(this.num0>=0 && this.construcAux!=null){
			if(this.construcAux!=null){
				this.move_sprite(this.construcAux);
				if(this.delayAux>15){
					this.stop_move();
				}
			}
		}
		else{
			this.construcAux=this.arr[this.num0];
		}
		
		this.delayAux++;
		this.resize()
		
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
		this.game.debug.text(this.construcAux,32,32,"white");
		this.game.debug.text(this.delayAux,32,15,"white");
	},
	
};