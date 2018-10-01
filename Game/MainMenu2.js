Game.MainMenu = function(game){
	this.button_inicio = null;
	this.button_ajustes = null;
	this.button_tutorial = null;
};


Game.MainMenu.prototype ={

	
	create:function(){
		
        this.background = this.add.image(0, 0, "background");
        this.background.height = this.game.height;
        this.background.width = this.game.width;		
		
		this.stage.backgroundColor = '#3A5963';
		
		this.button_inicio = this.add.button(this.world.centerX, 200, 'button', this.click_button, this, 2, 1, 0);
		this.button_inicio.stage='Battle';
		this.button_ajustes = this.add.button(this.world.centerX, 300, 'button', this.click_button, this, 2, 1, 0);
		this.button_ajustes.stage='Settings';
		this.button_tutorial = this.add.button(this.world.centerX, 400, 'button', this.click_button, this, 2, 1, 0);
		this.button_tutorial.stage='Tutorial';
	},
	
	update:function(){
		
	},

	click_button:function(button){
		this.state.start(button.stage);
	},

	getSpriteScale: function (spriteWidth, spriteHeight, availableSpaceWidth, availableSpaceHeight, minPadding) {
		var ratio = 1;
		var currentDevicePixelRatio = window.devicePixelRatio;
		// Sprite needs to fit in either width or height
		var widthRatio = (spriteWidth * currentDevicePixelRatio + 2 * minPadding) / availableSpaceWidth;
		var heightRatio = (spriteHeight * currentDevicePixelRatio + 2 * minPadding) / availableSpaceHeight;
		if(widthRatio > 1 || heightRatio > 1){
			ratio = 1 / Math.max(widthRatio, heightRatio);
		} 
		return ratio * currentDevicePixelRatio;
	},
	scaleSprite: function (sprite, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier) {
		var scale = this.getSpriteScale(sprite.width, sprite.height, availableSpaceWidth, availableSpaceHeight, padding);
		sprite.scale.x = scale * scaleMultiplier;
		sprite.scale.y = scale * scaleMultiplier;
	},	

	resize: function (width, height) {
		this.background.height = height;
		this.background.width = width;
 
		this.scaleSprite(this.button_inicio, width, height / 3, 50, 1);
		this.button_inicio.x = this.world.centerX;
		this.button_inicio.y = this.world.centerY ;
 
		this.scaleSprite(this.button_ajustes, width, height / 3, 50, 1);
		this.button_ajustes.x = this.world.centerX;
		this.button_ajustes.y = this.world.centerY - height / 3;
		
		this.scaleSprite(this.button_tutorial, width, height / 3, 50, 0.5);
		this.button_tutorial.x = this.world.centerX - this.button_tutorial.width / 2;
		this.button_tutorial.y = this.world.centerY + height / 3;
	},

	
	render:function() {
		this.game.debug.text(this.game.height  + '---' + this.game.width, 32, 32, "black");
	}	
};