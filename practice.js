const exercise = document.querySelector('#exercise');
const questions = Array.from(exercise.querySelectorAll('fieldset'));
const result = document.querySelector('#result');
const resetButton = document.querySelector('#reset');

function clearFeedback() {
  result.textContent = '';
  result.classList.remove('is-right');
  for (const question of questions) {
    question.querySelector('.field-feedback').hidden = true;
  }
}

exercise.addEventListener('submit', (event) => {
  event.preventDefault();
  clearFeedback();
  const answers = new FormData(exercise);
  let correctCount = 0;
  let unansweredCount = 0;

  for (const question of questions) {
    const answer = answers.get(question.querySelector('input').name);
    const feedback = question.querySelector('.field-feedback');
    const isCorrect = answer === question.dataset.correct;

    if (!answer) unansweredCount += 1;
    if (isCorrect) correctCount += 1;

    feedback.textContent = answer
      ? question.dataset[isCorrect ? 'right' : 'wrong']
      : 'Выбери один вариант.';
    feedback.classList.toggle('is-right', isCorrect);
    feedback.hidden = false;
  }

  const allCorrect = correctCount === questions.length;
  result.classList.toggle('is-right', allCorrect);
  if (unansweredCount) {
    result.textContent = 'Ответь на оба вопроса, чтобы закончить задание.';
  } else {
    result.textContent = allCorrect
      ? 'Оба ответа верны. Теперь сравни свои уравнения из тетради с разбором.'
      : `Верных ответов: ${correctCount} из ${questions.length}. Подсказки появились рядом с вопросами.`;
  }
  resetButton.hidden = false;
});

exercise.addEventListener('change', () => {
  clearFeedback();
  resetButton.hidden = false;
});

exercise.addEventListener('reset', () => {
  clearFeedback();
  resetButton.hidden = true;
  questions[0].querySelector('input').focus();
});

exercise.hidden = false;
