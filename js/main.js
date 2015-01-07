/* creating the context and canvas */
var context;
var canvas;

window.onload=function() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
};

/* game variables */
var count = 0;
var rand = Math.floor((Math.random() * 270) + 1) + 10;
console.log(rand);

/* character objects */
var ball = new Object();

ball.posX = rand;
ball.posY = 0;
ball.speed = 5;
ball.img = new Image();
ball.img.src = "img/sprites/lvl01mainChar.png";

function draw() {
	context.drawImage(ball.img, ball.posX, ball.posY);
	console.log('drawn at: ' + ball.posX + ' ' + ball.posY);
}

function setup() {
	// console.log('setup steps');
}

setup();
var listener = setInterval(main, 1);

/* main function */
function main() {
	// console.log('loop');
	draw();
};