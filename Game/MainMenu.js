Game.MainMenu = function(game){
	this.button_inicio = null;
	this.button_ajustes = null;
	this.button_tutorial = null;
	this.image_turn = null;
	this.text1=null;
	this.text2=null;
	this.text3=null;
	tamano_fuente=60;
};

Game.MainMenu.prototype ={
    

	
	create:function(){

        var style = {	font: "menu",
						fill: "Black",
						fontSize: "50pt",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
	    
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
		
		this.text1=this.game.add.text(0, 0, "Batalla",style);
		this.text2=this.game.add.text(0, 0, "Ajustes",style);
		this.text3=this.game.add.text(0, 0, "Tutorial",style);
		this.text1.setTextBounds(0, 200, this.game.world.width,100);
		this.text2.setTextBounds(0, 300, this.game.world.width,100);
		this.text3.setTextBounds(0, 400, this.game.world.width,100);
		
		
		/*this.text1.font='Notable-Regular';
		this.text1.fontSize=tamano_fuente;
		this.text1.align = 'center';	
		
		this.text2.font='Notable-Regular';
		this.text2.fontSize=tamano_fuente;
		this.text2.align = 'center';
		
		this.text3.font='Notable-Regular';
		this.text3.fontSize=tamano_fuente;
		this.text3.align = 'center';*/

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
		//this.text1.x=this.button_inicio.x;
		//this.text1.y=this.button_inicio.y;
		this.text1.setTextBounds(0, this.button_inicio.y, this.game.world.width,100);
 
		this.scaleSprite(this.button_ajustes, this.world.width, this.world.height / 3, 50, multiplicador_escala);
		this.button_ajustes.x = this.world.centerX- this.button_ajustes.width / 2;
		this.button_ajustes.y = (this.world.height*this.porcentaje_logo_juego/100) + (this.world.height*((100-this.porcentaje_logo_juego))/100)/this.num_botones*1;//1 es la posicion
		//this.text2.x=this.button_ajustes.x;
		//this.text2.y=this.button_ajustes.y;
		this.text2.setTextBounds(0, this.button_ajustes.y, this.game.world.width,100);
		
		this.scaleSprite(this.button_tutorial, this.world.width, this.world.height / 3, 50, multiplicador_escala);
		this.button_tutorial.x = this.world.centerX - this.button_tutorial.width / 2;
		this.button_tutorial.y = (this.world.height*this.porcentaje_logo_juego/100) + (this.world.height*((100-this.porcentaje_logo_juego))/100)/this.num_botones*2;//2 es la posicion
		//this.text3.x=this.button_tutorial.x;
		//this.text3.y=this.button_tutorial.y;
		this.text3.setTextBounds(0, this.button_tutorial.y, this.game.world.width,100);
	},


	
	render:function() {
		this.game.debug.text(this.text1.font ,40,50,"white");
	}
};

