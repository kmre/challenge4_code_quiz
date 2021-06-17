//Add timer to display if selection is in/correct and delay the deletion/appearance of next set of question/answers
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Add timer for total game (with deduction for incorrect answers)

var gameTimer = function() {



}


//Display if selected answer is correct or incorrect and display progress
var displaySelectionResult = async function(display) {
  //debugger;
  if (index < myQuestions.length) {

    document.getElementById("results").innerHTML = "";
    
    if (display == 1) {
      // displays and adds correct answers
      console.log("Correct Answer!");
      console.count("totalCorrect");
      document.getElementById("results").innerHTML = "Correct!";

      totalCorrect++;
      console.log("Correct Answer! " + totalCorrect);

    }
    else if (display == 2) {
      // displays and adds incorrect answers
      console.log("XX Incorrect");
      console.count("totalIncorrect");
      
      document.getElementById("results").innerHTML = "Nope!";
      totalIncorrect++;
      console.log("XX Incorrect " + totalIncorrect);
    }
  }
else {
  document.getElementById("results").innerHTML = totalCorrect + " / " + myQuestions.length;
  console.countReset("totalCorrect"); 
  console.countReset("totalIncorrect");
  totalCorrect = 0;
  totalIncorrect = 0;
}
}


//selected button passes the information to the fn and it checks if it's correct or not
//also deleted the previous questions so the next set can be displayed
var selectedButton = async function(clicked_id, clicked_txt) { 
  //debugger;
  //index = currentIndex;
  console.log("Button clicked, id "+clicked_id+", text: " +clicked_txt);
  if (index < myQuestions.length) {
      
      console.log("index for selected button main if: " + index);

      if (clicked_id === myQuestions[index].correctAnswer) {
          console.log("Correct");
          console.log("index for selectedButton: " + index);
          display = 1;
          displaySelectionResult(display);
          var deleteContainerQ = document.getElementById("div-question" + index);
          deleteContainerQ.remove();
          var deleteContainerC = document.getElementById("div-choices" + index);
          deleteContainerC.remove();
          await sleep(2000);
          document.getElementById("results").innerHTML = "";
          index++;
          
      }
      else if (clicked_id !== myQuestions[index].correctAnswer) {
          console.log("Incorrect");
          console.log("index for selectedButton: " + index);
          console.log("Correct Answer: " + myQuestions[index].correctAnswer);
          display = 2;
          displaySelectionResult(display);
          var deleteContainerQ = document.getElementById("div-question" + index);
          deleteContainerQ.remove();
          var deleteContainerC = document.getElementById("div-choices" + index);
          deleteContainerC.remove();
          await sleep(2000);
          document.getElementById("results").innerHTML = "";
          index++;
          
      } 
  }
  makeQuiz(index);
}

//makes the quiz adds containers for questions/answers depending on the index
//function makeQuiz (i) {
  var makeQuiz = async function(i) {
  //var i = index;
  if (i < myQuestions.length) {
      //Question container
      //debugger;
      var container = document.getElementById("question");

      var questionContainerCreate = document.createElement("div");
      questionContainerCreate.setAttribute("id", "div-question" + i);
      container.appendChild(questionContainerCreate);
      var currentQuestion = myQuestions[i].question;
      questionContainerCreate.innerHTML = currentQuestion; 

      //Choices container
      //var container2 = document.getElementById("div-question" + i); 
      //append container to id = question instead
      var choicesContainerCreate = document.createElement("div");
      choicesContainer = choicesContainerCreate.setAttribute("id", "div-choices" + i);
      container.appendChild(choicesContainerCreate);

      var container3 = document.getElementById("div-choices" + i); 
      
      //create the buttons for the answers
      for (letter in myQuestions[i].answers) {
      var btnCreate = document.createElement("BUTTON");
      btnCreate.setAttribute("id", letter);
      btnCreate.setAttribute("class", i);
      btnCreate.setAttribute("onClick", "selectedButton(this.id, this.innerHTML)");
      var btnText = document.createTextNode(myQuestions[i].answers[letter]);
      textAppend = btnCreate.appendChild(btnText);
      container3.appendChild(btnCreate);  
      }
      var x = i + 1;
      document.getElementById("progress").innerHTML = "";
      document.getElementById("progress").innerHTML = "Question " + x + " of " + myQuestions.length;
      console.log("index for makeQuiz: " + index);
    
  }
  else if (i === myQuestions.length) {
    //after last question is answered go through this and re-create the start button
    document.getElementById("progress").innerHTML = "";
    display = 0;
    displaySelectionResult(display);
    await sleep(2000);
    document.getElementById("results").innerHTML = "";
    //if they click on the start button again it will re-start the quiz
    var startContainer = document.getElementById("welcome");
    var addStartBttn = document.createElement("BUTTON");
    addStartBttn.setAttribute("type", "button");
    addStartBttn.setAttribute("id", "start");
    addStartBttn.setAttribute("onclick", "startQuiz()");
    var startBttnTxt = document.createTextNode("Start");
    textAppend = addStartBttn.appendChild(startBttnTxt);
    startContainer.appendChild(addStartBttn);
    //can now display totals

    //resets footer
    document.getElementById("progress").innerHTML = "";
    document.getElementById("progress").innerHTML = "Let's get Started!";
    
  }
}

//object for questions and answers
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

//variables
  var index;
  var display;
  var totalCorrect;
  var totalIncorrect;
  var timer;

//function to generate the first set of questions with answers on buttons
//also deletes the start button so it can't be used throughout the quiz
var startQuiz = function() {
 // debugger;
//set all variables to 0 before starting
  index = 0;
  display = 0;
  totalCorrect = 0;
  totalIncorrect = 0;

  //delete start button
  var deleteStartBttn = document.getElementById("start");
  deleteStartBttn.remove();

  //go to make quiz with index
  makeQuiz(index);
  
}

