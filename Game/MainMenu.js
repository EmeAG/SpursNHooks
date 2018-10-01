Game.MainMenu = function(game){
	this.button_inicio = null;
	this.button_ajustes = null;
	this.button_tutorial = null;
	this.image_turn = null;
};


Game.MainMenu.prototype ={

	
	create:function(){
        this.background = this.add.image(0, 0, "background");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
		//imagen mala orientacion
		this.image_turn =this.add.image(0, 0, "landscape");		
		
		this.button_inicio = this.add.button(this.world.centerX, 200, 'button', this.click_button, this, 2, 1, 0);
		this.button_inicio.stage='Battle';
		this.button_ajustes = this.add.button(this.world.centerX, 300, 'button', this.click_button, this, 2, 1, 0);
		this.button_ajustes.stage='Settings';
		this.button_tutorial = this.add.button(this.world.centerX, 400, 'button', this.click_button, this, 2, 1, 0);
		this.button_tutorial.stage='Tutorial';
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
	},

	click_button:function(button){
		this.state.start(button.stage);
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
		this.num_botones=3;//numero de botones, para asignar el porcentaje de la pantalla
		this.porcentaje_logo_juego=30;//espacio de la pantalla que se reserva al titulo del juego
		multiplicador_escala=0.75;//valor por el que se escalaran los botones, depende del tamaño de la pantalla

		this.background.height = this.world.height;
		this.background.width = this.world.width;
 
		this.scaleSprite(this.button_inicio, this.world.width, this.world.height / 3, 50, multiplicador_escala);
		this.button_inicio.x = this.world.centerX- this.button_inicio.width / 2;
		this.button_inicio.y = (this.world.height*this.porcentaje_logo_juego/100) + (this.world.height*((100-this.porcentaje_logo_juego))/100)/this.num_botones*0;//0 es la posicion
 
		this.scaleSprite(this.button_ajustes, this.world.width, this.world.height / 3, 50, multiplicador_escala);
		this.button_ajustes.x = this.world.centerX- this.button_ajustes.width / 2;
		this.button_ajustes.y = (this.world.height*this.porcentaje_logo_juego/100) + (this.world.height*((100-this.porcentaje_logo_juego))/100)/this.num_botones*1;//1 es la posicion
		
		this.scaleSprite(this.button_tutorial, this.world.width, this.world.height / 3, 50, multiplicador_escala);
		this.button_tutorial.x = this.world.centerX - this.button_tutorial.width / 2;
		this.button_tutorial.y = (this.world.height*this.porcentaje_logo_juego/100) + (this.world.height*((100-this.porcentaje_logo_juego))/100)/this.num_botones*2;//2 es la posicion
	},

	
	render:function() {
		this.game.debug.text(this.game.height+'-W-'+ this.game.width ,40,50,"white");
	}
};

