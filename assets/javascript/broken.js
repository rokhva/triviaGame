

// ______________________________________________________PSUEDO CODE____________________________________________________//

//start screen
    //welcomes the user to the trivia game
    //with the option to press the start button

//question screen
//once the start button is pressed
    //div will update with first question
    //timer will start to count down
    //if the user selects the correct answer
        //then they get a "yay you got the right answer" screen
        //this screen will move onto the next question automaitcally
    //if the user selects the wrong answer
        //then they get a "you failed" screen
        //this screen will move onto the next question automaitcally
    //if the timer runs out before they can answer
        //the screen will update to the next question

//summary screen
//once the user has cycled through all the questions
    //they get a summary screen with the number of correct, incorrect, and imcomplete questions
    //with the option (button) to start over

// ______________________________________________________________________________________________________________________//




//add a variable that increments the questions by one and put that variable in the render question function
//add if statements to the timer function



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
var time = 0;
var counter = 0;
var timeLeft = 5;
var viewAnsTime = 15;
var correct = 0;
var incorrect = 0;
var currentQuestion =0;


//onclick event listeners
//Start button listener
$("#start").on("click", start);
//click listener for the question choice buttons
$('body').on('click', '.possibleChoices', checkGuess);


//call to render the first question and start the timer upon start button click
function start (){
    renderQuestion();
    setTimer();
}

//choose and display question and snswer set on screen
function renderQuestion (){

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
    currentQuestion++;
    console.log(currentQuestion);
    //hides start button
    $("#start").css("display", "none");
}

// function showQuestion(){
//     $("#question").show();
// }

//countdown timer
function setTimer (){
    
    //sets interval the timer will count down at
    counter = 0;
    interval = setInterval(timeIt, 1000);
    
    function timeIt (){

        
        //shows time on screen
        $('#time').html(timerConverter(timeLeft - counter));

        //increments the counter by one
        counter++;

        //stops the time at 0
        if(counter == timeLeft){
        clearInterval(interval); //why is this stopping at 1??
        counter = 0;
        }  

        if (counter == 0){
            // $('#time').hide();
            // $(".ansFlex").hide();
            // $("#question").hide();
            timeUp();
            //creates div and displays a "times up" message
            // var loser = $("<div>");
            // loser.text("Times Up!");
            // $("#guessResult").append(loser);
            // renderQuestion();
        }
    }
}


//converts interval into seconds and minutes
function timerConverter (s){
    var min = Math.floor(s / 60);
    var sec = s % 60;
    return min + sec + " "+ "seconds"; //How to get the same number of digits to return for the min and seconds?
}





function checkGuess(){
    console.log($(this).attr("id"));
    $(this).attr("id");
        
        var id = $(this).attr("id");

        //determines if the guess was the correct answer
        if(id == questions[0].answer){ 

            //clears out timer, question, and answer buttons
            // $('#time').hide();
            // $(".ansFlex").hide();
            // $("#question").hide();
            $(".ansFlex").empty();

            //creates div and displays a "you got it" message
            var winner = $("<div>");
            winner.text("That's Right!");
            $("#guessResult").append(winner);
            correct++;

            console.log("correct" + correct);
            
        
        } else{

            //clears out timer, question, and answer buttons
            // $('#time').hide();
            $(".ansFlex").empty();
            $("#question").empty();

            //creates div and displays a "you failed" message
            var loser = $("<div>");
            loser.text("So wrong!");
            $("#guessResult").append(loser);

            //displays the correct answer on the screen
            // var loserAns = $("<div>");
            var correctAnswer = questions[currentQuestion - 1].display;
            // loserAns.text(correctAnswer);
            console.log(correctAnswer);
            $("#guessResult").append("The answer was" +" "+ correctAnswer);

            //adds one to the number of incorrect guesses
            incorrect++;

            clearInterval(interval);

            setTimer();

           
        }
        renderQuestion();
        // nextQuestion();
}



// function nextQuestion(){
//     // $(".ansFlex").empty();
//     $(".ansFlex").show();
//     $("#question").show();
// }

function timeUp (){
    // var loser = $("<div>");
    // loser.text("Times Up!");
    // $("#guessResult").append(loser);
    $(".ansFlex").empty();
    $("#question").empty();
    $(".ansFlex").append("you ran out of time");

    setTimer();

    if (counter == 0){
        // renderQuestion();
    }

}