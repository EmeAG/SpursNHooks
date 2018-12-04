Game.Esperar_jugador = function(game){
};
idjugador=undefined;
idjugador1=undefined;
idjugador2=undefined;
idBatalla=undefined;

var connection = new WebSocket('ws://127.0.0.1:8080/echo');

debug = {
		connection: 1
	}

connection.onmessage = function (message) {
	
    if (debug.connection) {
        console.log('[DEBUG-WS] Se ha recibido un mensaje: ' + message.data)
    }

    var msg = JSON.parse(message.data)

    console.log('INFO RECIBIDA ' + msg.type)

    switch (msg.type) {
        case "ConexionCreada":
            console.log('@@@@@@ PLAYER CREATED @@@@@')
            console.log('id: ' + msg.id)
            idjugador=msg.id;
           /* console.log('pos: (' + msg.player.x + ',' + msg.player.y + ')')
            console.log('score: ' + msg.player.score)*/
            break
            
        case "Batalla":
        	console.log('##### Batalla #####')
        	console.log('idjugador1: ' + msg.id_J1)
        	console.log('idjugador2: ' + msg.id_J2)
        	console.log('idBatalla: ' + msg.id_batalla)
        	idjugador1=msg.id_J1;
        	idjugador2=msg.id_J2;
        	idBatalla=msg.id_batalla;       
            break
        case "UPDATE_STATE":
            console.log('!!!!! GAME SENDS UPDATE !!!!!')
            break
    }
}

Game.Esperar_jugador.prototype ={
	create:function(){
		this.game.physics.p2.gravity.y = 0;
		this.musica=this.game.add.audio("menuMusic",0.09,true);
		this.musica.play();
        var style = {	font: "55px Ultra",
						fill: "Black",
						boundsAlignH: "center",
						boundsAlignV: "middle",
					};
	    this.telon=this.game.add.sprite(-40,0,'telon');
	    this.cartelEsp=this.game.add.sprite(40,0,'CartelEspera');
		this.text1=this.game.add.text(90, (this.world.height/2)+60, "Esperando Jugador...",style);
		this.text1.font = 'Ultra';
		
		/*Conexion servidor local*/
			connection.onerror = function(e) {
				console.log("WS error: " + e);
			}
			connection.onmessage = function(msg) {
				console.log("WS message: " + msg.data);
			}
			connection.onclose = function() {
				console.log("Closing socket");
			}
		/*Conexion servidor local*/		
		/*$.ajax({
			url:"/nuevo_jugador",
			}).done(function(dato) {
				idjugador=dato;
		});*/
	},
	
	update:function(){
		
		/*$.ajax({
			url:"/comprobar_lista",
			}).done(function(jugadores) {
				idjugador1=jugadores.id_J1;
				idjugador2=jugadores.id_J2;
				idBatalla=jugadores.id_batalla;
		});*/

	    data = {
	            type: 'EsperarJugador'
	        }
	    connection.send(JSON.stringify(data))
		
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