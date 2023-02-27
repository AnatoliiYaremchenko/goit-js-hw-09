
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputRef = document.querySelector('input[type="text"]');
const btnRef = document.querySelector('button[data-start]');
let timeLeftToDate = 0;

btnRef.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnRef.removeAttribute('disabled', 'disabled');
    }

    timeLeftToDate = selectedDates[0] - new Date();
    timeCounter(timeLeftToDate);
  },
};

flatpickr(inputRef, options);

function timeCounter(time) {
  timeLeftToDate = time - 1000;

  convertMs(timeLeftToDate);
}

btnRef.addEventListener('click', event => {
  btnRef.setAttribute('disabled', 'disabled');

  let timerId = setInterval(() => {
    timeCounter(timeLeftToDate);
    const Obj = convertMs(timeLeftToDate);
    const dataObj = addLeadingZero(Obj);
    for (let key in dataObj) {
      const spanEl = (document.querySelector(
        `span[data-${key}]`
      ).textContent = `${dataObj[key]}`);
    }
  }, 1000);

  if (timeLeftToDate === 0) {
    clearInterval(timerId);
    return;
  }
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(obj) {
  for (let key in obj) {
    obj[key] = String(obj[key]).padStart(2, 0);
  }

  return obj;
};