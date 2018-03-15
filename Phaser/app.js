var game = new Phaser.Game(800,600,Phaser.AUTO,'', {preload:preload,create:create,update:update})
var score = 0 ;
var life = 3 ;
 
 function
  preload (){ 
  	game.load.image("sky","assets/sky.png")
  	game.load.image("ground","assets/platform.png")
  	game.load.image("star","assets/star.png")
  	game.load.spritesheet("dude","assets/dude.png",32,48);
  	game.load.spritesheet("enemy1","assets/enemy1.png",32,32);

 }

 function create (){
 	game.physics.startSystem(Phaser.Physics.ARCADE);

 	game.add.sprite(0,0,"sky")

 	platforms = game.add.physicsGroup()
 	platforms.enableBody = true ;

 	var ground = platforms.create(0,550,"ground")
 	ground.scale.setTo(2,2);
 	ground.body.imovable = true;


 	var ledge =  platforms.create(-100,250,"ground")
 	ledge.body.imovable = true;
 	 ledge =  platforms.create(400,400,"ground")
 	ledge.body.imovable = true;

 style =  {font:"bold 32px Arial",fill: "#fff"  };

 	 scorelabel = game.add.text(300,560,"score:",style )          
 		scoretext = game.add.text(420,560,score,style)

 		lifelabel = game.add.text(10,5,"life:",style);         
 		lifetext = game.add.text(120,5,life,style);

 		 player =game.add.sprite(20,400,"dude");
 		player.animation.add("left",[0,1,2,3],10,true)
 		player.animation.add("right",[4,5,6,7],10,true)
 		game.physics.arcade.enable(player);
 		player.body.bounce.y = 0.2;
 		player.body.gravity.y = 300;
player.body.collideWorldBounds = true;

 		 enemy1 = game.add.sprite(760,20,"enemy1")
 		enemy1.animations.add("left",[0,1],10,true)
 		enemy1.animations.add("right",[2,3],10,true)
 		enemy1.body.bounce.y = 0.2;
 		enemy1.body.gravity.y = 500; 
 		enemy1.body.collideWorldBounds = true;

 		 stars = game.add.physicsGroup();
 		stars.enableBody = true;

 		for(var i = 0; i < 12; i++){
 			var star = stars.create(i * 70,0,"star")
 			star.body.gravity.y = 200;
 			star.body.bounce = 0.7 + Math.random * 0.2;
 		}



cursors = game.input.keyboard.createCursorKeys();




 }

 function update (){
 	game.physics.arcade.collide(player,stars);
 	game.physics.arcade.collide(enemy1,platforms);
 	game.physics.arcade.collide(player,platforms);

 	player.body.velocity.x = 0;

 	if (cursors.left.isDown){
 		player.animations.play('left')
 		player.body.velocity.x = -150
}

else if   (cursors.right.isDown){
 		player.animations.play('right')
 		player.body.velocity.x = 150
}

else{
	player.animations.stop();
	player.frame = 4;
} 

if  (cursors.up.isDown && player.body.touching.down){
 	
 		player.body.velocity.y = -300;
}
game.physics.arcade.overlap(player,stars, collectStar);
game.physics.arcade.overlap(player,baddie, loseLife);

moveBaddie();

if (lives <= 0){
	endGame();
}
}
function endGame(){
	player.kill()
	scorelabel.text = "your dead your score is" + score;
	scoretext.visible = false;
	lifelabel.visible = false;
	lifetext.visible = false;
}


function moveBaddie(){
	if(baddie.x > 759){
		baddie.animations.play("left");
		baddie.body.velocity.x = -120;
	}
	else if (baddie.x <405){
baddie.animations.play("right");
baddie.body.velocity.x = 120;
	}
}

	function collectStar(player,star){
		score +=1;
		star.kill();

		scoretext.setText(score);
		star.reset(Math.random()*750,0)


	}
function loseLife(player,baddie){
			lives -=1
			lifetext.setText(lives);

			baddie.kill()
			baddie.reset(10,20);

		}
