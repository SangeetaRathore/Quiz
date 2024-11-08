let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

function showCategoryScreen() {
  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('category-screen').style.display = 'block';
}

function startQuiz(category) {
  generateQuestions(category);
  document.getElementById('category-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display = 'block';
  loadQuestion();
}

function generateQuestions(category) {
  questions = [];
  for (let i = 0; i < 10; i++) {
    const num1 = Math.ceil(Math.random() * 10);
    const num2 = Math.ceil(Math.random() * 10);
    let question = { text: `${num1} + ${num2}`, answer: num1 + num2 };

    if (category === 'Subtraction') {
      question = { text: `${num1} - ${num2}`, answer: num1 - num2 };
    } else if (category === 'Multiplication') {
      question = { text: `${num1} * ${num2}`, answer: num1 * num2 };
    } else if (category === 'Division' && num2 !== 0) {
      question = { text: `${num1} / ${num2}`, answer: Math.floor(num1 / num2) };
    }
    questions.push(question);
  }
}

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question-text').innerText = question.text;
  document.getElementById('user-answer').value = '';
}

function appendNumber(num) {
  const answerInput = document.getElementById('user-answer');
  answerInput.value += num;
}

function undoAnswer() {
  const answerInput = document.getElementById('user-answer');
  answerInput.value = answerInput.value.slice(0, -1);
}

function submitAnswer() {
  const userAnswer = parseInt(document.getElementById('user-answer').value);
  const correctAnswer = questions[currentQuestionIndex].answer;

  userAnswers.push({
    question: questions[currentQuestionIndex].text,
    correct: correctAnswer,
    userAnswer: userAnswer,
    isCorrect: userAnswer === correctAnswer
  });

  if (userAnswer === correctAnswer) {
    alert("Correct!");
    score++;
  } else {
    alert("Incorrect!");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < 10) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById('quiz-screen').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';

  const resultDetails = document.getElementById('result-details');
  resultDetails.innerHTML = '';
  userAnswers.forEach((answer, index) => {
    const resultText = document.createElement('p');
    resultText.innerText = `${index + 1}. ${answer.question} = ${answer.correct} | Your Answer: ${answer.userAnswer} ${answer.isCorrect ? '✓' : '✗'}`;
    resultDetails.appendChild(resultText);
  });

  document.getElementById('score-display').innerText = `Score: ${score} / 10`;
}

function backToCategories() {
  document.getElementById('result-screen').style.display = 'none';
  document.getElementById('category-screen').style.display = 'block';
  resetQuiz();
}

function resetQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;
}
