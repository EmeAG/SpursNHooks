Game.Esperar_jugador = function(game){
};

Game.Esperar_jugador.prototype ={

	
	
	create:function(){
		this.game.physics.p2.gravity.y = 0;
		this.musica=this.game.add.audio("menuMusic",0.09,true);
		this.musica.play();
        var style = {	font: "90px Ultra",
						fill: "Black",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
	    this.telon=this.game.add.sprite(0,-40,'telon');
		
		this.text1=this.game.add.text(10, this.world.height/2, "Esperando Jugador...",style);
		this.text1.font = 'Ultra';
		$.ajax({
			method: "POST",
			url:"/jugador_lista_espera",
			data: JSON.stringify({identificador:1}),
			processData: false,
			headers: {
			"Content-type":"application/json"
			}
		});
	},
	
	update:function(){

	},

	render:function() {
		//this.game.debug.text(this.telon.y ,40,50,"white");
		this.game.debug.text(IdJugador ,40,50,"white");
	
	},
};

