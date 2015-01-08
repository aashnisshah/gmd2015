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
	updateBallPosition();
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

function updateBallPosition() {
	balls.forEach(function(ball) {
		if(ball.posY >= 134) {
			console.log('round over');
		} else {
			ball.posY = ball.posY + ball.speed;
		}
	})
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