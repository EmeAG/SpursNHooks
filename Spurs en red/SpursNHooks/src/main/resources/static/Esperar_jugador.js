Game.Esperar_jugador = function(game){
};
nueva_partida=undefined;
idjugador=undefined;
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
	    this.telon=this.game.add.sprite(-40,0,'telon');
		
		this.text1=this.game.add.text(10, this.world.height/2, "Esperando Jugador...",style);
		this.text1.font = 'Ultra';
		$.ajax({
			url:"/nuevo_jugador",
			}).done(function(dato) {
				idjugador=dato;
		});
	},
	
	update:function(){
		$.ajax({
			url:"/comprobar_lista",
			}).done(function(jugadores) {
				nueva_partida=jugadores;
				
		});
		if (nueva_partida!= undefined){
			cadena= nueva_partida.split("|");
			for (var i = 0; i < cadena.length; i++) {
				if(cadena[i]==idjugador){
					this.state.start("Battle_Online");
				}
			}
		}
	},

	render:function() {
		//this.game.debug.text(this.telon.y ,40,50,"white");
		this.game.debug.text(nueva_partida ,40,50,"white");
		this.game.debug.text(idjugador ,80,100,"white");
	
	},
};

