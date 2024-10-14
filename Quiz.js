const Questions = [
    {
        question: "Which is the largest animal in the world?",
        answer: [
            { Text: "Shark", correct: false },
            { Text: "Blue whale", correct: true },
            { Text: "Elephant", correct: false },
            { Text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answer: [
            { Text: "Asia", correct: false },
            { Text: "Australia", correct: true },
            { Text: "Arctic", correct: false },
            { Text: "Africa", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answer: [
            { Text: "Vatican City", correct: true },
            { Text: "Bhutan", correct: false },
            { Text: "Nepal", correct: false },
            { Text: "Sri Lanka", correct: false },
        ]
    },
    {
        question: "Who was the first President of India?",
        answer: [
            { Text: "Jawaharlal Nehru", correct: false },
            { Text: "Sardar Vallabhbhai Patel", correct: false },
            { Text: "Zakir Husain", correct: false },
            { Text: "Rajendra Prasad", correct: true },
        ]
    },
    {
        question: "Who wrote the Indian national anthem?",
        answer: [
            { Text: "Rabindranath Tagore", correct: true },
            { Text: "Bankim Chandra Chattopadhyay", correct: false },
            { Text: "Mahatma Gandhi", correct: false },
            { Text: "Sarojini Naidu", correct: false },
        ]
    },
    {
        question: "Who discovered penicillin?",
        answer: [
            { Text: "Marie Curie", correct: false },
            { Text: "Alexander Fleming", correct: true },
            { Text: "Albert Einstein", correct: false },
            { Text: "Isaac Newton", correct: false },
        ]
    },
    {
        question: "Which is the smallest planet in our solar system?",
        answer: [
            { Text: "Mercury", correct: true },
            { Text: "Venus", correct: false },
            { Text: "Earth", correct: false },
            { Text: "Mars", correct: false },
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answer: [
            { Text: "Gold", correct: false },
            { Text: "Iron", correct: false },
            { Text: "Diamond", correct: true },
            { Text: "Platinum", correct: false },
        ]
    },
    {
        question: "What is the national flower of India?",
        answer: [
            { Text: "Rose", correct: false },
            { Text: "Lotus", correct: true },
            { Text: "Sunflower", correct: false },
            { Text: "Jasmine", correct: false },
        ]
    },
    {
        question: "In which year did India gain independence?",
        answer: [
            { Text: "1945", correct: false },
            { Text: "1946", correct: false },
            { Text: "1947", correct: true },
            { Text: "1948", correct: false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = Questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.Text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${Questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < Questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < Questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
