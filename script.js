const questions = [
    {
        question: "What is Adam's current field of study?",
        options: ["Genealogy", "Jesus Christ – our Lord and Saviour", "Linguistics", "Natural Language Processing (NLP)", "Psychology"],
        correctAnswer: 3
    },
    {
        question: "What is Adam's preferred way to spend his free time?",
        options: ["Reading", "Baking", "Speed walking", "Killing it!", "Praying"],
        correctAnswer: 1
    },
    {
        question: "What is Adam's current focus in terms of personal goals?",
        options: ["Being closer to God", "Improving sleep quality", "Managing anxiety and depression", "Overcoming joint pain", "Sentencing Barabbas"],
        correctAnswer: 2
    },
    {
        question: "What is Adam most passionate about in his hobbies?",
        options: ["Creating something from scratch", "Exploring nature", "Learning new things", "Tracing back the Holy Bloodline", "Developing his soft skills"],
        correctAnswer: 0
    },
    {
        question: "How does Adam feel about his current emotional state?",
        options: ["Generally positive, hopeful for the future", "Struggling but focusing on improving", "Feeling stuck and overwhelmed", "Just great!", "On the verge of dying"],
        correctAnswer: 1
    },
    {
        question: "Which condition is Adam currently being treated for?",
        options: ["Borderline Personality Disorder", "Hypothyroidism", "Generalized Anxiety Disorder", "Juvenile Idiopathic Arthritis", "Human Immunodeficiency Virus"],
        correctAnswer: 2
    },
    {
        question: "What is Adam's job?",
        options: ["Clown", "Barista", "Teacher", "Working at TJX", "Sovereign Pontiff"],
        correctAnswer: 3
    },
    {
        question: "What’s Adam's favorite style for a Halloween costume?",
        options: ["Classic, elegant", "Fun and playful", "Slightly 'slutty' and bold", "Boring", "Scary"],
        correctAnswer: 2
    },
    {
        question: "What’s something Adam is currently working on improving?",
        options: ["Physical fitness", "Language skills", "Opera singing", "Knowledge about the life of Jesus Christ", "Mental health"],
        correctAnswer: 4
    },
    {
        question: "How does Adam prefer to cope with stress?",
        options: ["Exercising or being active", "Talking to friends or family", "Spending time alone to reflect", "Praying", "taking psychedelics"],
        correctAnswer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const message = document.getElementById("message");
const finalMessage = document.getElementById("final-message");
const quizForm = document.getElementById("quiz-form");

function showQuestion(index) {
    if (index >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[index];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = ""; // Clear previous options

    question.options.forEach((option, i) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "question";
        input.value = String.fromCharCode(97 + i);
        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + option));
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement("br"));
    });

    quizForm.reset();
}

function handleQuizAnswer(event) {
    event.preventDefault();
    const selectedAnswer = document.querySelector("input[name='question']:checked");

    if (!selectedAnswer) {
        message.textContent = "Please select an answer.";
        message.className = "incorrect";
        return;
    }

    const answerIndex = selectedAnswer.value.charCodeAt(0) - 97;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (answerIndex === correctAnswer) {
        message.textContent = "Correct!";
        message.className = "correct";
        score++;
    } else {
        message.textContent = "Incorrect. The correct answer was " + questions[currentQuestionIndex].options[correctAnswer] + ".";
        message.className = "incorrect";
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            showQuestion(currentQuestionIndex);
            message.textContent = "";
        }, 1500);
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizForm.style.display = "none";
    questionText.style.display = "none";
    optionsContainer.style.display = "none";
    message.style.display = "none";

    finalMessage.textContent = `Your final score is ${score} out of ${questions.length}.`;
    finalMessage.style.display = "block";
    finalMessage.className = "correct";
}

quizForm.addEventListener("submit", handleQuizAnswer);
showQuestion(currentQuestionIndex);
