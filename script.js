'use strict';
const newGame = document.querySelector('.newGame');
const rollDice = document.querySelector('.rollDice');
const hold = document.querySelector('.hold');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

const dice = document.querySelector('.dice');
let score1 = document.querySelector('.current-score1');
let score2 = document.querySelector('.current-score2');

const playerActive = document.querySelector('.player-active');
let currentScore = 0;
let playing = true;
let activePlayer = 1;
let scores = [0, 0];

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`.current-score${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1.classList.toggle('player-active');
  player2.classList.toggle('player-active');
};

rollDice.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6 + 1);
    dice.src = `img/dice-${diceNumber}.png`;
    dice.classList.remove('hidden');
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`.current-score${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer - 1] += currentScore;
    document.querySelector(`.total-score${activePlayer}`).textContent =
      scores[activePlayer - 1];
    currentScore = 0;

    if (scores[activePlayer - 1] > 10) {
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add('player-win');
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove('player-active');
      document.querySelector(`.current-score${activePlayer}`).textContent = 0;
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', function () {
  document
    .querySelector(`.player${activePlayer}`)
    .classList.remove('player-win');
  currentScore = 0;
  scores = [0, 0];
  score1.textContent = 0;
  score2.textContent = 0;
  if (activePlayer === 2) {
    switchPlayer();
  }
  document.querySelector('.total-score1').textContent = 0;
  document.querySelector('.total-score2').textContent = 0;
  playing = true;
  dice.classList.add('hidden');
});
