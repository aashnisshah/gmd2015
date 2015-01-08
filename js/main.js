/* creating the context and canvas */
var context;
var canvas;

window.onload=function() {
};

/* game variables */
var count = 0;
var balls = [];

/* character objects */


function draw() {

	resetScreen();
	drawBalls();
	// update position of ball to move it 'down' the screen
	balls[0].posY = balls[0].posY + balls[0].speed;
}

function resetScreen() {
	if(context) {
		context.fillStyle = "#000000";
		context.fillRect(0, 0, window.innerWidth, window.innerHeight);
	} else {
		console.log('no context');
	}
}

function drawBalls() {
	balls.forEach(function(ball) {
		context.drawImage(ball.img, ball.posX, ball.posY);
	})
}

function createNewBall() {
	var ball = new Object();
	var rand = Math.floor((Math.random() * 270) + 1) + 10;

	ball.posX = rand;
	ball.posY = 0;
	ball.speed = 0.1;
	ball.img = new Image();
	ball.img.src = "img/sprites/lvl01mainChar.png";

	balls.push(ball);
}

function setup() {
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	createNewBall();
}

setup();
var listener = setInterval(main, 1);

/* main function */
function main() {
	draw();
};