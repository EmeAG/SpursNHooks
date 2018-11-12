Game.MainMenu = function(game){
};

Game.MainMenu.prototype ={

	
	
	create:function(){
		this.game.physics.p2.gravity.y = 0;
		this.musica=this.game.add.audio("menuMusic",0.09,true);
		this.musica.play();
        var style = {	font: "120px Ultra",
						fill: "Black",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
	    this.telon=this.game.add.sprite(960,0,'telon');
		this.physics.p2.enable(this.telon);
		
		this.text1=this.game.add.text(0, 0, "Esperando Jugador...",style);
		this.text1.font = 'Ultra';
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

	render:function() {
		//this.game.debug.text(this.telon.y ,40,50,"white");
		this.game.debug.text(IdJugador ,40,50,"white");
	
	},
};

