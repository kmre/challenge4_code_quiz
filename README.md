# challenge4_code_quiz
Web APIs Challenge: Code Quiz

Create a timed quiz on JavaScript fundamentals that stores high scores so that progress can be compared against peers.

Objective: 
The application must create a randomly generated password that meets certain criteria: 

 Must have:

- Start button:
    - A timer starts and the first question is presented.
        - Answers are presented as multiple choice that can be clicked on.
    - After the answer has been selected the next question and set of answers appears.
    - When a question is answered incorrectly time is subtracted from the clock and an indication is given that it was the incorrect answer.
    - All questions need to be answer or the timer reaches 0. 
        - Then the quiz is over.
    - When the quiz is over user can save initials and score.
    - When hovering over buttons they highlight.
    - Option to view all high scores.


Things added:

    1. When the start button is clicked both the timer and the quiz is started.
    2. All answers are multiple choice and the answers are clickable as buttons.
    3. Not limited to 4 answers as long as the question is in the questions array the code will iterate through all the answers and make buttons for them.
    4. Program adds the number of correct and incorrect answers.
    5. If the answer is incorrect the timer will subtract 10 seconds from the total remaining time.
    6. When the quiz is over, if the player obtained a high score (a score higher than what is already stored) then the quiz will ask for the user's name.
    7. There's a clickable button to see the highscores.
    8. The quiz is over if all questions are answered or if the timer runs out. Then a re-try button will appear if they want to start the quiz again.


Link to deployed app:
    [HTTPS](https://kmre.github.io/challenge4_code_quiz/)

Link to repository:
    [HTTPS](https://github.com/kmre/challenge4_code_quiz.git)

    [SSH](git@github.com:kmre/challenge4_code_quiz.git)

    [GitHub CLI](gh repo clone kmre/challenge4_code_quiz)
    
Screenshot:
    ![WebPage Screenshot](./assets/images/Quiz.png?raw=true "Screenshot")


