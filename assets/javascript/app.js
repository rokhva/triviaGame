

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
    answer: 2
  },
  
  {
    question: "What is the capital of United States?",
    choices: ["California", "New York", "Miami", "Florida"],
    answer: 1
  }
];

//global variables
var time = 0;
var counter = 0;
var timeLeft = 60;

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
    var chosenQuestion = questions[0].question;
    console.log(chosenQuestion);
    $("#question").text(chosenQuestion);

    //pulls possible answers out of the coices array and creates a button element to display each in
    for (var i=0; i < questions[0].choices.length; i++){
        console.log(questions[0].choices[i]);
    
        // $(".choice").text(questions[0].choices[i]);
        questionChoices = $("<button>");
        questionChoices.text(questions[0].choices[i]);
        questionChoices.addClass("possibleChoices");
        questionChoices.attr("id",i)
        $(".ansFlex").append(questionChoices);
   
    }
    //hides start button
    $("#start").css("display", "none");
}


//countdown timer
function setTimer (){
    
    //sets interval the timer will count down at
    var interval = setInterval(timeIt, 1000);
    
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
            $('#time').hide();
            $(".ansFlex").hide();
            $("#question").hide();

            //creates div and displays a "you failed" message
            var loser = $("<div>");
            loser.text("Times Up!");
            $("#guessResult").append(loser);
        }
    }
}

//converts interval into seconds and minutes
function timerConverter (s){
    var min = Math.floor(s / 60);
    var sec = s % 60;
    return min + ":" + sec; //How to get the same number of digits to return for the min and seconds?
}





function checkGuess(){
    console.log($(this).attr("id"));
    $(this).attr("id");
        
        var id = $(this).attr("id");

        //determines if the guess was the correct answer
        if(id == questions[0].answer){ 

            //clears out timer, question, and answer buttons
            $('#time').hide();
            $(".ansFlex").hide();
            $("#question").hide();

            //creates div and displays a "you got it" message
            var winner = $("<div>");
            winner.text("That's Right!");
            $("#guessResult").append(winner);
            
        
        } else{

            //clears out timer, question, and answer buttons
            $('#time').hide();
            $(".ansFlex").hide();
            $("#question").hide();

            //creates div and displays a "you failed" message
            var loser = $("<div>");
            loser.text("So wrong!");
            $("#guessResult").append(loser);
        }
    
}

