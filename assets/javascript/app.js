
//an array of objects storing the questions and answers
var questions = 
[
  {
    question: "What is the green stuff served with sushi called?",
    choices: ["Guacamole", "Wasabi", "Broccoli", "Kale"],
    answer: 1,
    display: "Wasabi"
  },
  
  {
    question: "And what is that green stuff a varient of?",
    choices: ["Horse radish", "Avocado", "Mustard", "Chili oil"],
    answer: 0,
    display: "Horse radish"
  },

  {
    question: "What do you call sushi in cylindrical form?",
    choices: ["Sushi burrito", "Sushi log", "Sushi roll", "Sushi taco"],
    answer: 2,
    display: "Sushi roll"
  },

  {
    question: "What do you call naked, rice-less sushi?",
    choices: ["Sashimi", "Gross", "Indecent", "Trout"],
    answer: 0,
    display: "Sashimi"
  },

  {
    question: "What does Sashimi mean?",
    choices: ["Thin fish", "Slippery flesh", "Shredded", "Cut body"],
    answer: 3,
    display: "Cut body"
  },

];



//___________global variables____________//
var counter = 30;
var currentQuestion = 0;
var correct = 0;
var incorrect = 0;
var noAnswer = 0;
var questionNumber = 4;
//______________________________________//




//___________click listeners____________//
//For start button
$("#start").on("click", start);

//For dynamically generated possible answer buttons
$('body').on('click', '.possibleChoices', checkGuess);

//For reset button at the end of game
$('body').on('click', '#reset', reset);
//______________________________________//




//______________________________________________functions________________________________________________//

//starts timer, removes start button after it's pressed and chooses the inital question
function start(){
    $("#start").remove();
    questionTimer();
    chooseQuestion();
}


function chooseQuestion(){

    //sets timer
    timer = setInterval (questionTimer, 1000);

     //pulls the first question out of the questions array
     var chosenQuestion = questions[currentQuestion].question;

    //displays chosen question to page
     $("#question").text(chosenQuestion);

     //pulls possible answers out of the coices array and creates a button element to display each in
        for (var i=0; i < questions[currentQuestion].choices.length; i++){
            console.log(questions[currentQuestion].choices[i]);
        
            //creates a new button for each choice in the array
            questionChoices = $("<button>");
            //adds possible answers to created buttons
            questionChoices.text(questions[currentQuestion].choices[i]);
            //gives each button the class of possibleChoices
            questionChoices.addClass("possibleChoices");
            //gives each button an id (0-3)
            questionChoices.attr("id",i);
            //displays buttons on page
            $(".ansFlex").append(questionChoices);
    }
}

//timer
function questionTimer(){
    //decreases counter by 1
    counter--;
    //shows counter on page
    $("#time").html(counter +" " + "seconds");
    
    //if timer hits 0 before the user answers, it will run the timeUp function
    if(counter <= 0){
        timeUp();
    }  
}

//checks user guess
function checkGuess(){
    //stops timer from going negative
    clearInterval(timer);
    console.log($(this).attr("id"));

    //refrences only the id of the button that was clicked
    $(this).attr("id");
     
     //sets dynamically generated button id eqaul to id var
     var id = $(this).attr("id");

        //if the generated id and the number in the questions object MATCH, then the answer is correct
        if(id == questions[currentQuestion].answer){
            correctAnswer();
         //if the geerated id and the number in the questions object DO NOT MATCH, then the answer is incorrect
        } else{
            incorrectAnswer();
    }
}


//if the user guessed correctly
function correctAnswer(){
    console.log("correct");
    clearInterval(timer);

    //hides the timer
    $("#time").hide();
    //clears the question and possible answers
    $(".ansFlex").empty();
    //adds on to the number of correct answers
    correct++;
    //confimes that they chose the correct answer
    $("#question").html("Yup that's right!");

    //checks to see if that was the last question in the array
    if (currentQuestion === questionNumber){
        //if it is the last question then the user will be shown thier score
        setTimeout(showScore, 5 * 1000);
    }else{
        //if it's not the last question, the next question will be displayed
        setTimeout(nextQuestion, 5 * 1000);
    }
}

//if the user guesses incorrectly (same logic as the correctAnswer funciton)
function incorrectAnswer(){
    console.log("incorrect");
    clearInterval(timer);
    //hides the timer
    $("#time").hide();
    //clears the question and possible answers
    $(".ansFlex").empty();
    //shows the user what the correct answer was
    $(".ansFlex").append("The correct answer was: " + questions[currentQuestion].display);
    //adds one to the nuber of incorrect answers
    incorrect++;

    $("#question").html("NOPE THAT'S WRONG");
    
    //checks to see if that was the last question in the array
    if (currentQuestion === questionNumber){
        setTimeout(showScore, 5 * 1000);
     //if it's not the last question, the next question will be displayed
     }else{
        setTimeout(nextQuestion, 5 * 1000);
    }
}

//shows the next question
function nextQuestion(){
    //shows timer
    $("#time").show();
    //resets timer to 30
    counter = 30;
    //updates timer on page
    $("#time").html(counter);
    //clears last question and answer set
    $(".ansFlex").empty();
    //moves to the next question
    currentQuestion++;
    console.log(currentQuestion);
    chooseQuestion();
}

//runs if the user doesn't guess before the timer runs out
function timeUp(){
    //stops running timer
    clearInterval(timer);
    //adds one to the number of unanswered questions
    noAnswer++;
    //hides time, question, and possible answers
    $("#time").hide();
    $(".ansFlex").empty();
    $("#question").html("TIMES UP");
    //shows what the correct answer was
    $(".ansFlex").append("The correct answer was:"+ " " + questions[currentQuestion].display);
    if (currentQuestion === questionNumber){
        setTimeout(showScore, 5 * 1000);
    }else{
        setTimeout(nextQuestion, 5 * 1000);
    }
}

//clears and hides timer. Shows the user thier score
function showScore(){
    clearInterval(timer);
    $("#time").hide();
    $(".ansFlex").empty();
    $("#question").html("NO MORE QUESTIONS");
    $(".ansFlex").append("<h3>Correct :" + correct, "</h3>");
    $(".ansFlex").append("<h3>Inorrect :" + incorrect, "</h3>");
    $(".ansFlex").append("<h3>Unanswered :" + noAnswer, "</h3>");
    $(".ansFlex").append("<button id = 'reset'>AGAIN</button");
}

//takes user back to start screen
function reset(){
    // currentQuestion = 0;
    // counter = 0;
    // correct = 0;
    // incorrect = 0;
    // noAnswer = 0;
    // questionNumber = 1;
   
    location.reload();
}