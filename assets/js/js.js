//Add timer to display if selection is in/correct and delay the deletion/appearance of next set of question/answers
/*
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
*/

async function sleep(timer) {
  myPromise = new Promise(function(myResolve, myReject) {
    setTimeout(function() { myResolve(timer); }, timer);
  });

  timerComplete = await myPromise;
  //console.log(timerComplete);
}

//Add timer for total game (with deduction for incorrect answers)
function gameTimer() {
  //debugger;

  document.getElementById("timer").innerHTML = "";
  var mainTimer = setInterval(async function() {
    //debugger;
    if((timeleft > 0) && (index !== myQuestions.length)) {
      //timer keeps going until it reaches 0 or all questions are answered
      document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
      timeleft -= 1;
      //console.log("1: " + timeleft);

    } else if ((index === myQuestions.length)) {
      //All questions answered before timer runs out
      clearInterval(mainTimer);
      document.getElementById("timer").innerHTML = ""; 
      stopQuiz(totalCorrect, totalIncorrect);
      document.getElementById("timer").innerHTML = "All Done!";
      //await sleep(mainTime);
      //document.getElementById("timer").innerHTML = "";
          
    }   
        else if (timeleft <= 0) {
          //timer ran out
          //debugger;
          clearInterval(mainTimer);
          document.getElementById("timer").innerHTML = "No more time Left!";
          if (!stop_Quiz) {
            stopQuiz(totalCorrect, totalIncorrect);
          }
          //await sleep(mainTime);
          
        }

  }, 1000);
}

function resetStart() {
  //reset result header
  document.getElementById("timer").innerHTML = "";
  document.getElementById("results").innerHTML = "";
  //resets footer
  document.getElementById("progress").innerHTML = "";

  totalCorrect = 0;
  totalIncorrect = 0;

  //re-create start button
  var startContainer = document.getElementById("welcome");
  var addStartBttn = document.createElement("BUTTON");
  addStartBttn.setAttribute("type", "button");
  addStartBttn.setAttribute("id", "start");
  addStartBttn.setAttribute("class", "btn btn-primary");
  addStartBttn.setAttribute("onclick", "startQuiz(), gameTimer()");
  var startBttnTxt = document.createTextNode("Start!");
  textAppend = addStartBttn.appendChild(startBttnTxt);
  startContainer.appendChild(addStartBttn);

  //re-create HS button
  var hScoreContainer = document.getElementById("timer");
  var addHSBttn = document.createElement("BUTTON");
  addHSBttn.setAttribute("type", "button");
  addHSBttn.setAttribute("id", "hs-btn");
  addHSBttn.setAttribute("class", "btn btn-primary");
  addHSBttn.setAttribute("onclick", "getHS()");
  var hSBttnTxt = document.createTextNode("High Scores!");
  textAppend = addHSBttn.appendChild(hSBttnTxt);
  hScoreContainer.appendChild(addHSBttn);
  
  document.getElementById("progress").innerHTML = "Let's get Started!";

}

async function storeScores(score) {
  //debugger;
  //max number of entries for HS
  var maxNumber = 10;
  //key
  var high_Scores = "highScores";
  //Get stored information and parse it if nothing create empty array
  var highScores = JSON.parse(localStorage.getItem(high_Scores)) ?? [];
  //calculates lowest score in highScores array, if null then 0
  var lowestScore = highScores[maxNumber - 1]?.score ?? 0;
  
  if (score >= lowestScore) {
    var userName = prompt("You got a high score!\r\nPlease enter your name to be added to the top scores list! ");
      if (userName == "" || userName == NaN) {
        window.alert("Error This field can not be left blank.");
        userName = prompt("You got a high score!\r\nPlease enter your name to be added to the top scores list! ");
      }
    
    var newScore = {score, userName};
    //pushes new score to the array
    highScores.push(newScore);
    //orders array in descending order
    highScores.sort(function(a, b){return b.score - a.score});
    console.log(highScores);
    //cuts out the entries that go over the maxNumber of entries
    highScores.splice(maxNumber);
    //stores information as string
    localStorage.setItem(high_Scores, JSON.stringify(highScores));
    //debugger;
    
    let getScores = JSON.parse(localStorage.getItem("highScores"))
    //document.getElementById("hs-h2").innerHTML = "High Scores!";

    getScores.forEach((item) => {
          var containerScores = document.getElementById("results");
          var scoresContainerCreate = document.createElement("h2");
          scoresContainerCreate.setAttribute("id", "highScores");
          containerScores.appendChild(scoresContainerCreate);
          var scoreTxt = "User Name: " + `${item.userName}` + "</br>" + "Score: " + `${item.score}` + " %";
          scoresContainerCreate.innerHTML = scoreTxt; 
        })
        resetGame(); 

  }
  else {
      await sleep(2000); 
      document.getElementById("results").innerHTML = "Sorry not a high score!";
      await sleep(2000); 
      document.getElementById("results").innerHTML = "";
      resetGame();  
  }
 
}

function getHS() {
  var x = document.getElementById("main");
  var y = document.getElementById("main2");
  //debugger;
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
    var deleteContainerS = document.getElementById("div-h2");
    deleteContainerS.remove();
    
  } else {
    x.style.display = "none";
    y.style.display = "block";

    let getScores = JSON.parse(localStorage.getItem("highScores"))

      getScores.forEach((item) => {
        var containerScores = document.getElementById("main2");

        var scoresContainerCreate = document.createElement("div");
        scoresContainerCreate.setAttribute("id", "div-h2");
        containerScores.appendChild(scoresContainerCreate);

        var containerScores2 = document.getElementById("div-h2");
        var scoresContainerCreate = document.createElement("h2");
        scoresContainerCreate.setAttribute("id", "h2-id");
        containerScores2.appendChild(scoresContainerCreate);
        var scoreTxt = "User Name: " + `${item.userName}` + "</br>" + "Score: " + `${item.score}` + " %";
        scoresContainerCreate.innerHTML = scoreTxt; 
      })
  }
}

function resetGame() {
  var containerScores = document.getElementById("results");
  var btnCreate = document.createElement("BUTTON");
  btnCreate.setAttribute("id", "resetGame");
  btnCreate.setAttribute("class", "btn btn-info");
  btnCreate.setAttribute("onClick", "resetStart()");
  var btnText = document.createTextNode("Restart?");
  textAppend = btnCreate.appendChild(btnText);
  containerScores.appendChild(btnCreate); 
 }

function minusTime() {
  //debugger;
  if (timeleft > 0 ) {
    timeleft -= 10;
      if(timeleft <= 0) {
        document.getElementById("timer").innerHTML = "No more time left!";
        stopQuiz(totalCorrect, totalIncorrect);
      }
  }
}

function stopQuiz(totalCorrect, totalIncorrect) {
  //debugger;

   if (totalCorrect === myQuestions.length) {
    stop_Quiz = true;
    makeQuiz("null", stop_Quiz);
    gameOver(totalCorrect, totalIncorrect);
    document.getElementById("progress").innerHTML = "";
   }
   else if (containerDisplay) {
     stop_Quiz = true;
     deleteContainers(index);
     gameOver(totalCorrect, totalIncorrect);
     document.getElementById("progress").innerHTML = "";
    } 
    else {
    stop_Quiz = true;
    gameOver(totalCorrect, totalIncorrect);
    document.getElementById("progress").innerHTML = "";
   }
}

async function gameOver(totalCorrect, totalIncorrect) {
    //fn to ask for user initials and save score
    totalScore = Math.round((totalCorrect/myQuestions.length) * 100);
    document.getElementById("results").innerHTML = "Result: " + totalCorrect + "/" + myQuestions.length + "<br><br>" + totalScore + " %";
    //Add fn for player input
    await sleep(timer); 

    storeScores(totalScore);

}

//Display if selected answer is correct or incorrect and display progress
//Also count the # of in/correct questions
var displaySelectionResult = async function(display) {
  //debugger;
  if ((index < myQuestions.length) && (timeleft > 0)) {
    document.getElementById("results").innerHTML = "";
    if (display == 1) {
      document.getElementById("results").innerHTML = "Correct!";
      totalCorrect++;
    }
    else if (display == 2) {
      document.getElementById("results").innerHTML = "Nope! -10 seconds";
      totalIncorrect++;
      minusTime();
    }
    else {
      stopQuiz(totalCorrect, totalIncorrect);
    }
  }
else {
  stopQuiz(totalCorrect, totalIncorrect);
}
}

//selected button passes the information to the fn and it checks if it's correct or not
//also deleted the previous questions so the next set can be displayed
async function selectedButton(clicked_id, clicked_txt) { 
  //debugger;
  if (index < myQuestions.length) {

      if (clicked_id === myQuestions[index].correctAnswer) {
          //correct answer
          display = 1;
          displaySelectionResult(display);
          deleteContainers(index);
          //wait timer to show the next set of questions
          await sleep(timer);
          document.getElementById("results").innerHTML = "";
          index++;
      }
      else if (clicked_id !== myQuestions[index].correctAnswer) {
          //incorrect answer
          display = 2;
          displaySelectionResult(display);
          
          if (!stop_Quiz) {
          deleteContainers(index);
          //wait timer to show the next set of questions
          await sleep(timer);
          document.getElementById("results").innerHTML = "";
          index++;
          }
      } 
  }
  makeQuiz(index, stop_Quiz);
}

//makes the quiz adds containers for questions/answers depending on the index
//function makeQuiz (i) {
  async function makeQuiz (i, stop) {
    //debugger;
    if ((i < myQuestions.length) && (!stop)) {
      makeContainers(i);
    }
    else if (i === myQuestions.length) {
      //after last question is answered go through this and re-create the start button
      document.getElementById("progress").innerHTML = "";
    }
  }

  function makeContainers(i) {
    //Question container
          //debugger;
          var container = document.getElementById("question");
    
          var questionContainerCreate = document.createElement("div");
          questionContainerCreate.setAttribute("id", "div-question" + i);
          questionContainerCreate.setAttribute("class", "container");
          container.appendChild(questionContainerCreate);
          var currentQuestion = myQuestions[i].question;
          questionContainerCreate.innerHTML = currentQuestion; 
    
          //Choices container
          //var container2 = document.getElementById("div-question" + i); 
          //append container to id = question instead
          var choicesContainerCreate = document.createElement("div");
          choicesContainer = choicesContainerCreate.setAttribute("id", "div-choices" + i);
          choicesContainer = choicesContainerCreate.setAttribute("class", "list-group");
          container.appendChild(choicesContainerCreate);
    
          var container3 = document.getElementById("div-choices" + i); 
          
          //create the buttons for the answers
          for (letter in myQuestions[i].answers) {
          var btnCreate = document.createElement("BUTTON");
          btnCreate.setAttribute("id", letter);
          btnCreate.setAttribute("class", "list-group-item list-group-item-action");
          btnCreate.setAttribute("onClick", "selectedButton(this.id, this.innerHTML)");
          var btnText = document.createTextNode(myQuestions[i].answers[letter]);
          textAppend = btnCreate.appendChild(btnText);
          container3.appendChild(btnCreate);  
          }
          var x = i + 1; 
          document.getElementById("progress").innerHTML = "";
          document.getElementById("progress").innerHTML = "Question " + x + " of " + myQuestions.length;
          //console.log("index for makeQuiz: " + index);
          containerDisplay = true;

    }
    
    function deleteContainers(index) {
      var deleteContainerQ = document.getElementById("div-question" + index);
      deleteContainerQ.remove();
      var deleteContainerC = document.getElementById("div-choices" + index);
      deleteContainerC.remove();
      containerDisplay = false;
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
  var timer = 1000;
  var totalScore;
  var timerComplete;
  var mainTime = 5000;
  var myPromise;
  var timeleft;
  var stop_Quiz;
  var containerDisplay = false;


//function to generate the first set of questions with answers on buttons
//also deletes the start button so it can't be used throughout the quiz
 function startQuiz() {
 // debugger;
 //set all variables to 0 before starting
  index = 0;
  display = 0;
  totalCorrect = 0;
  totalIncorrect = 0;
  totalScore = 0;
  stop_Quiz = false;
  timeleft = 50;
  //mainTime = 0;


  //delete start button
  var deleteStartBttn = document.getElementById("start");
  deleteStartBttn.remove();
  var deleteHSBttn = document.getElementById("hs-btn");
  deleteHSBttn.remove();
  //start timer

  //go to make quiz with index
  makeQuiz(index);

}

