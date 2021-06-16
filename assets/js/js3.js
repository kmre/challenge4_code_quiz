var myQuestions = [
    {
      question: "What does HTML stand for?",
      answers: {
        a: "Hyper Text Markup Language",
        b: "Hyperlinks and Text Markup Language",
        c: "Hyper Tool Markup Language"
      },
      correctAnswer: "a"
    },
    {
      question: "Who is making the Web standards?",
      answers: {
        a: "Google",
        b: "Mozilla",
        c: "The World Wide Web Consortium"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the correct HTML for adding a background color?",
      answers: {
        a: "<body class='background-color:yellow;'>",
        b: "<body bg='yellow'>",
        c: "<background>yellow</background>",
        d: "<body style='background-color:yellow;'>"
      },
      correctAnswer: "d"
    },
    {
        question: "What HTML element is used to define important text",
        answers: {
          a: "<important>",
          b: "<b>",
          c: "<strong>"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the correct HTML for creating a hyperlink?",
        answers: {
          a: "<a href='http://www.w3schools.com'>W3Schools</a>",
          b: "<a url='http://www.w3schools.com'>W3Schools.com</a>",
          c: "<a name='http://www.w3schools.com'>W3Schools.com</a>"
        },
        correctAnswer: "a"
    },
    {
        question: "How can you open a link in a new tab/browser window?",
        answers: {
          a: "<a href='url' new>",
          b: "<a href='url' target='_blank'>",
          c: "<a href='url' target='new'>"
        },
        correctAnswer: "b"
    },
    {
        question: "Inline elements are normally displayed without starting a new line.",
        answers: {
          a: "True",
          b: "False",
        },
        correctAnswer: "a"
    }
  ];
    var mainContainer = document.getElementById("main");
    var quizContainer = document.getElementById("quiz");
    var resultsContainer = document.getElementById("results");
    var submitButton = document.getElementById("submit");
    var start = document.getElementById("start");
//generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

//function to generate the question with answers on buttons
makeQuiz();

function makeQuiz() {
    
    for(var i=0; i<myQuestions.length; i++){
        //Question container
        debugger;
        var container = document.getElementById("question");

        var questionContainerCreate = document.createElement("div");
        questionContainerCreate.setAttribute("id", "div-question" + i);
        container.appendChild(questionContainerCreate);
        var currentQuestion = myQuestions[i].question;
        questionContainerCreate.innerHTML = currentQuestion; 

        //Choices container
        var container2 = document.getElementById("div-question" + i); 
        var choicesContainerCreate = document.createElement("div");
        choicesContainer = choicesContainerCreate.setAttribute("id", "div-choices" + i);
        container2.appendChild(choicesContainerCreate);

        var container3 = document.getElementById("div-choices" + i); 
        
        //create the buttons for the answers
        for (letter in myQuestions[i].answers) {
        var btnCreate = document.createElement("BUTTON");
        btnCreate.setAttribute("id", "answer" + letter);
        btnCreate.setAttribute("onClick", "selectedButton(this.id, this.innerHTML)");
        console.log(this.id);
        var btnText = document.createTextNode(myQuestions[i].answers[letter]);
        textAppend = btnCreate.appendChild(btnText);
        container3.appendChild(btnCreate);  
        }
        console.log(i);
        
    }
}

function selectedButton(clicked_id, clicked_txt) {
    console.log("Button clicked, id "+clicked_id+", text: " +clicked_txt);
    
}
/*
function select(id, selection) {
    var button = document.getElementById(id);
    console.log(button);
    button.onclick = function() {
        makeQuiz.select(selection);
        console.log(makeQuiz.select(selection));
        makeQuiz();
    }
};
*/
//fn to see which button is pressed and compare with correct answer

//fn to have the timer counting or deduct if answer is incorrect

//fn to show which question it is x of 7

//fn to keep track of score and get input from user

//fn to save and display max score


// function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
//     debugger;
//   function showQuestions(questions, quizContainer){
//     // we'll need a place to store the output and the answer choices
//     var output = [];
//     var answers;

//     // for each question...
//     for(var i=0; i<questions.length; i++){
      
//       // first reset the list of answers
//       answers = [];

//       // for each available answer...
//       for(letter in questions[i].answers){

        

//         // ...add an html radio button
//         /*
//         answers.push(
//           '<label>'
//             + '<input type="radio" name="question'+i+'" value="'+letter+'">'
//             + letter + ': '
//             + questions[i].answers[letter]
//           + '</label>'
//         );
//         */
//       }

//       // add this question and its answers to the output
//       output.push(
//         '<div class="question">' + questions[i].question + '</div>'
//         + '<div class="answers">' + answers.join('') + '</div>'
//       );
//     }

//     // finally combine our output list into one string of html and put it on the page
//     quizContainer.innerHTML = output.join('');
//   }

//   function showResults(questions, quizContainer, resultsContainer){
    
//     // gather answer containers from our quiz
//     var answerContainers = quizContainer.querySelectorAll('.answers');
    
//     // keep track of user's answers
//     var userAnswer = '';
//     var numCorrect = 0;
    
//     // for each question...
//     for(var i=0; i<questions.length; i++){

//       // find selected answer
//       userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
      
//       // if answer is correct
//       if(userAnswer===questions[i].correctAnswer){
//         // add to the number of correct answers
//         numCorrect++;
        
//         // color the answers green
//         answerContainers[i].style.color = 'lightgreen';
//       }
//       // if answer is wrong or blank
//       else{
//         // color the answers red
//         answerContainers[i].style.color = 'red';
//       }
//     }

//     // show number of correct answers out of total
//     resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
//   }

//   // show questions right away
//   showQuestions(questions, quizContainer);
  
//   // on submit, show results
//   submitButton.onclick = function(){
//     showResults(questions, quizContainer, resultsContainer);
//   }

// }