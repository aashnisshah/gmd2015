/* creating the context and canvas */
var context;
var canvas;

window.onload=function() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
};

function setup() {
	console.log('setup steps');
}

setup();
var listener = setInterval(main, 1);

/* main function */
function main() {
	console.log('loop');
};