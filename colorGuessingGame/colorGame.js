var numSquares  = 6;
var pickedColor;
var colors = [];

var	squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.getElementById("message");
var h1 = document.querySelector("h1");
var reset = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {

	for (var i = 0; i < modeButtons.length; i++) {
 	modeButtons[i].addEventListener("click", function(){
 		modeButtons[0].classList.remove("selected");
 		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
		resetNow();
 		});
	}

	reset.addEventListener("click", resetNow);

	colorDisplay.textContent = pickedColor;//change the picked color 

	for(var i = 0; i< squares.length; i++){
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor){
				message.textContent = "Correct";
				changeColors(clickedColor);	
				reset.textContent = "Play Again";
			}
			else{
				this.style.backgroundColor = "#232323"
				message.textContent = "Try Again";
			}//check if the clicked is correct
		});
	}//add event listner for every single square
	
	resetNow();
}

function resetNow() {

	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i< squares.length; i++){
		if (colors[i]) {
				squares[i].style.backgroundColor = colors[i];
				squares[i].style.display = "block";
		}
		else{
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
	message.textContent = "";
}

function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
			 squares[i].style.backgroundColor = color;
			}
			h1.style.backgroundColor = color;
}

function 	pickColor() {
	return colors[Math.floor(Math.random()*colors.length)];
}

function	generateRandomColors(num){

	var colors = [];
	for (var i = 0; i < num; i++) {
		colors.push(randomColor	());
	}

	return colors;
}

function	randomColor(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return	"rgb("+r+", " + g + ", " + b + ")";
}