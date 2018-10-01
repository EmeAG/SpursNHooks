Game.Tutorial = function(game){
	this.button_back_menu = null;
	this.video_tutorial = null;
	
};


Game.Tutorial.prototype ={
	create:function(){
		//fondo
		this.stage.backgroundColor = '#38E067';
		
		//botones
		this.button_back_menu = this.add.button(this.world.width -120, this.world.height -120, 'button', this.click_button, this, 2, 1, 0);
		this.button_back_menu.stage='MainMenu';
		
		//video
		this.video_tutorial = this.add.video('video');
		this.video_tutorial.play(true);
		this.video_tutorial.addToWorld(800, 600, 1.15, 1.3);
		
	},
	
	update: function(){
		
	},
	
	click_button:function(button){
		this.video_tutorial.stop(true);
		this.state.start(button.stage);
		
	}
	
};