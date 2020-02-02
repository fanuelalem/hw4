

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter")
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
    question:"How many continents are there",
    choice1:"7",
    choice2:"4",
    choice3:"9",
    choice4:"8",
    answer:1},
    {
        question:"what's the capital city of the United States?",
        choice1:"New York City, New York",
        choice2:"Washington DC",
        choice3:"Los Angelos, CA",
        choice4:"Philidelphia, Pennsylvania",
        answer:2},
        {
            question:"what is the currensy used in America?",
            choice1:"yen",
            choice2:"euro",
            choice3:"Dollar",
            choice4:"renminbi",
            answer:3},
            {
                question:"who is the 45th president of the united states?",
                choice1:"george bush",
                choice2:"abraham lincoln",
                choice3:"barack obama",
                choice4:"donald trump",
                answer:4},
                {
                    question:"what year did the cleveland caveliars win their first nba championship",
                    choice1:"2014",
                    choice2:"2016",
                    choice3:"2019",
                    choice4:"2013",
                    answer:2},
    
     ]

 const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
 localStorage.setItem("mostRecentScore", score);

    return window.location.assign(href="./end.html");
  }
  questionCounter++;
  questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

       
    const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    
        

if(classToApply==="correct"){
  incrementScore(CORRECT_BONUS);
}



    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

function incrementScore(num){

  score += num;
  scoreText.innerText=score
}
startGame();

