var scores, roundScore, activePlayer, diceImg, gamePlaying, holdBtn;

diceImg = document.querySelector(".dice");

holdBtn = document.querySelector(".btn-hold");

gamePlaying = true;

// Initial State
function initialGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  diceImg.style.display = "none";

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  // Naming Players
  document.getElementById("name-0").textContent = "PLAYER 1";
  document.getElementById("name-1").textContent = "PLAYER 2";

  // Removing Active class
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
initialGame();

// Switch Player
function switchPlayer() {
  roundScore = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Hiding the Dice on rolling 1
  diceImg.style.display = "none";

  // Switching to active player
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

// Roll Dice
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    var dice;
    dice = Math.floor(Math.random() * 6 + 1);
    document.querySelector("#current-" + activePlayer).textContent = dice;
    diceImg.style.display = "initial";
    diceImg.src = "dice-" + dice + ".png";

    // Adding Score
    if (dice !== 1) {
      // Add Score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Switch to next player

      switchPlayer();
    }
  }
});

// Adding Hold Functionality
holdBtn.addEventListener("click", function () {
  if (gamePlaying) {
    // Add Current Score to Players Global Score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if the Player Won the Game
    var winScore = document.querySelector(".win-score").value;

    if (winScore) {
      winScore = winScore;
    } else {
      winScore = 100;
    }

    if (scores[activePlayer] >= winScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      diceImg.style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");

      gamePlaying = false;
    } else {
      switchPlayer();
    }
  }
});

// Adding New Game Logic
document.querySelector(".btn-new").addEventListener("click", initialGame);
