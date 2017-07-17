var triviaQuestions = [{

	question: "Which NFL player has won the most MVP awards?",
	answerList: ["Tom Brady", "Brett Favre", "Peyton Manning", "Aaron Rodgers", "Johnny Unitas"],
	answer: 2
	
},{
	question: "Which NFL Team has won the most championships?",
	answerList: ["Patriots", "Cowboys", "Steelers", "49ers", "Texans"],
	answer: 2

},{

	question: "Which NFL player has the most rushing yards in a single season?",
	answerList: ["Adrian Peterson", "Marcus Allen", "LaDainain Tomlinson", "Eric Dickerson"],
	answer: 3

},{

	question: "Which NFL player has the most receiving yards in a single season?",
	answerList: ["Calvin Johnson", "Jerry Rice", "Terrell Owens", "Randy Moss"],
	answer: 0

},{

	question: "Which NFL player has the most Super Bowl MVP awards?",
	answerList: ["Peyton Manning", "Tom Brady", "Joe Montana", "Eli Manning"],
	answer: 1

},{

	question: "Which NFL player is the all-time leading rusher?",
	answerList: ["Emmitt Smith", "Eric Dickerson", "Walter Payton", "Barry Sanders"],
	answer: 0
},{

	question: "Which NFL team lost 4 straight Super Bowls during the 1990's?",
	answerList: ["Raiders", "49ers", "Bills", "Bengals"],
	answer: 2
},{

	question: "Who was the MVP of Super Bowl 50?",
	answerList: ["Von Miller", "Peyton Manning", "Cam Newton", "Demarious Thomas"],
	answer: 0

},{

	question: "Which NFL QB has thrown the most career interceptions?",
	answerList: ["George Blanda", "Dan Marino", "Vinny Testaverde", "John Hadl", "Brett Favre"],
	answer: 4
},{

	question: "Which NFL coach has the most career wins?",
	answerList: ["Tom Landry", "George Halas", "Don Shula", "Bill Belichick"],
	answer: 2
},{

	question: "Which NFL player has the most career touchdowns?",
	answerList: ["Jerry Rice", "Emmitt Smith", "LaDainain Tomlinson", "Randy Moss", "Terrell Owens"],
	answer: 0

},{

	question: "Which NFL Quarterback has the most career passing yards?",
	answerList: ["Peyton Manning", "Brett Favre", "Drew Brees", "Tom Brady", "Dan Marino"],
	answer: 0
},{

	question: "Which NFL receiver has the most career yards?",
	answerList: ["Issac Bruce", "Tony Gonzalez", "Randy Moss", "Jerry Rice", "Terrell Owens"],
	answer: 3
},{

	question: "Which NFL Team relocated to Los Angeles for the 2017 season?",
	answerList: ["Rams", " Jaguars", "Vikings", "Raiders", "Chargers"],
	answer: 4
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "You are correct!!!",
	incorrect: "Wrong!",
	endTime: "Took too long!",
	finished: "Alright! Lets see how many you got right"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 5; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 30;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}