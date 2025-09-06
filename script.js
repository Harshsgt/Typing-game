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