var game = new Phaser.Game (800, 600, Phaser.AUTO, '',
{preload:preload, create:create, update:update});

var life = 3;
var score = 0;

function preload(){
	game.load.image("sky", "assets/sky.png");
	game.load.image("ground", "assets/platform.png");
	game.load.image("star", "assets/star.png");
	game.load.spritesheet("dude", "assets/dude.png", 32, 48);
	game.load.spritesheet("enemey1", "assets/baddie.png", 32, 32);
}

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//Create the sky
	game.add.sprite(0, 0, "sky");

	//Create a group of platform
	platforms = game.add.physicsGroup();
	platforms.enableBody = true;

	//Create the ground
	var ground = platforms.create(0, 550, "ground");
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;

	//create the ledge
	var ledge = platforms.create(-100, 250, "ground");
	ledge.body.immovable = true;
	ledge = platforms.create(400, 400, "ground");
	ledge.body.immovable = true;

	//set text style
	style = {font:"bold 32px Arial", fill:"#fff"};

	//adding the score
	scorelabel = game.add.text(300, 560, "Score: ", style);
	scoretext = game.add.text(420, 560, score, style);

	//add the lives
	lifelabel = game.add.text(10, 5, "life: ", style);
	lifetext = game.add.text(120, 5, life, style);

	//add the dude
	player = game.add.sprite(20, 400,"dude");

	player.animations.add("left", [0, 1 ,2 ,3], 10, true);
	player.animations.add("right", [5, 6 ,7 ,8], 10, true);
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

	//add the enemey1
	enemey1 = game.add.sprite(760, 20,"enemey1");

	enemey1.animations.add("left", [0, 1], 10, true);
	enemey1.animations.add("right", [2, 3], 10, true);
	game.physics.arcade.enable(enemey1);
	enemey1.body.bounce.y = 0.2;
	enemey1.body.gravity.y = 500;
	enemey1.body.collideWorldBounds = true;

	//add the stars
	stars = game.add.physicsGroup();
	stars.enableBody = true;

	for (var i = 0; i < 12; i++){
		var star = stars.create(i * 70, 0, "star");
		star.body.gravity.y = 200;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}

	//create keyboard entries
	cursors = game.input.keyboard.createCursorKeys();

	enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	

}

function update(){

	game.physics.arcade.collide(platforms, stars);
	game.physics.arcade.collide(enemey1, platforms);
	game.physics.arcade.collide(player, platforms);

	player.body.velocity.x = 0;

	if (cursors.left.isDown){
		player.animations.play('left');
		player.body.velocity.x = -150;
	} else if (cursors.right.isDown){
		player.animations.play('right');
		player.body.velocity.x = 150;
	} else {
		player.animations.stop();
		player.frame = 4;
	}

	if (cursors.up.isDown && player.body.touching.down){
		player.body.velocity.y = -300;
	}

	game.physics.arcade.overlap(player,stars, collectStar);
	game.physics.arcade.overlap(player, enemey1, loseLife);

	moveenemey1();

	if (life <= 0){
		endGame();
	}
}

function endGame(){
	player.kill();
	scorelabel.text = "Game Over! Your score is : " + score;
	scoretext.visible = false;
	lifelabel.visible = false;
	lifetext.visible = false;
	enterKey.onDown.addOnce(restartGame);
}

function moveenemey1(){
	if (enemey1.x > 759){
		enemey1.animations.play("left");
		enemey1.body.velocity.x = -120;
	} else if (enemey1.x < 405){
		enemey1.animations.play("right");
		enemey1.body.velocity.x = 120;
	}

}

function collectStar(player,star){
	score +=1;
	star.kill();

	scoretext.setText(score);
	star.reset(Math.random()*750, 0);
}

function loseLife(player, enemey1){
	life -=1;
	lifetext.setText(life);

	enemey1.kill();
	enemey1.reset(10,20);
}

function restartGame(){
	stars.callAll("kill")
	player.reset(32,400)
	score = 0
	life = 3
	lifetext.setText(life)
	scoretext.setText(score)
	scorelabel.visible = true;
	scoretext.visible = true;
	lifelabel.visible = true;
	lifetext.visible = true;
	for (var i = 0; i < 12; i++){
		var star = stars.create(i * 70, 0, "star");
		star.body.gravity.y = 200;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}
}
