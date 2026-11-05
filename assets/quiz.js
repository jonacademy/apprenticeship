
(function(){
  const quiz = document.querySelector('[data-quiz]');
  if (!quiz) return;
  const questions = Array.from(quiz.querySelectorAll('.question'));
  const result = quiz.querySelector('.quiz-result');
  const scoreNode = quiz.querySelector('[data-score]');
  const reset = quiz.querySelector('[data-reset]');
  let answered = 0;
  let score = 0;

  questions.forEach((question) => {
    const options = Array.from(question.querySelectorAll('.option'));
    const feedback = question.querySelector('.feedback');
    options.forEach((option) => {
      option.addEventListener('click', () => {
        if (question.dataset.answered === 'true') return;
        question.dataset.answered = 'true';
        answered += 1;
        const isCorrect = option.dataset.correct === 'true';
        if (isCorrect) score += 1;
        options.forEach((btn) => {
          btn.disabled = true;
          if (btn.dataset.correct === 'true') btn.classList.add('correct');
        });
        if (!isCorrect) option.classList.add('incorrect');
        feedback.textContent = option.dataset.feedback || '';
        feedback.classList.add('show');
        feedback.setAttribute('role', 'status');
        if (answered === questions.length) {
          scoreNode.textContent = score + ' out of ' + questions.length;
          result.classList.add('show');
          result.scrollIntoView({behavior:'smooth', block:'nearest'});
        }
      });
    });
  });

  reset.addEventListener('click', () => {
    answered = 0; score = 0;
    questions.forEach((question) => {
      question.dataset.answered = 'false';
      question.querySelectorAll('.option').forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove('correct','incorrect');
      });
      const feedback = question.querySelector('.feedback');
      feedback.classList.remove('show');
      feedback.textContent = '';
    });
    result.classList.remove('show');
    quiz.scrollIntoView({behavior:'smooth', block:'start'});
  });
})();
