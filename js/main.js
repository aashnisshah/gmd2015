/* creating the context and canvas */
var context;
var canvas;

window.onload=function() {
};

/*****************************************************
					Global Variables
 *****************************************************/
var count;
var balls;
var wall;
var width;
var height;
var blackImage;
var wallSpeed;
var ballWidth;
var ballHeight;
var wallHeight;
var wallWidth;
var tryagainX;
var tryagainY;
var collision;
var stopped;
var completed;
var NUMWALLS;
var MAXWALLS;
var WALLCOUNTERLIMIT;
var WALLCOUNTER;
var TOTALBALLS;
var CURRENTBALL;

function initializeGlobalVariables() {
	count = 0;
	balls = [];
	wall = [];
	width = 800;
	height = 600;
	blackImage = "img/sprites/lvl01black.png";
	wallSpeed = 0.3;
	ballWidth = 45;
	ballHeight = 45;
	wallHeight = 40;
	wallWidth = 45;
	messageX = 350;
	messageY = 200;
	collision = false;
	stopped = false;
	completed = false;
	NUMWALLS = 0;
	MAXWALLS = 1;
	WALLCOUNTERLIMIT = 300;
	WALLCOUNTER = 0;
	TOTALBALLS = 1;
	CURRENTBALL = 0;
}

/*****************************************************
						Draw
 *****************************************************/
function draw() {
	if(!collision && !stopped) {
		resetScreen();
		drawBalls();
		drawWalls();
		updateBallPosition();
		updateWallPositions();
	
		if(NUMWALLS < MAXWALLS) {
			if(WALLCOUNTER >= WALLCOUNTERLIMIT) {
				createWall();
				WALLCOUNTER = 0;
			} else {
				WALLCOUNTER = WALLCOUNTER + 1;
			}
		}
	} else {
		tryagain();
	}
}

/*****************************************************
					 Balls 
 *****************************************************/
function drawBalls() {
	balls.forEach(function(ball) {
		context.drawImage(ball.img, ball.posX, ball.posY);
	})
}

function ballHitWallCheck(section, ball) {
	if( ( (section.posX <= ball.posX && section.posX + wallWidth >= ball.posX) || 
		  (section.posX - ballWidth <= ball.posX && section.posX - ballWidth + wallWidth >= ball.posX ) ) &&
		(section.posY <= ball.posY + ballHeight && section.posY + wallWidth >= ball.posY + ballHeight) ) {
		console.log('collision');
		collision = true;
	}
}

function createNewBall() {
	var ball = new Object();
	var rand = getRandomNumber(10, width - ballWidth) + 10;

	ball.posX = rand;
	ball.posY = 0;
	ball.speed = 0.1;
	ball.img = new Image();
	ball.img.src = "img/sprites/lvl01mainChar.png";

	balls.push(ball);
}

function updateBallPosition() {
	if(balls[CURRENTBALL].posY >= height - ballHeight) {
		if(CURRENTBALL < TOTALBALLS - 1) {
			createNewBall();
			CURRENTBALL = CURRENTBALL + 1;
		} else {
			completed = true;
			roundComplete();
		}
	} else {
		balls[CURRENTBALL].posY = balls[CURRENTBALL].posY + balls[CURRENTBALL].speed;
	}
}

/*****************************************************
					Walls 
 *****************************************************/
function createWall() {
	var section = new Object();
	section.wall = [];
	section.size = getRandomNumber(1, 5);
	section.leftOrRight = (getRandomNumber(1, 10) % 2) === 0 ? 'left' : 'right';
	section.speed = wallSpeed
	section.numActive = section.size;
	var startingY = getRandomNumber(15, height - wallHeight - (1.5 * ballHeight));

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
				ballHitWallCheck(wall[wallSize].wall[sectionSize], balls[CURRENTBALL]);
			}
		}
	}
}

function createNewWallTile(tileCount, leftOrRight, startingY) {
	var tile = new Object();
	var tileOffset = leftOrRight === 'left' ? ((tileCount * wallWidth) * -1) : (tileCount * wallWidth);
	tile.posX = leftOrRight === 'left' ? tileOffset : width + tileOffset;
	tile.posY = startingY;
	tile.count = tileCount;
	tile.active = true;
	tile.img = new Image();
	tile.img.src = "img/sprites/lvl01wall.png";

	return tile;
}

/*****************************************************
					Helper Functions
 *****************************************************/
function getRandomNumber(small, big) {
	small = small || 0;
	big = big || 0;
	return Math.floor(Math.random() * big) + small;
}

/*****************************************************
					Event Listeners 
 *****************************************************/
addEventListener("keydown", function (e) {
  // up = 38, down = 40
  if(e.keyCode == 38){
    balls[CURRENTBALL].speed = balls[CURRENTBALL].speed - 0.05;
  } else if(e.keyCode == 40){
    balls[CURRENTBALL].speed = balls[CURRENTBALL].speed + 0.05;
  } 

  if(balls[CURRENTBALL].speed <= 0) {
  	stopped = true;
  }
}, false);

addEventListener('click', function(click) {
	if(click.x >= messageX && click.x <= messageX + 800 && 
		click.y >= messageY && click.y <= messageY + 200 &&
		(stopped || collision || completed)) {
		if(stopped || collision) {
			setup();
		}
		if(completed) {
			alert('completed');
		}
	}
}, false);

/*****************************************************
					Setup
 *****************************************************/
function setup() {
	initializeGlobalVariables();
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
    canvasW = canvas.width;
    canvasH = canvas.height;
    width = canvasW;
    height = canvasH;

    var background = new Image();
	background.src = "img/sprites/lvl01background.png";
    context.drawImage(background,0,0);   

	createNewBall();
	CURRENTBALL = 0;
	createWall();
}

function tryagain() {
	var tryagainImage = new Image();
	tryagainImage.src = "img/sprites/lvl01tryagain.png";
    context.drawImage(tryagainImage, messageX, messageY); 
}

function roundComplete() {
	var completedImage = new Image();
	completedImage.src = "img/sprites/lvl01continue.png";
    context.drawImage(completedImage, messageX, messageY); 
}

function resetScreen() {
	if(context) {
		context.fillRect(0, 0, width, height);

	    var background = new Image();
		background.src = "img/sprites/lvl01background.png";
	    context.drawImage(background, 0, 0, width, height);
	} else {
		console.log('no context');
	}
}

/*****************************************************
					Initial Calls 
 *****************************************************/
setup();
var listener = setInterval(main, 1);

/* main function */
function main() {
	draw();
};