var c = document.getElementById("canvas");
var ctx = c.getContext("2d");


 var Width = 600;
 var Height = 600;

 var x = 300;
 var y = 300;
 var size = 50;

 var speedX = 0;
 var speedY = 0;

 var itemX;
 var itemY;
 var itemSize = 50;

 var score = 0;
 var collision =false;


 function drawLeia(){
	var Leia = new Image();
	Leia.src = "Leia.png"
	ctx.drawImage(Leia,x,y,size,size);
} 

function drawVader(){
	var Vader = new Image();
	Vader.src = "DarthVader.png";
	ctx.drawImage(Vader,itemX,itemY,itemSize,itemSize);
} 


function clear(){
	ctx.clearRect(0,0,Width,Height);
}

function init(){
	itemX = Math.floor(Math.random()*(Width - itemSize));
	itemY = Math.floor(Math.random()*(Height - itemSize));

	window.onkeydown = keydownControl;
	return setInterval(draw,10);
}

	function keydownControl(e){
		if(e.keyCode == 37){
			speedX = -4;
			speedY = 0;
		}
			else if(e.keyCode == 38){
			speedX = 0;
			speedY = -4;
		}
	

	else if(e.keyCode == 39){
			speedX = 4;
			speedY = 0;
		}

		else if(e.keyCode == 40){
			speedX = 0;
			speedY = 4;
		}
}



function draw (){
	clear();
	drawLeia();
	drawVader();
	x += speedX;
	y += speedY;

	if(x+speedX < 0 || x+speedX > Width - size){
		speedX = -speedX }

		if(y+speedY < 0 || y+speedY > Height - size){
		speedY = - speedY
	}

	collisionCheck();
	collisionHandle();

}

function collisionCheck(){
	if( (x+size > itemX) && (x <itemX+itemSize) && 
	(y+size > itemY) && (y<itemY+itemSize)	) {
		collision = true;
	}
	else{
		collision = false;
	}
}

function collisionHandle(){
	if(collision){
		score += 1;
		document.getElementById("score").innerHTML = score;
		itemX = Math.floor(Math.random()*(Width - itemSize));
	itemY = Math.floor(Math.random()*(Height - itemSize));

	}
}

init();