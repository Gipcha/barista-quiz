const questions = [
{
  type:'multiple',
  question: 'Какие два основных коммерческих вида кофе выращиваются в мире?',
  answers:[
     'Арабика и Робуста',
     'Либерика и Экцельса',
     'Мокка и Бурбон'
  ],
  correct: 0
},

{
  type:'multiple',
  question: 'Чем арабика отличается от робусты?',
  answers: [
    'Арабика содержит больше кофеина',
    'Робуста содержит больше кофеина и имеет более горький вкус',
    'Робуста всегда имеет фруктовые ноты'
  ],
  correct:1
},

{
  type:'multiple',
  question:'Что такое терруар в кофе?',
  answers: [
    'Способ обжарки кофе',
    'Совокупность условий выращивания кофе',
    'Метод заваривания кофе'
  ],
  correct: 1
},

{
  type:'multiple',
  question:'Какие параметры влияют на экстракцию эспрессо?',
  answers: [
    'Помол, дозировка и время пролива',
    'Цвет чашки',
    'Размер кофейной станции'
  ],
  correct: 0
},

{
  type:'multiple',
  question:'Какие вкусовые признаки у недоэкстракции?',
  answers: [
    'Кислый и водянистый вкус',
    'Сладкий и сбалансированный вкус',
    'Горький и сухой вкус'
  ],
  correct: 0
},

{
  type:'multiple',
  question:'Что такое крема в эспрессо?',
  answers: [
    'Пена из газов и масел, образующаяся на поверхности эспрессо',
    'Слой молока',
    'Осадок кофейной гущи'
  ],
  correct: 0
},

{
  type:'multiple',
  question:'Какая температура молока считается оптимальной для капучино?',
  answers: [
    '40–45°C',
    '55–65°C',
    '80–90°C'
  ],
  correct: 1
},

{
  type:'multiple',
  question:'Почему важно использовать свежемолотый кофе?',
  answers: [
    'Он быстрее растворяется',
    'В нём сохраняются ароматические масла и газы',
    'Он содержит больше кофеина'
  ],
  correct: 1
},

{
  type:'multiple',
  question:'Почему нельзя перегревать молоко?',
  answers: [
    'Молоко становится слишком жирным',
    'Разрушаются белки и появляется вкус варёного молока',
    'Кофе становится холодным'
  ],
  correct: 1
},

{
  type:'multiple',
  question:'Что такое каналообразование (channeling)?',
  answers: [
    'Когда вода проходит через кофе неравномерно, создавая каналы',
    'Когда кофе слишком долго настаивается',
    'Когда используется слишком много воды'
  ],
  correct: 0
},

{
  type:'text',
  question: 'Как называется этап заваривания, который предшествует проливу основной массы воды?',
  correctAnswer: 'Предсмачивание'
},

{
  type:'text',
  question: 'Ярко выраженный кислый, соленый и «пустой» вкус, сопровождающийся высокой, резкой кислотностью без сладости. Признак чего?',
  correctAnswer:'Недоэкстракция'
}
];
// ==== Элементы ====
const startButton = document.getElementById('start-btn');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');
const startParagraph = document.getElementById('start-paragraph');
const timerEl = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timer;
const TIME_PER_QUESTION = 15; // секунд

// ==== Старт теста ====
startButton.addEventListener('click', () => {
  startButton.classList.add('hidden');
  questionEl.classList.remove('hidden');
  answersEl.classList.remove('hidden');
  timerEl.classList.remove('hidden');
  startParagraph.classList.add('hidden');
  showQuestion();
});

// ==== Показ вопроса ====
function showQuestion() {
  clearInterval(timer);
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  answersEl.innerHTML = '';

  let timeLeft = TIME_PER_QUESTION;
  timerEl.textContent = `Время: ${timeLeft}s`;

  // Таймер
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Время: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  if (currentQuestion.type === 'multiple') {
    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.textContent = answer;
      button.classList.add('answer-btn');

      button.addEventListener('click', () => {
        clearInterval(timer);
        if (index === currentQuestion.correct) {
          button.classList.add('correct');
          score++;
        } else {
          button.classList.add('incorrect');
          // показать правильный ответ
          const correctBtn = Array.from(answersEl.children)[currentQuestion.correct];
          correctBtn.classList.add('correct');
        }
        setTimeout(nextQuestion, 800);
      });
      answersEl.appendChild(button);
    });
  } else if (currentQuestion.type === 'text') {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Введите ответ';
    input.classList.add('answer-input');

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Проверить';
    submitBtn.classList.add('answer-btn');

    submitBtn.addEventListener('click', () => {
      clearInterval(timer);
      const userAnswer = input.value.trim().toLowerCase();
      const correctAnswer = currentQuestion.correctAnswer.toLowerCase();

      if (userAnswer === correctAnswer) {
        input.style.border = '3px solid #4CAF50';
        score++;
      } else {
        input.style.border = '3px solid #F44336';
      }
      setTimeout(nextQuestion, 800);
    });

    answersEl.appendChild(input);
    answersEl.appendChild(submitBtn);
  }
}

// ==== Следующий вопрос ====
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endTest();
  }
}

// ==== Конец теста ====
function endTest() {
  clearInterval(timer);
  questionEl.textContent = 'Тест завершен';
  answersEl.innerHTML = '';
  timerEl.classList.add('hidden');
  resultEl.textContent = `Ваш результат: ${score} из ${questions.length}`;
  resultEl.classList.remove('hidden');
  restartBtn.classList.remove('hidden');

  // ==== Лучший результат ====
  let best = localStorage.getItem('bestScore') || 0;
  if (score > best) {
    localStorage.setItem('bestScore', score);
    best = score;
  }
  const bestScoreEl = document.createElement('div');
  bestScoreEl.id = 'best-score';
  bestScoreEl.style.marginTop = '10px';
  bestScoreEl.style.fontSize = '20px';
  bestScoreEl.style.fontWeight = '500';
  bestScoreEl.textContent = `Лучший результат: ${best} из ${questions.length}`;
  resultEl.after(bestScoreEl);
}

// ==== Перезапуск теста ====
restartBtn.addEventListener('click', () => {
  score = 0;
  currentQuestionIndex = 0;
  resultEl.classList.add('hidden');
  restartBtn.classList.add('hidden');
  questionEl.classList.add('hidden');
  answersEl.classList.add('hidden');
  timerEl.classList.add('hidden');
  questionEl.textContent = '';
  answersEl.innerHTML = '';
  startButton.classList.remove('hidden');
  startParagraph.classList.remove('hidden');

  // Удаляем блок лучшего результата, если есть
  const bestScoreEl = document.getElementById('best-score');
  if (bestScoreEl) bestScoreEl.remove();
});