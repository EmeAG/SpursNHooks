var Game ={};

Game.Boot = function(game){
	
};


Game.Boot.prototype = {
	init:function(){
		this.input.maxpointer=1;
		this.stage.disableVisibilityChange = true;
		//resize
		this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	},
	
	preload:function(){
		//this.load.image('preloader','assets/preloader.png');
		this.load.image('preloader','assets/sprites/block.png');
		this.load.image('preloader','assets/fondo.png');
		
	},
	
	create:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.state.start('Preloader');
	}
};