var Game ={
};


Game.Boot = function(game){
};


Game.Boot.prototype = {
	
	init:function(){
		this.aux;
		this.input.maxpointer=1;
		this.stage.disableVisibilityChange = true;
		//resize
		this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	},
	
	preload:function(){
		this.load.image('preloader_fondo','assets/Backgrounds/FondoPreload.png');
		this.load.image('preloader_bar','assets/Backgrounds/BarraCarga.png');
	},
	
	create:function(){
		//this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.p2.setImpactEvents(true);
<<<<<<< HEAD

=======
		/*$.ajax({
			url:"http://127.0.0.1:8080/nuevo_jugador",
			}).done(function(dato) {
				alert(dato)
				this.aux=dato;
			})
			alert(this.aux)
		this.global={
			IdJugador:this.aux
		}*/
>>>>>>> 21fe1902e851d5365b00ea6370d7638d9cc94d48
		this.state.start('Preloader');
	}
};