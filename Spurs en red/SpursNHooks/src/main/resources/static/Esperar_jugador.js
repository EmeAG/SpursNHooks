Game.Esperar_jugador = function(game){
};
idjugador=undefined;
idjugador1=undefined;
idjugador2=undefined;
idBatalla=undefined;
Game.Esperar_jugador.prototype ={
	create:function(){
		this.game.physics.p2.gravity.y = 0;
		this.musica=this.game.add.audio("menuMusic",0.09,true);
		this.musica.play();
        var style = {	font: "50px Ultra",
						fill: "Black",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
	    this.telon=this.game.add.sprite(-40,0,'telon');
	    this.telon=this.game.add.sprite(40,0,'CartelEspera');
		this.text1=this.game.add.text(90, (this.world.height/2)+250, "Esperando Jugador...",style);
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
				idjugador1=jugadores.id_J1;
				idjugador2=jugadores.id_J2;
				idBatalla=jugadores.id_batalla;
		});
		if (idjugador1!= undefined && idjugador2!= undefined){
			if(idjugador1==idjugador || idjugador2==idjugador){
				this.state.start("Battle_Online",true, false,idjugador,idjugador1,idjugador2,idBatalla);
			}
		}
	},

	render:function() {
		//this.game.debug.text(this.telon.y ,40,50,"white");
		this.game.debug.text(idjugador2 ,10,50,"white");
		this.game.debug.text(idjugador1 ,40,70,"white");
		this.game.debug.text(idjugador ,80,100,"white");
	
	},
};