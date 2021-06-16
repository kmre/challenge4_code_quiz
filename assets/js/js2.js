// code by webdevtrick (https://webdevtrick.com)
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


/*
function Question(text, answers, answer) {
    this.text = text;
    this.answers = answers;
    this.answer = answer;
}
*/

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().question;

        // show options
        var answers = quiz.getQuestionIndex().answers;
        for(var i = 0; i < answers.length; i++) {
            var element = document.getElementById("answer" + i);
            element.innerHTML = answers[i];
            guess("btn" + i, answers[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
/*
var questions = [
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("Webdevtrick.com is about..", ["Web Design", "Graphic Design", "SEO & Development", "All"], "All")
];
*/
var questions = [
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

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();