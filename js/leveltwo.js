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
var inputChar;
var guesses;
var blankImage;
var counter;
var speed;
var enterNumbersFlag;
var enteredCharacters;

function initializeGlobalVariables() {
	characterImg = "img/sprites/lvl02mainChar.png";
	patterns = [];
	charX = 117;
	charY = 100;
	squares = [];
	maxChar = 5;
	currentChar = 0;
	inputChar = 0;
	guesses = [];
	blankImage = "img/sprites/lvl01black.png";
	counter = 0;
	speed = 150;
	enterNumbersFlag = false;
	enteredCharacters = -1;
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
	if(currentChar >= 0) {
		if(counter === speed) {
			counter = 0;
			currentChar = currentChar < maxChar - 1 ? currentChar + 1 : -1;
		}
		counter = counter + 1;
	}
	// if(!enterNumbersFlag) {
		drawCharacter();
	// } else {
	// 	drawEnteredCharacters();
	// }
	// drawCharacter();
}

/*****************************************************
					Character
 *****************************************************/

 function createCharacter() {
 	for(var i = 0; i < maxChar; i++) {
	 	var newChar = new Image();
	 	newChar.src = characterImg;
	 	patterns.push(newChar);
 	}
 }

 function drawCharacter() {
 	if(currentChar >= 0) {
		context.drawImage(patterns[currentChar], squares[currentChar].x, squares[currentChar].y);
 	} else {
 		enterNumbers();
 		if(enteredCharacters > 0) {
	 		for(var i = 0; i < enteredCharacters; i++ ) {
	 			context.drawImage(patterns[i], squares[i].x, squares[i].y);
	 		}
	 	}
 	}
 }

 function drawEnteredCharacters() {
 	if(enteredCharacters.length > 0) {
 		// for(var i = 0; i < enteredCharacters.length; i++) {
 			console.log('draw things');
 			// debugger
 			context.drawImage(patterns[enteredCharacters[0]], squares[enteredCharacters[0]].x, squares[enteredCharacters[0]].y);
 		// }
 	}
 }

 function enterNumbers() {
 	enterNumbersFlag = true;
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
	console.log('keydown');
	if(enterNumbersFlag) {
	  if(e.keyCode == 13){
	  	if(guesses.length > 0) {
	  		console.log('guess');
	  		if (checkNumberIsRight()) {
	  			console.log('checknumb');
	  			if(inputChar < maxChar - 1) {
	  				console.log('input get next');
	  				console.log(enteredCharacters);
	  				// move on to next image
	  				// patterns[inputChar].src = blankImage;
	  				enteredCharacters = enteredCharacters + 1;
	  				inputChar = inputChar + 1;
	  			} else if(inputChar === maxChar - 1) {
	  				// you survived
	  			}
	  		} else {
	  			// you got the wrong number
	  		}
	  	}
	  	guesses = [];
	  } else if(e.keyCode == 48){
	  	guesses.push(0);
	  } else if(e.keyCode == 49){
	  	guesses.push('1');
	  } else if(e.keyCode == 50){
	  	guesses.push('2');
	  } else if(e.keyCode == 51){
	  	guesses.push('3');
	  } else if(e.keyCode == 52){
	  	guesses.push('4');
	  } else if(e.keyCode == 53){
	  	guesses.push('5');
	  } else if(e.keyCode == 54){
	  	guesses.push('6');
	  } else if(e.keyCode == 55){
	  	guesses.push('7');
	  } else if(e.keyCode == 56){
	  	guesses.push('8');
	  } else if(e.keyCode == 57){
	  	guesses.push('9');
	  } 
	}

}, false);

function checkNumberIsRight() {
	var number = '';
	for(var i = 0; i < guesses.length; i++) {
		number = number + '' + guesses[i];
	}
	return number == squares[inputChar].n;
}

/*****************************************************
					Setup
 *****************************************************/
function setup() {
	initializeGlobalVariables();
	createSquares(charX, charY);
	createCharacter();
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
  	resetScreen();
	draw();
};