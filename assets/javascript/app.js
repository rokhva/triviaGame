

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

    // function start() {
//     //start the count here and set the clock to running.
//     if (!clockRunning) {
//       intervalId = setInterval(count, 1000);
//     }
// function stop() {
//     //stop the count for the last screen of the game
//     clearInterval(intervalId);
// }
// ______________________________________________________________________________________________________________________//

//an array of objects storing the questions and answers
var questions = 
[
  {
    question: "What is the capital of United Kingdom?",
    choices: ["Manchester", "Birmingham", "London", "Birmingham"],
    answer: 2
  },
  
  {
    question: "What is the capital of United States?",
    choices: ["California", "New York", "Miami", "Florida"],
    answer: 1
  }
];


//onclick event listeners
$("#start").on("click", start);


  
//   }

function start (){
    renderQuestion();
}


function renderQuestion (){
    var chosenQuestion = questions[0].question;
    console.log(chosenQuestion);
    $("#question").text(chosenQuestion);

   
    for (var i=0; i < questions[0].choices.length; i++){
    console.log(questions[0].choices[i]);
    }
}





//looping through the questions and selecting one
for ( var i = 0; i < questions.length; i++ ) {
    var question = questions[i].question;

}

//grab the first question in the object array and display