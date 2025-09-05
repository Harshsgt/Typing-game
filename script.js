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
  