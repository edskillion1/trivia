$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 11) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What team played the Chargers in the Freezer Bowl?", "What team went to the Super Bowl 4 times and never won?", "What team went undefeated and won the Super Bowl?", "What team did Joe Namath lead to victory in the Super Bowl?", "What team is the home of the Dawg Pound?", "What team was once known as Americas Team?", "What team won the Super Bowl for the 2017-18 NFL season?", "What team had no wins in 2017?", "What team was known as the League of Boom?", "What team did Marshal Faulk get drafted by originally?", "What team used to play in San Diego?", "Which team drafted Philip Rivers originally?"];
var answerArray = [["Dolphins", "Colts", "Bengals", "Bills"], ["Seahawks", "Colts", "Bills", "Dolphins"], ["Cowboys", "Dolphins", "Eagles", "Rams"], ["Jets", "Giants", "Steelers", "Raiders"], ["Dolphins", "Bills", "Browns", "Seahawks"], ["Cardinals","Bills","Cowboys","Bengals"], ["Seahawks", "Eagles", "Panthers", "Patriots"], ["Redskins","Cardinals","Lions","Browns"], ["Raiders", "Steelers", "Seahawks", "Falcons"], ["Rams", "Giants", "Colts", "Titans"], ["Chargers", "Jets", "Rams", "Saints"], ["Panthers", "Giants", "Chargers", "Ravens"]];
var imageArray = ["<img class='center-block img-right' src='img/bengals.png'>", "<img class='center-block img-right' src='img/bills.png'>", "<img class='center-block img-right' src='img/dolphins.png'>", "<img class='center-block img-right' src='img/jets.png'>", "<img class='center-block img-right' src='img/browns.png'>", "<img class='center-block img-right' src='img/cowboys.png'>", "<img class='center-block img-right' src='img/eagles.png'>", "<img class='center-block img-right' src='img/browns.png'>", "<img class='center-block img-right' src='img/seahawks.png'>", "<img class='center-block img-right' src='img/colts.png'>", "<img class='center-block img-right' src='img/chargers.png'>", "<img class='center-block img-right' src='img/giants.png'>" ];
var correctAnswers = ["C. Bengals", "C. Bills", "B. Dolphins", "A. Jets", "C. Browns", "C. Cowboys", "B. Eagles", "D. Browns", "C. Seahawks", "C. Colts", "A. Chargers", "B. Giants"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");
