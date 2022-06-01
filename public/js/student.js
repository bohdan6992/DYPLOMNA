const formEl = document.querySelector('form');
const answEl = document.querySelector('.answer-mark');
const startBtn = document.querySelector('.button-click');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const url = window.location.pathname.split('/');
  const data = new FormData(formEl);
  data.set('id', url[3]);
  axios
    .post('/class/student/:id', data)
    .then((r) => {
      answEl.innerHTML = r.data;
    })
    .catch((error) => {
      console.log(error);
    });
});

const allRanges = document.querySelectorAll(".add-marks");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;
}
