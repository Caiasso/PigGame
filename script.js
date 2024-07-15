'use strict';

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.getElementById(`score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);

const scores = [0, 0];
const limitScore = 20;
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function () {
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--active`);
  player0El.classList.add(`player--active`);

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add(`hidden`);

  scores[0] = 0;
  scores[1] = 0;

  currentScore = 0;

  activePlayer = 0;

  playing = true;
};

const switchPlayers = function () {
  if (playing) {
    document.body.style.backgroundImage =
      activePlayer === 1
        ? `linear-gradient(to top left, #753682 0%, #bf2e34 100%)`
        : `linear-gradient(to bottom right, #753682 0%, #bf2e34 100%)`;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
  }
};

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= limitScore) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add(`hidden`);
      playing = false;
    } else {
      switchPlayers();
    }
  }
});

btnNew.addEventListener(`click`, init);
