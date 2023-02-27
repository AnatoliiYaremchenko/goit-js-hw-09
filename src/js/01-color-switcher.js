
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeBackgroundColor = event => {
  event.currentTarget.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');

  timerId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
};

startBtn.addEventListener('click', changeBackgroundColor);

const stopChangeBackgroundColor = event => {
  event.currentTarget.setAttribute('disabled', 'disabled');
  startBtn.removeAttribute('disabled');
  clearInterval(timerId);
};

stopBtn.addEventListener('click', stopChangeBackgroundColor);
