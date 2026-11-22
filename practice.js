for (const exercise of document.querySelectorAll('.exercise')) {
  const questions = Array.from(exercise.querySelectorAll('fieldset'));
  const result = exercise.querySelector('.result');
  const resetButton = exercise.querySelector('button[type="reset"]');

  function clearFeedback() {
    result.textContent = '';
    result.classList.remove('is-right');
    for (const question of questions) {
      question.querySelector('.field-feedback').hidden = true;
    }
  }

  exercise.addEventListener('submit', (event) => {
    event.preventDefault();
    const answers = new FormData(exercise);
    let correctCount = 0;
    let unansweredCount = 0;

    for (const question of questions) {
      const input = question.querySelector('input');
      const answer = answers.get(input.name)?.trim();
      const feedback = question.querySelector('.field-feedback');
      const isCorrect = answer === question.dataset.correct;

      if (!answer) {
        unansweredCount += 1;
        feedback.textContent = input.type === 'radio' ? 'Выбери один вариант.' : 'Впиши коэффициент.';
      } else {
        if (isCorrect) correctCount += 1;
        feedback.textContent = question.dataset[isCorrect ? 'right' : 'wrong'];
      }
      feedback.classList.toggle('is-right', isCorrect);
      feedback.hidden = false;
    }

    const allCorrect = correctCount === questions.length;
    result.classList.toggle('is-right', allCorrect);
    if (unansweredCount) {
      result.textContent = 'Ответь на оба вопроса, чтобы закончить задание.';
    } else {
      result.textContent = allCorrect
        ? 'Оба ответа верны. Можешь свериться с разбором.'
        : `Верных ответов: ${correctCount} из ${questions.length}. Подсказки появились рядом с вопросами.`;
    }
    resetButton.hidden = false;
  });

  exercise.addEventListener('input', () => {
    clearFeedback();
    resetButton.hidden = false;
  });

  exercise.addEventListener('reset', () => {
    clearFeedback();
    resetButton.hidden = true;
    questions[0].querySelector('input').focus();
  });

  exercise.hidden = false;
}
