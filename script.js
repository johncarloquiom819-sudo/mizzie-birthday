/* =========================================================
   EDIT ME — customize these three things freely
   ========================================================= */

// The date you two officially became a couple (YYYY-MM-DD)
const RELATIONSHIP_START = new Date("2026-03-08T00:00:00");

// Reasons that show up when she taps "give me a reason"
const REASONS = [
  "because you laugh at your own jokes before you even finish telling them — and somehow that makes them funnier.",
  "because you still check in on me even after a full, exhausting shift at work.",
  "because your voice notes are the best part of my day, every single day.",
  "because you argue with me about the dumbest things and somehow still win.",
  "because being apart made us better at talking to each other, not worse.",
  "because you make me want to be a better version of myself.",
  "because you never let me win at anything, not even card games over video call.",
  "because your \"good morning\" text is basically my alarm clock now.",
  "because even months and thousands of kilometers apart couldn't make me miss you any less — if anything, more.",
  "because it's you. it's always going to be you."
];

// Mini quiz — edit the questions, options, and which index (0,1,2) is correct
const QUIZ = [
  {
    q: "When did we officially become a couple?",
    options: ["March 8", "April 1 (nice try)", "Some random Tuesday"],
    correct: 0,
    remark: "as if you'd forget. 😌"
  },
  {
    q: "What do I call you?",
    options: ["Bes", "Love", "Ma'am"],
    correct: 1,
    remark: "obviously."
  },
  {
    q: "What's the correct answer to \"do you miss me?\"",
    options: ["A little", "Not really", "Every second of every day"],
    correct: 2,
    remark: "correct answer, always."
  }
];

/* =========================================================
   Below this line: the site logic. Safe to leave as-is.
   ========================================================= */

const cover = document.getElementById("cover");
const envelopeBtn = document.getElementById("envelopeBtn");
const mainContent = document.getElementById("mainContent");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const dayCounter = document.getElementById("dayCounter");
const reasonBtn = document.getElementById("reasonBtn");
const reasonText = document.getElementById("reasonText");
const letterToggle = document.getElementById("letterToggle");
const letterBody = document.getElementById("letterBody");
const quizContainer = document.getElementById("quizContainer");

/* ---------- Cover open ---------- */
envelopeBtn.addEventListener("click", () => {
  cover.classList.add("hidden");
  mainContent.classList.remove("hidden");
  musicToggle.classList.remove("hidden");
  burstConfetti(120);
  bgMusic.play().catch(() => {
    // autoplay blocked — she can still tap the music button
  });
  musicToggle.textContent = "🎵";
}, { once: true });

/* ---------- Music toggle ---------- */
let isPlaying = true;
musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.textContent = "🔇";
  } else {
    bgMusic.play().catch(() => {});
    musicToggle.textContent = "🎵";
  }
  isPlaying = !isPlaying;
});

/* ---------- Day counter ---------- */
function updateDayCounter() {
  const ms = Date.now() - RELATIONSHIP_START.getTime();
  const days = Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
  dayCounter.textContent = days.toLocaleString();
}
updateDayCounter();
setInterval(updateDayCounter, 1000 * 60 * 60);

/* ---------- Reasons shuffler ---------- */
let lastReasonIndex = -1;
reasonBtn.addEventListener("click", () => {
  let i;
  do {
    i = Math.floor(Math.random() * REASONS.length);
  } while (i === lastReasonIndex && REASONS.length > 1);
  lastReasonIndex = i;
  reasonText.textContent = REASONS[i];
  burstConfetti(40);
});

/* ---------- Letter unfold ---------- */
letterToggle.addEventListener("click", () => {
  const opening = letterBody.classList.contains("hidden");
  letterBody.classList.toggle("hidden");
  letterToggle.textContent = opening ? "fold it back up" : "unfold my letter 💌";
});

/* ---------- Quiz ---------- */
let quizStep = 0;

function renderQuiz() {
  quizContainer.innerHTML = "";

  if (quizStep >= QUIZ.length) {
    const done = document.createElement("p");
    done.className = "quiz-final";
    done.textContent = "you got everything right, of course you did — you're literally living it. happy birthday, love! 🎂";
    quizContainer.appendChild(done);
    return;
  }

  const item = QUIZ[quizStep];
  const card = document.createElement("div");
  card.className = "quiz-card";

  const q = document.createElement("p");
  q.className = "quiz-question";
  q.textContent = item.q;
  card.appendChild(q);

  item.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      const buttons = card.querySelectorAll(".quiz-option");
      buttons.forEach((b) => (b.disabled = true));
      btn.classList.add(idx === item.correct ? "correct" : "wrong");
      if (idx !== item.correct) {
        buttons[item.correct].classList.add("correct");
      }
      const remark = document.createElement("p");
      remark.className = "quiz-remark";
      remark.textContent = item.remark;
      card.appendChild(remark);

      setTimeout(() => {
        quizStep += 1;
        renderQuiz();
      }, 1400);
    });
    card.appendChild(btn);
  });

  quizContainer.appendChild(card);
}
renderQuiz();

/* ---------- Confetti (lightweight canvas burst) ---------- */
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confettiPieces = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const CONFETTI_COLORS = ["#C6486B", "#FFD166", "#F6C9D0", "#B8C9A8"];

function burstConfetti(count) {
  for (let n = 0; n < count; n++) {
    confettiPieces.push({
      x: canvas.width / 2,
      y: canvas.height * 0.3,
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * -8 - 4,
      size: Math.random() * 6 + 4,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 10,
      life: 0
    });
  }
  if (!animating) {
    animating = true;
    requestAnimationFrame(animateConfetti);
  }
}

let animating = false;
function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach((p) => {
    p.vy += 0.25; // gravity
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.spin;
    p.life += 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  });

  confettiPieces = confettiPieces.filter((p) => p.y < canvas.height + 40 && p.life < 220);

  if (confettiPieces.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    animating = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
