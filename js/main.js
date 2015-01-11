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
var wallSpeed = 0.3;
var ballWidth = 18;
var ballHeight = 18;
var collision = false;
var stopped = false;
var NUMWALLS = 0;
var MAXWALLS = 4;
var WALLCOUNTER = 0;
var TOTALBALLS = 5;
var CURRENTBALL = 0;

/* character objects */


function draw() {
	if(!collision && !stopped) {
		resetScreen();
		drawBalls();
		drawWalls();
		updateBallPosition();
		updateWallPositions();
		ballHitWallCheck();
	}

	if(NUMWALLS < MAXWALLS) {
		if(WALLCOUNTER >= 130) {
			createWall();
			WALLCOUNTER = 0;
		} else {
			WALLCOUNTER = WALLCOUNTER + 1;
		}
	}
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

function ballHitWallCheck() {
	for (var wallSize = 0; wallSize < wall.length; wallSize++ ) {
		for(var sectionSize = 0; sectionSize < wall[wallSize].wall.length; sectionSize++) {
			if((wall[wallSize].wall[sectionSize].posX <= balls[CURRENTBALL].posX && wall[wallSize].wall[sectionSize].posX + ballWidth >= balls[CURRENTBALL].posX) &&
				(wall[wallSize].wall[sectionSize].posY <= balls[CURRENTBALL].posY && wall[wallSize].wall[sectionSize].posY + ballHeight >= balls[CURRENTBALL].posY)) {
				console.log('collision!');
				collision = true;
			}
		}
	}
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
	section.numActive = section.size;
	var startingY = getRandomNumber(15, height);

	for (var tileCount = 0; tileCount < section.size; tileCount++) {
		var tile = createNewWallTile(tileCount, section.leftOrRight, startingY);
		section.wall.push(tile);
	}
	wall.push(section);
	NUMWALLS = NUMWALLS + 1;
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
			if(wall[wallSize].wall[sectionSize].active) {
				if(wall[wallSize].leftOrRight === 'left' && wall[wallSize].wall[sectionSize].posX <= width) {
					wall[wallSize].wall[sectionSize].posX = wall[wallSize].wall[sectionSize].posX + wall[wallSize].speed;
				} else if (wall[wallSize].leftOrRight === 'right' && wall[wallSize].wall[sectionSize].posX > 0) {
					wall[wallSize].wall[sectionSize].posX = wall[wallSize].wall[sectionSize].posX - wall[wallSize].speed;
				} else {
					wall[wallSize].wall[sectionSize].img.src = blackImage;
					wall[wallSize].wall[sectionSize].active = false;
					wall[wallSize].numActive = wall[wallSize].numActive - 1;
					if(wall[wallSize].numActive === 0 ) {
						wall[wallSize].active = false;
						NUMWALLS = NUMWALLS - 1;
					}
				}
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
	tile.active = true;
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
		if(balls[CURRENTBALL].posY >= 134) {
			if(CURRENTBALL < TOTALBALLS - 1) {
				// CURRENTBALL passed, now to get the next ball
				createNewBall();
				CURRENTBALL = CURRENTBALL + 1;
			} else {
				// game over, you win!
				alert('you win!');
			}
		} else {
			balls[CURRENTBALL].posY = balls[CURRENTBALL].posY + balls[CURRENTBALL].speed;
		}
}

/* keyboard handler */
addEventListener("keydown", function (e) {
  // up = 38, down = 40
  if(e.keyCode == 38){
    balls[0].speed = balls[0].speed - 0.05;
  } else if(e.keyCode == 40){
    balls[0].speed = balls[0].speed + 0.05;
  } 

  if(balls[0].speed <= 0) {
  	stopped = true;
  }
}, false);

function setup() {
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	createNewBall();
	CURRENTBALL = 0;
	createWall();
}

setup();
var listener = setInterval(main, 1);

/* main function */
function main() {
	draw();
};