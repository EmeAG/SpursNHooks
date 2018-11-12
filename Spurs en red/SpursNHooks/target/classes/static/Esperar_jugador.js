<<<<<<< HEAD
Game.MainMenu = function(game){
};

Game.MainMenu.prototype ={
=======
Game.Esperar_jugador = function(game){
};

Game.Esperar_jugador.prototype ={
>>>>>>> 21fe1902e851d5365b00ea6370d7638d9cc94d48

	
	
	create:function(){
		this.game.physics.p2.gravity.y = 0;
		this.musica=this.game.add.audio("menuMusic",0.09,true);
		this.musica.play();
<<<<<<< HEAD
        var style = {	font: "120px Ultra",
=======
        var style = {	font: "90px Ultra",
>>>>>>> 21fe1902e851d5365b00ea6370d7638d9cc94d48
						fill: "Black",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
<<<<<<< HEAD
	    this.telon=this.game.add.sprite(960,0,'telon');
		this.physics.p2.enable(this.telon);
		
		this.text1=this.game.add.text(0, 0, "Esperando Jugador...",style);
=======
	    this.telon=this.game.add.sprite(960,540,'telon');
		this.physics.p2.enable(this.telon);
		
		this.text1=this.game.add.text(10, this.world.height/2, "Esperando Jugador...",style);
>>>>>>> 21fe1902e851d5365b00ea6370d7638d9cc94d48
		this.text1.font = 'Ultra';
	},
	
	update:function(){
<<<<<<< HEAD
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
=======

>>>>>>> 21fe1902e851d5365b00ea6370d7638d9cc94d48
	},

	render:function() {
		//this.game.debug.text(this.telon.y ,40,50,"white");
		this.game.debug.text(IdJugador ,40,50,"white");
	
	},
};

