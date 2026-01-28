// أسئلة التقييم الذاتي التفاعلية
const quizQuestions = [
  {
    question: "ما تعريف الكثافة؟",
    options: ["كتلة وحدة الحجوم", "حجم وحدة الكتلة", "وزن الجسم"],
    answer: 0
  },
  {
    question: "إذا كانت كتلة جسم 200 غم وحجمه 50 سم³، فما كثافته؟",
    options: ["4 غم/سم³", "0.25 غم/سم³", "250 غم/سم³"],
    answer: 0
  },
  {
    question: "لماذا يستقر الزيت فوق الماء؟",
    options: ["لأن كثافته أقل", "لأنه يذوب في الماء", "لأنه أثقل"],
    answer: 0
  },
  {
    question: "كيف يمكن قياس حجم حجر غير منتظم الشكل؟",
    options: ["باستخدام المخبار المدرج وطريقة إزاحة الماء", "بالمسطرة", "لا يمكن قياسه"],
    answer: 0
  },
  {
    question: "اذكر مثالاً من حياتك اليومية يوضح مفهوم الكثافة.",
    options: ["طفو الزيت فوق الماء", "لون السماء", "درجة الحرارة"],
    answer: 0
  }
];

function loadQuiz() {
  const container = document.getElementById("quiz-container");
  quizQuestions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("quiz-question");
    div.style.animation = "fadeInUp 1s ease";
    div.innerHTML = `<p><b>س${index+1}:</b> ${q.question}</p>`;
    q.options.forEach((opt, i) => {
      div.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${i}"> ${opt}
        </label><br>`;
    });
    container.appendChild(div);
  });
}

function submitQuiz() {
  let score = 0;
  quizQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `نتيجتك: ${score} من ${quizQuestions.length}`;
  scoreElement.style.animation = "fadeIn 1s ease";
}

// تحميل الأسئلة عند فتح الصفحة
window.onload = loadQuiz;

// رسالة عند الضغط على زر تسليم الأنشطة
document.querySelectorAll(".activity button").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("📩 سيتم تحويلك إلى نموذج تسليم المهمة. تأكد من إدخال بياناتك كاملة.");
  });
});
