const screens = [...document.querySelectorAll(".screen")];
const storyText = document.getElementById("storyText");
const storyEmoji = document.getElementById("storyEmoji");
const progressBar = document.getElementById("progressBar");
const maybeBtn = document.getElementById("maybeBtn");

const story = [
  ["Moon Stone, desde que você apareceu...", "🌹"],
  ["Moon Stone, algumas coisas começaram a ficar mais bonitas.", "✨"],
  ["Eu comecei a sorrir só de lembrar de você, Moon Stone.", "😊"],
  ["E percebi que não queria guardar isso só para mim, então resolvi te perguntar.", "❤️"]
];

let storyIndex = 0;

function show(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({top: 0, behavior: "smooth"});
}

document.getElementById("startBtn").addEventListener("click", () => {
  storyIndex = 0;
  updateStory();
  show("story");
});

function updateStory() {
  storyText.textContent = story[storyIndex][0];
  storyEmoji.textContent = story[storyIndex][1];
  progressBar.style.width = `${((storyIndex + 1) / story.length) * 100}%`;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  storyIndex++;
  if (storyIndex >= story.length) {
    show("letter");
  } else {
    updateStory();
  }
});

document.getElementById("askBtn").addEventListener("click", () => {
  show("question");
});

maybeBtn.addEventListener("mouseenter", moveMaybe);
maybeBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveMaybe();
}, {passive:false});

function moveMaybe() {
  const padding = 20;
  const maxX = Math.max(80, window.innerWidth - maybeBtn.offsetWidth - padding * 2);
  const maxY = Math.max(80, window.innerHeight - maybeBtn.offsetHeight - padding * 2);
  maybeBtn.style.position = "fixed";
  maybeBtn.style.left = `${padding + Math.random() * maxX}px`;
  maybeBtn.style.top = `${padding + Math.random() * maxY}px`;
  maybeBtn.style.zIndex = "50";
}

document.getElementById("yesBtn").addEventListener("click", () => {
  show("success");
  burstConfetti();
});

function burstConfetti() {
  const container = document.getElementById("confetti");
  for (let i = 0; i < 90; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.setProperty("--x", `${(Math.random() - .5) * 260}px`);
    piece.style.animationDelay = `${Math.random() * .7}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.textContent = Math.random() > .5 ? "♥" : "✦";
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

function createHeart() {
  const h = document.createElement("span");
  h.className = "floating-heart";
  h.textContent = Math.random() > .35 ? "♥" : "♡";
  h.style.left = `${Math.random() * 100}%`;
  h.style.fontSize = `${12 + Math.random() * 22}px`;
  h.style.animationDuration = `${5 + Math.random() * 7}s`;
  document.querySelector(".hearts").appendChild(h);
  setTimeout(() => h.remove(), 13000);
}

setInterval(createHeart, 700);
