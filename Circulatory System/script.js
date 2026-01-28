/* تنقل الهيدر بين الأقسام */
document.addEventListener('DOMContentLoaded', ()=>{
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = btn.getAttribute('data-target');
      const section = document.querySelector(target);
      if(section){
        section.scrollIntoView({behavior:'smooth', block:'start'});
        navButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });
});

/* البطاقات المنبثقة للمخطط المفاهيمي */
function showCard(part){
  const modal = document.getElementById(`card-${part}`);
  if(!modal) return;
  modal.setAttribute('aria-hidden','false');

  // إغلاق عند الضغط خارج المحتوى
  const onBackdrop = (e)=>{ if(e.target===modal) closeCard(part); };
  modal.addEventListener('click', onBackdrop, {once:true});

  // إغلاق عبر زر الهروب
  const onKey = (e)=>{ if(e.key==='Escape') closeCard(part); };
  document.addEventListener('keydown', onKey, {once:true});
}
function closeCard(part){
  const modal = document.getElementById(`card-${part}`);
  if(modal) modal.setAttribute('aria-hidden','true');
}

/* نظام التقييم الذاتي */
let totalQuestions = document.querySelectorAll('.quiz-item').length;
let answeredCount = 0;
let correctCount = 0;
let wrongCount = 0;

function updateScoreboard(){
  document.getElementById('score-correct').textContent = correctCount;
  document.getElementById('score-wrong').textContent = wrongCount;
  document.getElementById('score-remaining').textContent = totalQuestions - answeredCount;
}

function lockQuestion(container){
  container.querySelectorAll('.answer').forEach(btn=>btn.setAttribute('disabled','true'));
}

function showFinal(){
  const final = document.getElementById('final-result');
  const badge = document.getElementById('final-badge');
  const text = document.getElementById('final-text');

  badge.textContent = `${correctCount}/${totalQuestions}`;

  if(correctCount === totalQuestions){
    text.textContent = "ممتاز! كل إجاباتك صحيحة 👏";
  }else if(correctCount >= Math.ceil(totalQuestions*0.75)){
    text.textContent = "رائع! أداء قوي 🎯";
  }else if(correctCount >= Math.ceil(totalQuestions*0.5)){
    text.textContent = "جيد! يمكنك التحسن بمراجعة الدرس 💪";
  }else{
    text.textContent = "أعد قراءة الدرس وجرب مرة أخرى 🌱";
  }

  final.hidden = false;
}

/* التعامل مع الإجابات */
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.answer');
  if(!btn) return;

  const container = btn.closest('.quiz-item');
  const feedback = container.querySelector('.feedback');

  // منع إعادة الإجابة على نفس السؤال
  const alreadyLocked = container.querySelector('.answer[disabled]');
  if(alreadyLocked) return;

  const isCorrect = btn.dataset.correct === 'true';

  // تعليم الاختيار بصريًا
  btn.classList.add('selected');
  btn.classList.add(isCorrect ? 'correct' : 'wrong');

  if(isCorrect){
    feedback.textContent = "✔️ إجابة صحيحة! أحسنت 🎉";
    feedback.className = "feedback correct";
    correctCount++;
  }else{
    feedback.textContent = "❌ إجابة خاطئة.";
    feedback.className = "feedback wrong";
    wrongCount++;
  }

  answeredCount++;
  lockQuestion(container);
  updateScoreboard();

  if(answeredCount >= totalQuestions){
    showFinal();
  }
});

/* إعادة التقييم */
function resetQuiz(){
  answeredCount = 0; correctCount = 0; wrongCount = 0;
  updateScoreboard();

  document.querySelectorAll('.quiz-item').forEach(item=>{
    item.querySelectorAll('.answer').forEach(btn=>{
      btn.removeAttribute('disabled');
      btn.classList.remove('selected','correct','wrong');
    });
    const fb = item.querySelector('.feedback');
    if(fb){ fb.textContent = ""; fb.className = "feedback"; }
  });

  const final = document.getElementById('final-result');
  if(final) final.hidden = true;

  const quiz = document.getElementById('section-quiz');
  if(quiz) quiz.scrollIntoView({behavior:'smooth', block:'start'});
}

/* تهيئة أولية */
document.addEventListener('DOMContentLoaded', updateScoreboard);
