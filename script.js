'use strict';

const hints = document.querySelector('.hints');
const hint1 = document.querySelector('.hint-1');
const hint2 = document.querySelector('.hint-2');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnRules = document.querySelector('.rules');
const title = document.querySelector('.title');
const messageText = document.querySelector('.message');
const scoreText = document.querySelector('.score');
const highscoreText = document.querySelector('.highscore');
const number = document.querySelector('.number');
const guessTable = document.querySelector('.guess');
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
const btnAgain = document.querySelector('.again');
const btnCheck = document.querySelector('.check');
const btnEasy = document.querySelector('.easy');
const btnHard = document.querySelector('.hard');

const displayMessage = message => {
  messageText.textContent = message;
};

scoreText.textContent = 20;

btnCheck.addEventListener('click', () => {
  let guess = Number(guessTable.value);
  console.log(guess);

  if (!guess) {
    displayMessage('There is no number!');
  } else if (guess === secretNumber) {
    title.textContent = 'You have won!';
    displayMessage('Correct Number! ');
    document.querySelector('body').style.backgroundColor = 'rgb(70, 170, 45)';
    number.style.width = '50%';
    number.textContent = secretNumber;
    if (score > highscore) {
      highscore = score;
      highscoreText.textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      scoreText.textContent = score;
    } else {
      title.textContent = 'You have lost!';
      displayMessage('You lost the game!');
      document.querySelector('body').style.backgroundColor = 'rgb(161, 5, 5)';
      scoreText.textContent = 0;
    }
  }
});

btnAgain.addEventListener('click', () => {
  displayMessage('What is your guess?');
  document.querySelector('body').style.backgroundColor = 'rgb(39, 36, 36)';
  title.textContent = 'Guess The Number!';
  number.style.width = '12rem';
  number.textContent = '?';
  guessTable.value = '';
  scoreText.textContent = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  hintOddEven();
  hintDivBy3();
  console.log(secretNumber);
});

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnRules.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnEasy.addEventListener('click', () => {
  btnEasy.classList.add('active');
  btnHard.classList.remove('active');
  hints.classList.remove('hidden');
});

btnHard.addEventListener('click', () => {
  btnHard.classList.add('active');
  btnEasy.classList.remove('active');
  hints.classList.add('hidden');
});

const hintOddEven = () => {
  secretNumber % 2 === 0
    ? (hint1.textContent = 'An even number.')
    : (hint1.textContent = 'An odd number.');
};

hintOddEven();

const hintDivBy3 = () => {
  secretNumber % 3 === 0
    ? (hint2.textContent = 'Number divisible by 3.')
    : (hint2.textContent = 'Number not divisible by 3.');
};

hintDivBy3();
