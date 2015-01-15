/* creating the context and canvas */
var context;
var canvas;

window.onload=function() {
};

/*****************************************************
					Global Variables
 *****************************************************/
var characterImg;
var patterns;

function initializeGlobalVariables() {
	characterImg = "img/sprites/lvl02mainChar.png";
	patterns = [];
}

/*****************************************************
						Draw
 *****************************************************/
function draw() {
	createCharacter();
	drawCharacter();
}

/*****************************************************
					Character
 *****************************************************/

 function createCharacter() {
 	var newChar = new Image();
 	newChar.src = characterImg;

 	patterns.push(newChar);
 }

 function drawCharacter() {
 	for(var i = 0; i < patterns.length; i++) {
		context.drawImage(patterns[0], 50, 50);	
 	}
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
    width = canvas.width;
    height = canvas.height;

    var background = new Image();
	background.src = "img/sprites/lvl02background.png";
    context.drawImage(background,0,0);   
}

function resetScreen() {
	if(context) {
		context.fillRect(0, 0, width, height);

	    var background = new Image();
		background.src = "img/sprites/lvl02background.png";
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