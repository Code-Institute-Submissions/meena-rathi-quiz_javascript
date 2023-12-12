function startQuiz() {
    let playerName = document.getElementById("inputname").value;
    let playerNameDisplay = document.getElementById("playerNameDisplay");
    playerNameDisplay.textContent = "Player Name: " + playerName;

    const playerInput = document.getElementById("inputname");
    playerInput.style.display = 'none';
    const startButton = document.getElementById('btn-start');
    startButton.style.display = 'none';
    const nameLabel = document.querySelector('label[for="inputname"]');
    nameLabel.style.display = 'none';

    const scoreArea = document.getElementsByClassName("score-area")[0];
    scoreArea.style.display = 'block';
    const displayArea = document.getElementsByClassName("display-area")[0];
    displayArea.style.display = 'block';
    displayQuestions();
}

let question = [
    {
        question: "In the CSS box model, which property defines the space between an element's content and its border?",
        option: ['Eight', 'Four', 'Six', 'Ten'],
        correctAnswer: 'Eight'
    },
    {
        question: "2+2?",
        option: ['4', '6', '8', '12'],
        correctAnswer: '4'
    },
    {
        question: "10+10?",
        option: ['4', '6', '8', '20'],
        correctAnswer: '20'
    },
    {
        question: "2+10?",
        option: ['4', '6', '8', '12'],
        correctAnswer: '12'
    },
    {
        question: "10-5?",
        option: ['5', '10', '8', '12'],
        correctAnswer: '5'
    },
];


let correctCounter = 0;
let wrongCounter = 0;
let currentQuestionIndex = 0;
let selectedAnswers = {};
let lastUserAnswer = null;


function displayQuestions() {
    const currentQuestion = question[currentQuestionIndex];

    let questionArea = document.getElementById("question");
    questionArea.textContent = currentQuestion.question;
    questionArea.style.border = '1px solid #000';
    questionArea.style.padding = '10px';
    let options = document.getElementById("options");
    options.innerHTML = '';

    currentQuestion.option.forEach((opt, index) => {
        let option = document.createElement('label');
        option.textContent = opt;
        option.classList.add('option');
        option.appendChild(document.createElement('br'));
        option.appendChild(document.createElement('br'));
        const isSelected = selectedAnswers[currentQuestionIndex] === opt;
        const isCorrect = currentQuestion.correctAnswer === opt;
        option.style.color = '#ccc';

        if (isSelected) {
            option.style.backgroundColor = isCorrect ? 'blue' : 'red';
        }
        option.addEventListener("click", () => {
            compareAnswer(opt, currentQuestion.correctAnswer);
        });
        options.appendChild(option);
    });
    if (currentQuestionIndex === question.length - 1) {
        hideNextButton();
        showSubmitButton();
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= question.length) {
        currentQuestionIndex = 0;
    }
    displayQuestions();
}

function perviousQuestion() {
    currentQuestionIndex--;
    if (currentQuestionIndex < 0) {
        currentQuestionIndex = question.length - 1;
    }
    displayQuestions();
}
function hideNextButton() {

    const hideButton = document.getElementById('nextButton');
    hideButton.style.display = 'none';
}
function showSubmitButton() {
    document.getElementById('submitButton').style.display = 'block';
}

function compareAnswer(userAnswer, correctAnswer) {
    const selectedAnswer = selectedAnswers[currentQuestionIndex];

    if (selectedAnswer === userAnswer) {
        toggleAnswerCorrectness(userAnswer, correctAnswer);
    } else {
        if (lastUserAnswer === userAnswer) {
            toggleAnswerCorrectness(selectedAnswer, correctAnswer);
            toggleAnswerCorrectness(userAnswer, correctAnswer);
        } else {
            toggleAnswerCorrectness(userAnswer, correctAnswer);
        }
    }

    // disableClickEvents();
}

function compareAnswer(userAnswer, correctAnswer) {
    const options = document.querySelectorAll('.option');

    options.forEach(option => {

        if (option.textContent === userAnswer) {
            if (userAnswer === correctAnswer) {
                option.style.backgroundColor = 'blue';
                selectedAnswers[currentQuestionIndex] = userAnswer;
                incrementScore();
            } else {
                option.style.backgroundColor = 'red';
                selectedAnswers[currentQuestionIndex] = userAnswer;
                incrementWrongAnswer();
            }

            // options.forEach(option => {
            //     if (option.textContent === userAnswer) {
            //         const isCorrect = userAnswer === correctAnswer;
            //         option.style.backgroundColor = isCorrect ? 'blue' : 'red';
            //         selectedAnswers[currentQuestionIndex] = userAnswer;
            //     }
            // Disable click events after selecting an answer
            options.forEach(opt => {
                opt.removeEventListener('click', compareAnswer);
                opt.style.pointerEvents = 'none';
            });
        }
    });
}

// function incrementScore() {

//     let oldScore = parseInt(document.getElementById("score").innerText);
//     document.getElementById("score").innerText = ++oldScore;

// }

function incrementScore() {
    correctCounter++;
    // Update the display
    document.getElementById("score").innerText = correctCounter;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;

}

function calculateScorePercentage() {
    const totalQuestions = question.length;
    const correctAnswers = correctCounter;
    const percentage = (correctAnswers / totalQuestions) * 100;
    return percentage.toFixed(2); // Returns a percentage value with two decimal places
}

function submitQuiz() {
    const scorePercentage = calculateScorePercentage();
    alert(`Your score: ${scorePercentage}%`);
}