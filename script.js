const RELATIONSHIP_START = new Date("2026-03-08T00:00:00");

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

const cover = document.getElementById("cover");
const envelopeTarget = document.getElementById("envelopeTarget");
const catchHint = document.getElementById("catchHint");
const catchCounter = document.getElementById("catchCounter");
const mainContent = document.getElementById("mainContent");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const dayCounter = document.getElementById("dayCounter");
const letterBody = document.getElementById("letterBody");
const mailEnvelope = document.getElementById("mailEnvelope");
const quizContainer = document.getElementById("quizContainer");

let catchGoal = 4;
let catchCount = 0;

function moveEnvelope() {
  const zone = cover.querySelector(".catch-zone");
  if (!zone) return;

  const rect = zone.getBoundingClientRect();
  const x = 18 + Math.random() * Math.max(10, rect.width - 110);
  const y = 16 + Math.random() * Math.max(10, rect.height - 110);
  envelopeTarget.style.left = `${x}px`;
  envelopeTarget.style.top = `${y}px`;
}

function revealMainPage() {
  cover.classList.add("hidden");
  mainContent.classList.remove("hidden");
  musicToggle.classList.remove("hidden");
  burstConfetti(120);
  bgMusic.play().catch(() => {});
  musicToggle.textContent = "🎵";
}

envelopeTarget.addEventListener("click", () => {
  catchCount += 1;
  catchCounter.textContent = `${catchCount} / ${catchGoal}`;

  if (catchCount >= catchGoal) {
    envelopeTarget.classList.add("caught");
    catchHint.textContent = "caught you, love 💞";
    setTimeout(revealMainPage, 700);
    return;
  }

  const remaining = catchGoal - catchCount;
  catchHint.textContent = remaining === 1 ? "one more and I’m yours..." : `${remaining} more and I’m yours...`;
  moveEnvelope();
});

function updateDayCounter() {
  const ms = Date.now() - RELATIONSHIP_START.getTime();
  const days = Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
  dayCounter.textContent = days.toLocaleString();
}

updateDayCounter();
setInterval(updateDayCounter, 1000 * 60 * 60);

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

if (mailEnvelope) {
  mailEnvelope.addEventListener("click", () => {
    mailEnvelope.classList.add("hidden");
    mailEnvelope.classList.remove("open");
    letterBody.classList.remove("hidden");
  });

  mailEnvelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      mailEnvelope.click();
    }
  });
}

let quizStep = 0;

function renderQuiz() {
  quizContainer.innerHTML = "";

  if (quizStep >= QUIZ.length) {
    const final = document.createElement("p");
    final.className = "quiz-final";
    final.textContent = "you got everything right, of course you did. happy birthday, love! 🎂";
    quizContainer.appendChild(final);
    return;
  }

  const item = QUIZ[quizStep];
  const card = document.createElement("div");
  card.className = "quiz-card";

  const q = document.createElement("p");
  q.className = "quiz-question";
  q.textContent = item.q;
  card.appendChild(q);

  item.options.forEach((option, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = option;
    btn.addEventListener("click", () => {
      const options = card.querySelectorAll(".quiz-option");
      options.forEach((node) => (node.disabled = true));

      btn.classList.add(idx === item.correct ? "correct" : "wrong");
      if (idx !== item.correct) {
        options[item.correct].classList.add("correct");
      }

      const remark = document.createElement("p");
      remark.className = "quiz-remark";
      remark.textContent = item.remark;
      card.appendChild(remark);

      setTimeout(() => {
        quizStep += 1;
        renderQuiz();
      }, 1500);
    });

    card.appendChild(btn);
  });

  quizContainer.appendChild(card);
}

renderQuiz();

const pages = Array.from(document.querySelectorAll(".page"));
let currentPage = 0;
let touchStartX = 0;

let finalMessageStarted = false;
let finalLineInterval = null;

function revealFinalMessage() {
  if (!document.querySelector(".last-message") || finalMessageStarted) return;

  finalMessageStarted = true;
  const lines = Array.from(document.querySelectorAll(".final-line"));
  if (!lines.length) return;

  let activeIndex = 0;
  const rotate = () => {
    lines.forEach((line, index) => {
      line.classList.toggle("is-visible", index === activeIndex);
    });
    activeIndex = (activeIndex + 1) % lines.length;
  };

  rotate();
  finalLineInterval = setInterval(rotate, 2000);

  const lastMessage = document.querySelector(".last-message");
  if (!lastMessage) return;

  const heartColors = ["💜", "💗", "🩷", "💖"];

  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--dur", `${6 + Math.random() * 4}s`);
    heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 90}px`);
    heart.style.fontSize = `${12 + Math.random() * 16}px`;
    lastMessage.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
  }, 420);
}

function showPage(nextIndex) {
  const safeIndex = Math.max(0, Math.min(nextIndex, pages.length - 1));
  pages.forEach((page, index) => page.classList.toggle("active", index === safeIndex));
  currentPage = safeIndex;

  if (safeIndex === pages.length - 1) {
    revealFinalMessage();
  }
}

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  if (mainContent.classList.contains("hidden")) return;

  const endX = event.changedTouches[0].clientX;
  const delta = endX - touchStartX;

  if (Math.abs(delta) < 40) return;
  if (delta < 0) showPage(currentPage + 1);
  else showPage(currentPage - 1);
}, { passive: true });

document.addEventListener("click", (event) => {
  if (mainContent.classList.contains("hidden")) return;
  if (event.target.closest("button")) return;

  const x = event.clientX;
  if (x < window.innerWidth * 0.46) showPage(currentPage - 1);
  else if (x > window.innerWidth * 0.54) showPage(currentPage + 1);
});

showPage(0);

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let confettiPieces = [];
let animating = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const confettiColors = ["#ffb4d8", "#ffd86b", "#c1477e", "#bfe9d2", "#f9e7ff"];

function burstConfetti(count) {
  for (let i = 0; i < count; i += 1) {
    confettiPieces.push({
      x: canvas.width / 2,
      y: canvas.height * 0.28,
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * -8 - 4,
      size: Math.random() * 6 + 4,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 12,
      life: 0
    });
  }

  if (!animating) {
    animating = true;
    requestAnimationFrame(animateConfetti);
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach((piece) => {
    piece.vy += 0.22;
    piece.x += piece.vx;
    piece.y += piece.vy;
    piece.rotation += piece.spin;
    piece.life += 1;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate((piece.rotation * Math.PI) / 180);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.75);
    ctx.restore();
  });

  confettiPieces = confettiPieces.filter((piece) => piece.y < canvas.height + 30 && piece.life < 220);

  if (confettiPieces.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    animating = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

moveEnvelope();
setInterval(moveEnvelope, 980);
