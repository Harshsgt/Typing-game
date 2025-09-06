const paragraphs = {
    easy: [
      "The cat sits on the mat.",
      "Dogs bark loudly at night."
    ],
    medium: [
      "Typing games improve focus and accuracy.",
      "JavaScript allows us to create interactive pages."
    ],
    hard: [
      "Programming requires patience, practice, and persistence.",
      "Synchronous and asynchronous code run differently in JavaScript."
    ]
  };
  
  let currentPara = "";
  let playerTurn = 1;
  let timer = 30;
  let interval;
  let results = {};
  let players = {};
  let soundEnabled = true;
  
  // Elements
  const startScreen = document.getElementById("startScreen");
  const gameScreen = document.getElementById("gameScreen");
  const resultScreen = document.getElementById("resultScreen");
  const input = document.getElementById("input");
  const paragraphDiv = document.getElementById("paragraph");
  const timerDiv = document.getElementById("timer");
  const leaderboard = document.getElementById("leaderboard");
  const turn = document.getElementById("turn");
  const progressBar = document.getElementById("progressBar");
  const difficultySelect = document.getElementById("difficulty");
  
  // Sounds
  const typeSound = document.getElementById("typeSound");
  const errorSound = document.getElementById("errorSound");
  const buzzerSound = document.getElementById("buzzerSound");
  const winSound = document.getElementById("winSound");
// Buttons
document.getElementById("startBtn").addEventListener("click", () => {
  const p1 = document.getElementById("player1").value || "Player 1";
  const p2 = document.getElementById("player2").value || "Player 2";
  players = { 1: p1, 2: p2 };
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  startGame();
});

document.getElementById("restartBtn").addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  results = {};
  playerTurn = 1;
});

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    document.getElementById("themeToggle").textContent = "☀️ Light";
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    document.getElementById("themeToggle").textContent = "🌙 Dark";
  }
});

// Sound toggle
document.getElementById("soundToggle").addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  document.getElementById("soundToggle").textContent = soundEnabled ? "🔊 Sound On" : "🔇 Sound Off";
});

function playSound(sound) {
  if (soundEnabled) {
    sound.currentTime = 0;
    sound.play();
  }
}

function startGame() {
  nextTurn();
}

function nextTurn() {
  input.value = "";
  input.disabled = false;
  const diff = difficultySelect.value;
  const paraList = paragraphs[diff];
  currentPara = paraList[Math.floor(Math.random() * paraList.length)];
  renderParagraph();
  turn.textContent = `${players[playerTurn]}'s Turn`;
  timer = 30;
  timerDiv.textContent = `⏳ ${timer}s`;
  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
}

function renderParagraph() {
  paragraphDiv.innerHTML = "";
  currentPara.split("").forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
    paragraphDiv.appendChild(span);
  });
}

function updateTimer() {
  timer--;
  timerDiv.textContent = `⏳ ${timer}s`;
  if (timer <= 0) {
    clearInterval(interval);
    playSound(buzzerSound);
    input.disabled = true;
    calculateResult();
    if (playerTurn === 1) {
      playerTurn = 2;
      setTimeout(nextTurn, 1500);
    } else {
      showLeaderboard();
    }
  }
}

input.addEventListener("input", () => {
  const spans = paragraphDiv.querySelectorAll("span");
  const typed = input.value.split("");
  let correctChars = 0;
  typed.forEach((char, idx) => {
    if (spans[idx]) {
      if (char === spans[idx].textContent) {
        spans[idx].classList.add("correct");
        spans[idx].classList.remove("incorrect");
        correctChars++;
        playSound(typeSound);
      } else {
        spans[idx].classList.add("incorrect");
        spans[idx].classList.remove("correct");
        playSound(errorSound);
      }
    }
  });
  const progress = (typed.length / currentPara.length) * 100;
  progressBar.style.width = `${progress}%`;
});

function calculateResult() {
  const typed = input.value.trim();
  const words = typed.split(" ").length;
  const wpm = Math.round(words / 0.5);
  const correctChars = [...typed].filter((c, i) => c === currentPara[i]).length;
  const accuracy = Math.round((correctChars / currentPara.length) * 100);
  results[`Player${playerTurn}`] = { name: players[playerTurn], wpm, accuracy };
}

function showLeaderboard() {
  gameScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const p1 = results.Player1;
  const p2 = results.Player2;
  let winner = "Draw";
  if (p1.wpm > p2.wpm) winner = p1.name + " 🎉";
  else if (p2.wpm > p1.wpm) winner = p2.name + " 🎉";

  leaderboard.innerHTML = `
    <p>${p1.name} → WPM: ${p1.wpm}, Accuracy: ${p1.accuracy}%</p>
    <p>${p2.name} → WPM: ${p2.wpm}, Accuracy: ${p2.accuracy}%</p>
    <h3>Winner: ${winner}</h3>
  `;
  playSound(winSound);
  startConfetti();
}

// 🎉 Confetti
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
let confettiPieces = [];

function startConfetti() {
  confettiPieces = Array.from({ length: 200 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 0.5 + 0.5,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`
  }));
  requestAnimationFrame(drawConfetti);
}
