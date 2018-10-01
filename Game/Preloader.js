Game.Preloader = function(game){
	this.preloadBar=null;
};

Game.Preloader.prototype={
	preload:function(){
	
		//Images
		this.load.spritesheet('button', 'assets/sprites/block.png', 193, 71);
		this.load.image("background", 'assets/background.png');
		this.load.image("landscape", 'assets/landscape.png');
				
		//Video
		this.load.video('video', 'assets/video/video.mp4');
		
		
		this.preloadBar=this.add.sprite(this.world.centerX,this.world.centerY,'preloadBar');
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.time.advancedTiming = true;
		
		this.load.setPreloadSprite(this.preloadBar);

	
	},
	create:function(){
		this.state.start('MainMenu');
	}
};