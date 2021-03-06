Game.MainMenu = function(game){
};

Game.MainMenu.prototype ={

	
	
	create:function(){
		this.seleccion;
		this.game.physics.p2.gravity.y = 0;
		this.musica=this.game.add.audio("menuMusic",0.09,true);
		this.musica.play();
        var style = {	font: "35px Ultra",
						fill: "Black",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
        this.background = this.add.image(0, 0, "fondoMenu");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
		//imagen mala orientacion
		this.image_turn =this.add.image(0, 0, "landscape");
		
		this.button_offline = this.add.button(this.world.centerX, 200, 'botonTipo', this.click_button, this, 2, 1, 0);
		this.button_offline.stage='Battle Offline';
		this.button_online = this.add.button(this.world.centerX, 300, 'botonTipo', this.click_button, this, 2, 1, 0);
		this.button_online.stage='Battle Online';
		this.button_ajustes = this.add.button(this.world.centerX, 400, 'botonTipo', this.click_button, this, 2, 1, 0);
		this.button_ajustes.stage='Settings';
		this.button_tutorial = this.add.button(this.world.centerX, 500, 'botonTipo', this.click_button, this, 2, 1, 0);
		this.button_tutorial.stage='Tutorial';
		
		this.text1=this.game.add.text(0, 0, "Batalla Online",style);
		this.text1.font = 'Ultra';
		this.text2=this.game.add.text(0, 0, "Batalla Offline",style);
		this.text2.font = 'Ultra';
		this.text3=this.game.add.text(0, 0, "Ajustes",style);
		this.text3.font = 'Ultra';
		this.text4=this.game.add.text(0, 0, "Tutorial",style);
		this.text4.font = 'Ultra';
		this.text1.setTextBounds(0, 200, this.game.world.width,100);
		this.text2.setTextBounds(0, 300, this.game.world.width,100);
		this.text3.setTextBounds(0, 400, this.game.world.width,100);
		this.text4.setTextBounds(0, 500, this.game.world.width,100);
		
	    this.telon=this.game.add.sprite(960,/*-1080*/-540,'telon');
		this.physics.p2.enable(this.telon);
		this.telon.body.collideWorldBounds = false;

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
		if(this.telon.y>=540){
			this.musica.destroy();
			if(this.seleccion=='Battle Offline'){
				this.state.start('Battle_Offline');
			}else{
				this.state.start('Esperar_jugador');
			}
		}
	},

	click_button:function(button){
		if (button.stage!='Battle Offline' && button.stage!='Battle Online'){
			this.state.start(button.stage);
		}else{
			this.seleccion=button.stage;
			this.telon.body.velocity.y = 360;
			this.button_online.inputEnabled = false;
			this.button_offline.inputEnabled = false;
			this.button_ajustes.inputEnabled = false;
			this.button_tutorial.inputEnabled = false;
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
		this.num_botones=4;//numero de botones, para asignar el porcentaje de la pantalla
		this.porcentaje_logo_juego=15;//espacio de la pantalla que se reserva al titulo del juego
		multiplicador_escala=1.75;//valor por el que se escalaran los botones, depende del tamaño de la pantalla

		this.background.height = this.world.height;
		this.background.width = this.world.width;
 
		this.scaleSprite(this.button_online, this.world.width, this.world.height / 3, 50, multiplicador_escala);
		this.button_online.x = this.world.centerX- this.button_online.width / 2;
		this.button_online.y = (this.world.height*this.porcentaje_logo_juego/100) + (this.world.height*((100-this.porcentaje_logo_juego))/100)/this.num_botones*0;//0 es la posicion
		this.text1.setTextBounds(0, this.button_online.y+40, this.game.world.width,100);
 
		this.scaleSprite(this.button_offline, this.world.width, this.world.height / 3, 50, multiplicador_escala);
		this.button_offline.x = this.world.centerX- this.button_offline.width / 2;
		this.button_offline.y = (this.world.height*this.porcentaje_logo_juego/100) + (this.world.height*((100-this.porcentaje_logo_juego))/100)/this.num_botones*1;//1 es la posicion
		this.text2.setTextBounds(0, this.button_offline.y+40, this.game.world.width,100);
 
		this.scaleSprite(this.button_ajustes, this.world.width, this.world.height / 3, 50, multiplicador_escala);
		this.button_ajustes.x = this.world.centerX- this.button_ajustes.width / 2;
		this.button_ajustes.y = (this.world.height*this.porcentaje_logo_juego/100) + (this.world.height*((100-this.porcentaje_logo_juego))/100)/this.num_botones*2;//2 es la posicion
		this.text3.setTextBounds(0, this.button_ajustes.y+40, this.game.world.width,100);
		
		this.scaleSprite(this.button_tutorial, this.world.width, this.world.height / 3, 50, multiplicador_escala);
		this.button_tutorial.x = this.world.centerX - this.button_tutorial.width / 2;
		this.button_tutorial.y = (this.world.height*this.porcentaje_logo_juego/100) + (this.world.height*((100-this.porcentaje_logo_juego))/100)/this.num_botones*3;//3 es la posicion
		this.text4.setTextBounds(0, this.button_tutorial.y+40, this.game.world.width,100);
	},
	
	render:function() {
		//this.game.debug.text(this.telon.y ,40,50,"white");
		this.game.debug.text(this.game.idJugador ,40,50,"white");
	
	},
};

