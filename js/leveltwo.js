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
var charX;
var charY;
var squares;
var maxChar;
var currentChar;
var guesses;

function initializeGlobalVariables() {
	characterImg = "img/sprites/lvl02mainChar.png";
	patterns = [];
	charX = 117;
	charY = 100;
	squares = [];
	maxChar = 1;
	currentChar = 0;
	guesses = [];
}

function createSquares() {
	for (var i = 0; i < maxChar; i++) {
		var randomX = getRandomNumber(0,4);
		var randomY = getRandomNumber(0,2);
		var coX = charX + (272 * randomX);
		var coY = charY + (156 * randomY);
		var cordinates = {
			x: coX,
			y: coY,
			n: (5 * randomY) + randomX + 1
		};
		squares.push(cordinates);
	}
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
 	// for(var i = 0; i < squares.length; i++) {
		context.drawImage(patterns[currentChar], squares[currentChar].x, squares[currentChar].y);
		// debugger	
 	// }
 }

/*****************************************************
					Helper Functions
 *****************************************************/
function getRandomNumber(small, big) {
	small = small || 0;
	big = big || 0;
	var ranNum = Math.floor(Math.random() * (big - small + 1)) + small;
	return ranNum;
}

/*****************************************************
					Event Listeners 
 *****************************************************/
addEventListener("keydown", function (e) {
  // up = 38, down = 40
  if(e.keyCode == 13){
  	console.log('enter');
  	if(guesses.length > 0) {
  		if (checkNumberIsRight()) {
  			if(currentChar < maxChar - 1) {
  				console.log('next character');
  			} else if(currentChar === maxChar - 1) {
  				console.log('game over');
  			}
  		}
  	}
  	guesses = [];
  } else if(e.keyCode == 48){
  	console.log('0');
  	guesses.push(0);
  } else if(e.keyCode == 49){
  	console.log('1');
  	guesses.push('1');
  } else if(e.keyCode == 50){
  	console.log('2');
  	guesses.push('2');
  } else if(e.keyCode == 51){
  	console.log('3');
  	guesses.push('3');
  } else if(e.keyCode == 52){
  	console.log('4');
  	guesses.push('4');
  } else if(e.keyCode == 53){
  	console.log('5');
  	guesses.push('5');
  } else if(e.keyCode == 54){
  	console.log('6');
  	guesses.push('6');
  } else if(e.keyCode == 55){
  	console.log('7');
  	guesses.push('7');
  } else if(e.keyCode == 56){
  	console.log('8');
  	guesses.push('8');
  } else if(e.keyCode == 57){
  	console.log('9');
  	guesses.push('9');
  } 

}, false);

function checkNumberIsRight() {
	var number = '';
	for(var i = 0; i < guesses.length; i++) {
		number = number + '' + guesses[i];
	}
	console.log(number + ' === ' + squares[currentChar].n);
	return number == squares[currentChar].n;
}

/*****************************************************
					Setup
 *****************************************************/
function setup() {
	initializeGlobalVariables();
	createSquares(charX, charY);
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