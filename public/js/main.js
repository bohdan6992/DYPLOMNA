const formEl = document.querySelector('form');
const answEl = document.querySelector('.answer');
const startBtn = document.querySelector('.button-click');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(formEl);
  console.log(window.location);
  
  axios
    .post('/admin/create', data)
    .then((r) => {
      answEl.innerHTML = r.data;
    })
    .catch((error) => {
      console.log(error);
    });
});

startBtn.addEventListener('click', () => {
  answEl.style.display = 'block';
});
