
//selected button passes the information to the fn and it checks if it's correct or not
var selectedButton = function(clicked_id, clicked_txt) { 
  debugger;
  //index = currentIndex;
  console.log("Button clicked, id "+clicked_id+", text: " +clicked_txt);
  if (index < myQuestions.length) {
      
      console.log(index);

      if (clicked_id === myQuestions[index].correctAnswer) {
          console.log("Correct");
          var deleteContainer = document.getElementById("div-question" + index);
          deleteContainer.remove();
          index++;
          
      }
      else if (clicked_id !== myQuestions[index].correctAnswer) {
          console.log("Incorrect");
          console.log(index);
          console.log(myQuestions[index].correctAnswer);
          var deleteContainer = document.getElementById("div-question" + index);
          deleteContainer.remove();
          index++;

      } else {
          var deleteContainer = document.getElementById("div-question" + index);
          deleteContainer.remove();
          index++;        
      } 
  }
  makeQuiz(index);
}

//makes the quiz 
function makeQuiz () {
  var i = index;
  if (i < myQuestions.length) {
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
      btnCreate.setAttribute("id", letter);
      btnCreate.setAttribute("class", i);
      btnCreate.setAttribute("onClick", "selectedButton(this.id, this.innerHTML)");
      var btnText = document.createTextNode(myQuestions[i].answers[letter]);
      textAppend = btnCreate.appendChild(btnText);
      container3.appendChild(btnCreate);  
      }
      console.log(i);
      console.log(index);
      index = i;
      return index;
  }
  else if (i === myQuestions.length) {
    debugger;
    var startContainer = document.getElementById("welcome");
    var addStartBttn = document.createElement("BUTTON");
    addStartBttn.setAttribute("id", "start");
    var startBttnTxt = document.createTextNode("Start");
    textAppend = addStartBttn.appendChild(startBttnTxt);
    startContainer.appendChild(addStartBttn);
    index = 0;
    document.getElementById("start").addEventListener("click", startQuiz);
    return index;
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
  var mainContainer = document.getElementById("main");
  var quizContainer = document.getElementById("quiz");
  var resultsContainer = document.getElementById("results");
  var submitButton = document.getElementById("submit");
  var start = document.getElementById("start");
  var index;
  var currentIndex;

//function to generate the first set of questions with answers on buttons
 
 var startQuiz = function() {
//start.onclick = function(){
  index = 0;
  makeQuiz(index);
  currentIndex = index;
  var deleteStartBttn = document.getElementById("start");
  console.log(deleteStartBttn);
  deleteStartBttn.remove();
  console.log(deleteStartBttn);
  return currentIndex;
}

document.getElementById("start").addEventListener("click", startQuiz);
/// Need to make a button to "start again" and add the start button

