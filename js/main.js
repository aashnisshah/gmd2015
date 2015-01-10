/* creating the context and canvas */
var context;
var canvas;

window.onload=function() {
};

/* game variables */
var count = 0;
var balls = [];
var wall = [];
var width = 275;
var height = 115;
var blackImage = "img/sprites/lvl01black.png";
var wallSpeed = 0.05;

/* character objects */


function draw() {
	resetScreen();
	drawBalls();
	drawWalls();
	updateBallPosition();
	updateWallPositions();
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
	var rand = getRandomNumber(10, width) + 10;

	ball.posX = rand;
	ball.posY = 0;
	ball.speed = 0.1;
	ball.img = new Image();
	ball.img.src = "img/sprites/lvl01mainChar.png";

	balls.push(ball);
}

function createWall() {
	var section = new Object();
	section.wall = [];
	section.size = getRandomNumber(1, 5);
	section.leftOrRight = (getRandomNumber(1, 10) % 2) === 0 ? 'left' : 'right';
	section.speed = wallSpeed
	var startingY = getRandomNumber(15, height);

	for (var tileCount = 0; tileCount < section.size; tileCount++) {
		var tile = createNewWallTile(tileCount, section.leftOrRight, startingY);
		section.wall.push(tile);
	}
	wall.push(section);
}

function drawWalls() {
	for (var wallSize = 0; wallSize < wall.length; wallSize++ ) {
		for(var sectionSize = 0; sectionSize < wall[wallSize].wall.length; sectionSize++) {
			context.drawImage(wall[wallSize].wall[sectionSize].img, wall[wallSize].wall[sectionSize].posX, wall[wallSize].wall[sectionSize].posY);		
		}
	}
}

function updateWallPositions() {
	for (var wallSize = 0; wallSize < wall.length; wallSize++ ) {
		for(var sectionSize = 0; sectionSize < wall[wallSize].wall.length; sectionSize++) {
			if(wall[wallSize].leftOrRight === 'left') {
				wall[wallSize].wall[sectionSize].posX = wall[wallSize].wall[sectionSize].posX + wall[wallSize].speed;
			} else {
				wall[wallSize].wall[sectionSize].posX = wall[wallSize].wall[sectionSize].posX - wall[wallSize].speed;
			}
		}
	}
}

function createNewWallTile(tileCount, leftOrRight, startingY) {
	var tile = new Object();
	var tileOffset = leftOrRight === 'left' ? ((tileCount * 22) * -1) : (tileCount * 22);
	tile.posX = leftOrRight === 'left' ? tileOffset : width + tileOffset;
	tile.posY = startingY;
	tile.count = tileCount;
	tile.img = new Image();
	tile.img.src = "img/sprites/lvl01wall.png";

	return tile;
}

function getRandomNumber(small, big) {
	small = small || 0;
	big = big || 0;
	return Math.floor(Math.random() * big) + small;
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
	createWall();
}

setup();
var listener = setInterval(main, 1);

/* main function */
function main() {
	draw();
};