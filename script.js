const RELATIONSHIP_START = new Date("2026-03-08T00:00:00");

const QUIZ = [
  {
    q: "When did we officially become a couple?",
    options: ["March 8", "April 1 (nice try)", "Some random Tuesday"],
    correct: 0,
    remark: "Correckong😌",
    wrongRemark: "Excuse me?! Nakalimutan nya😂"
  },
  {
    q: "What do I call you?",
    options: ["Bes", "Love", "Ma'am"],
    correct: 1,
    remark: "Obviously.",
    wrongRemark: "Ma'am?! Bes?! Try again, you know what I call you. 😭"
  },
  {
    q: "What's the correct answer to \"do you miss me?\"",
    options: ["A little", "Not really", "Every second of every day"],
    correct: 2,
    remark: "Weehhhh 🥰",
    wrongRemark: "Kawawa naman pala ako😭"
  },
  {
    q: "When is my birthday?",
    options: ["January 2", "February 14", "December 25"],
    correct: 0,
    remark: "Waw naalala nyaa",
    wrongRemark: "Kaninong birthday??😒"
  },
  {
    q: "Where did we meet?",
    options: ["Panaginip", "DHSUD", "Mars"],
    correct: 1,
    remark: "DHSUD syempree! 🥰",
    wrongRemark: "Wana na, nakalimutan na😂"
  },
  {
    q: "Do you love me?",
    options: ["Yes", "Ofcourse", "Syempre"],
    correct: [0, 1, 2],
    remark: "Correct. Every answer is correct because you better love me. 😌💗",
    wrongRemark: "There is no wrong answer here... wala kang pinili. 😂"
  }
];

const QUIZ_GIFS = {
  default: "images/cute-bear.webp",
  correct: "images/happy-bear.gif",
  incorrect: "images/sad-bear.gif"
};

const cover = document.getElementById("cover");
const presentTarget = document.getElementById("presentTarget");
const catchHint = document.getElementById("catchHint");
const mainContent = document.getElementById("mainContent");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const dayCounter = document.getElementById("dayCounter");
const letterBody = document.getElementById("letterBody");
const mailEnvelope = document.getElementById("mailEnvelope");
const quizContainer = document.getElementById("quizContainer");
const quizGifCard = document.getElementById("quizGifCard");
const quizGif = document.getElementById("quizGif");
const slideshowImage = document.getElementById("slideshowImage");
const slideshowCaption = document.getElementById("slideshowCaption");

let catchGoal = 5;
let catchCount = 0;

function createLetterBodyHearts() {
  if (!letterBody) return;

  for (let index = 0; index < 8; index += 1) {
    const heart = document.createElement("span");
    const edge = Math.floor(Math.random() * 4);
    const position = 8 + Math.random() * 84;
    const offset = -(4 + Math.random() * 14);

    heart.className = "floating-heart letter-body-heart";
    heart.textContent = "♡";
    heart.setAttribute("aria-hidden", "true");
    heart.style.fontSize = `${1.2 + Math.random() * 1.1}rem`;
    heart.style.opacity = `${0.45 + Math.random() * 0.4}`;
    heart.style.animationDelay = `${Math.random() * 2.5}s`;

    if (edge === 0) {
      heart.style.left = `${offset}px`;
      heart.style.top = `${position}%`;
    } else if (edge === 1) {
      heart.style.right = `${offset}px`;
      heart.style.top = `${position}%`;
    } else if (edge === 2) {
      heart.style.left = `${position}%`;
      heart.style.top = `${offset}px`;
    } else {
      heart.style.left = `${position}%`;
      heart.style.bottom = `${offset}px`;
    }

    letterBody.appendChild(heart);
  }
}

createLetterBodyHearts();

function revealMainPage() {
  cover.classList.add("hidden");
  mainContent.classList.remove("hidden");
  burstConfetti(120);
  bgMusic.play().catch(() => {});
  musicToggle.textContent = "🎵";
}

function tapPresent() {
  catchCount += 1;
  presentTarget.style.setProperty("--shake-strength", `${catchCount * 2}px`);
  presentTarget.style.setProperty("--shake-small", `${catchCount * 1.4}px`);
  presentTarget.classList.remove("shaking");
  void presentTarget.offsetWidth;
  presentTarget.classList.add("shaking");

  if (catchCount >= catchGoal) {
    presentTarget.classList.add("opened");
    catchHint.textContent = "Happy birthday, love! 💞";
    burstConfetti(140);
    setTimeout(revealMainPage, 1100);
    return;
  }

  const remaining = catchGoal - catchCount;
  catchHint.textContent = remaining === 1 ? "one more tap..." : `${remaining} more taps...`;
}

presentTarget.addEventListener("click", tapPresent);
presentTarget.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    tapPresent();
  }
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
  mailEnvelope.addEventListener("click", (event) => {
    event.stopPropagation();
    if (mailEnvelope.classList.contains("opening")) return;

    mailEnvelope.classList.add("opening", "open");
    setTimeout(() => {
      mailEnvelope.classList.add("hidden");
      letterBody.classList.remove("hidden");
    }, 1250);
  });

  mailEnvelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      mailEnvelope.click();
    }
  });
}

document.querySelectorAll(".polaroid").forEach((photo) => {
  photo.setAttribute("tabindex", "0");
  photo.setAttribute("role", "button");
  photo.setAttribute("aria-label", `${photo.querySelector("img")?.alt || "Photo"}. Tap to enlarge`);
  let galleryPlaceholder = null;

  const togglePhotoSize = (event) => {
    event.stopPropagation();
    const isExpanded = photo.classList.toggle("is-expanded");

    if (isExpanded) {
      galleryPlaceholder = document.createComment("expanded photo position");
      photo.replaceWith(galleryPlaceholder);
      document.body.appendChild(photo);
      requestAnimationFrame(() => photo.classList.add("is-visible"));
    } else if (galleryPlaceholder) {
      photo.classList.remove("is-visible");
      galleryPlaceholder.replaceWith(photo);
      galleryPlaceholder = null;
    }

    photo.setAttribute("aria-pressed", isExpanded);
  };

  photo.addEventListener("click", togglePhotoSize);
  photo.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePhotoSize(event);
    }
  });
});

const slideshowPhotos = Array.from(document.querySelectorAll(".polaroid img")).map((image) => ({
  src: image.getAttribute("src"),
  alt: image.getAttribute("alt") || "A memory of us",
  caption: image.parentElement.querySelector("figcaption")?.textContent || "A memory of us"
}));
let slideshowIndex = 0;
let slideshowTimer = null;

function showSlideshowPhoto(index) {
  if (!slideshowPhotos.length || !slideshowImage) return;

  slideshowIndex = (index + slideshowPhotos.length) % slideshowPhotos.length;
  const photo = slideshowPhotos[slideshowIndex];
  slideshowImage.src = photo.src;
  slideshowImage.alt = photo.alt;
  slideshowCaption.textContent = photo.caption;
}

function startSlideshow() {
  if (slideshowTimer || slideshowPhotos.length < 2) return;

  slideshowTimer = setInterval(() => showSlideshowPhoto(slideshowIndex + 1), 3500);
}

if (slideshowPhotos.length) {
  showSlideshowPhoto(0);
  startSlideshow();
}

let quizStep = 0;

function setQuizGif(type) {
  if (!quizGifCard || !quizGif) return;

  const source = QUIZ_GIFS[type] || "";
  quizGif.src = source;
  quizGifCard.classList.toggle("is-empty", !source);
  quizGifCard.classList.remove("gif-placeholder");
}

function isQuizComplete() {
  return quizStep >= QUIZ.length;
}

function renderQuiz() {
  quizContainer.innerHTML = "";
  setQuizGif("default");

  if (isQuizComplete()) {
    const final = document.createElement("p");
    final.className = "quiz-final";
    final.textContent = "you got everything right, of course you did. Palagi kanaman tama 😒. happy birthday, love! 🎂";
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
      const correctAnswers = Array.isArray(item.correct) ? item.correct : [item.correct];
      const isCorrect = correctAnswers.includes(idx);
      setQuizGif(isCorrect ? "correct" : "incorrect");

      btn.classList.add(isCorrect ? "correct" : "wrong");
      if (!isCorrect && correctAnswers.length === 1) {
        options[correctAnswers[0]].classList.add("correct");
      }

      const remark = document.createElement("p");
      remark.className = "quiz-remark";
      remark.textContent = isCorrect ? item.remark : item.wrongRemark;
      card.appendChild(remark);

      setTimeout(() => {
        if (isCorrect) quizStep += 1;
        renderQuiz();
      }, isCorrect ? 3200 : 2800);
    });

    card.appendChild(btn);
  });

  quizContainer.appendChild(card);
}

renderQuiz();

const pages = Array.from(document.querySelectorAll(".page"));
let currentPage = 0;
let touchStartX = 0;
let touchStartY = 0;
const navigationZoneTop = 0.72;

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

function canNavigate() {
  return currentPage !== 3 || isQuizComplete();
}

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  if (mainContent.classList.contains("hidden")) return;
  if (touchStartY < window.innerHeight * navigationZoneTop) return;

  const endX = event.changedTouches[0].clientX;
  const endY = event.changedTouches[0].clientY;
  const delta = endX - touchStartX;

  if (endY < window.innerHeight * navigationZoneTop) return;
  if (Math.abs(delta) < 40) return;
  if (!canNavigate() && delta < 0) return;
  if (delta < 0) showPage(currentPage + 1);
  else showPage(currentPage - 1);
}, { passive: true });

document.addEventListener("click", (event) => {
  if (mainContent.classList.contains("hidden")) return;
  if (event.target.closest("button")) return;
  if (event.clientY < window.innerHeight * navigationZoneTop) return;

  const x = event.clientX;
  if (x < window.innerWidth * 0.46) showPage(currentPage - 1);
  else if (x > window.innerWidth * 0.54 && canNavigate()) showPage(currentPage + 1);
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

