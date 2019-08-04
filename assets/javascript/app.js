
//an array of objects storing the questions and answers, and correct answers
var questions = 
[
  {
    question: "What is the capital of United Kingdom?",
    choices: ["Manchester", "Birmingham", "London", "Liverpool"],
    answer: 2,
    display: "London"
  },
  
  {
    question: "What is the capital of United States?",
    choices: ["California", "New York", "Miami", "Florida"],
    answer: 1,
    display: "New York"
  }
];

//global variables
var counter = 30;
var currentQuestion = 0;
var correct = 0;
var incorrect = 0;
var noAnswer = 0;
var questionNumber = 1;


//click listeners
$("#start").on("click", start);

$('body').on('click', '.possibleChoices', checkGuess);

$('body').on('click', '#reset', start);

//functions
function start(){
    $("#start").remove();
    questionTimer();
    chooseQuestion();
}


function chooseQuestion(){
    timer = setInterval (questionTimer, 1000);

     //pulls the first question out of the questions array
     var chosenQuestion = questions[currentQuestion].question;
     // showQuestion();
     $("#question").text(chosenQuestion);

     //pulls possible answers out of the coices array and creates a button element to display each in
    for (var i=0; i < questions[currentQuestion].choices.length; i++){
        console.log(questions[currentQuestion].choices[i]);
    
        // $(".choice").text(questions[0].choices[i]);
        questionChoices = $("<button>");
        questionChoices.text(questions[currentQuestion].choices[i]);
        questionChoices.addClass("possibleChoices");
        questionChoices.attr("id",i);
        $(".ansFlex").append(questionChoices);
   
    }
  
}


function questionTimer(){
    counter--;
    $("#time").html(counter);
    
    if(counter <= 0){
        console.log("timeup")
        timeUp();
    }
    
}

function checkGuess(){
    clearInterval(timer);
    console.log($(this).attr("id"));
    $(this).attr("id");
        
        var id = $(this).attr("id");
    if(id == questions[0].answer){
        correctAnswer();
    } else{
        incorrectAnswer();
    }
}


function correctAnswer(){
    console.log("correct");
    clearInterval(timer);
    $(".ansFlex").empty();
    correct++;
    $("#question").html("Yup that's right!");

    if (currentQuestion === questionNumber){
        setTimeout(showScore, 5 * 1000);
    }else{
        setTimeout(nextQuestion, 5 * 1000);
    }

}

function incorrectAnswer(){
    console.log("incorrect");
    clearInterval(timer);
    $(".ansFlex").empty();
    $(".ansFlex").append("The correct answer was: " + questions[currentQuestion].display);
    incorrect++;
    $("#question").html("NOPE THAT'S WRONG");

    if (currentQuestion === questionNumber){
        setTimeout(showScore, 5 * 1000);
    }else{
        setTimeout(nextQuestion, 5 * 1000);
    }
}

function nextQuestion(){
    counter = 30;
    $("#time").html(counter);
    $(".ansFlex").empty();
    currentQuestion++;
    console.log(currentQuestion);
    chooseQuestion();
}

function timeUp(){
    clearInterval(timer);
    noAnswer++;
    $(".ansFlex").empty();
    $("#question").html("TIMES UP");
    $(".ansFlex").append("The correct answer was:"+ " " + questions[currentQuestion].display);
    if (currentQuestion === questionNumber){
        setTimeout(showScore, 5 * 1000);
    }else{
        setTimeout(nextQuestion, 5 * 1000);
    }
}

function showScore(){
    clearInterval(timer);
    $(".ansFlex").empty();
    $("#question").html("NO MORE QUESTIONS");
    $(".ansFlex").append("<h3>Correct :" + correct, "</h3>");
    $(".ansFlex").append("<h3>Inorrect :" + incorrect, "</h3>");
    $(".ansFlex").append("<h3>Unanswered :" + noAnswer, "</h3>");
    $(".ansFlex").append("<button id = 'reset'>RESET</button");
}

function reset(){
    currentQuestion = 0;
    counter = 0;
    correct = 0;
    incorrect = 0;
    noAnswer = 0;
    questionNumber = 1;
}