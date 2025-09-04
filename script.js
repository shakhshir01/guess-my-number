'use strict';

// ==============================
// Game State
// ==============================
let secretNumber;
let score;
let highScore = 0;

// ==============================
// Utility Functions
// ==============================

const setMessage = (message) =>
  (document.querySelector('.message').textContent = message);

const setScore = (newScore) =>
  (document.querySelector('.score').textContent = newScore);

const setNumber = (value) =>
  (document.querySelector('.number').textContent = value);

const setBackground = (color) =>
  (document.querySelector('body').style.backgroundColor = color);

const setNumberWidth = (width) =>
  (document.querySelector('.number').style.width = width);

const getGuess = () =>
  Number(document.querySelector('.guess').value.trim());

// ==============================
// Game Logic
// ==============================

function initGame() {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  setMessage('Start guessing...');
  setScore(score);
  setNumber('?');
  document.querySelector('.guess').value = '';
  setBackground('#222');
  setNumberWidth('15rem');
}

function checkGuess() {
  const guess = getGuess();

  // No input
  if (!document.querySelector('.guess').value.trim()) {
    return setMessage('Please enter a number 😞');
  }

  // Invalid input
  if (isNaN(guess)) {
    return setMessage('Please enter a valid number 😞');
  }

  // Out of range
  if (guess < 1 || guess > 20) {
    return setMessage('Enter a number between 1 and 20 only.');
  }

  // Correct guess
  if (guess === secretNumber) {
    setMessage('🎊 Correct Number!');
    setNumber(secretNumber);
    setBackground('#60b347');
    setNumberWidth('30rem');

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    return;
  }

  // Wrong guess
  setMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
  score--;
  setScore(score);

  if (score <= 0) {
    setMessage('💥 You lost the game!');
    setNumber(secretNumber);
    setBackground('#b34747');
  }
}

// ==============================
// Event Listeners
// ==============================

document.querySelector('.check').addEventListener('click', checkGuess);
document.querySelector('.again').addEventListener('click', initGame);

// Start game for the first time
initGame();
