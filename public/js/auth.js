const formEl = document.querySelector('form');
const answEl = document.querySelector('.answer');
const startBtn = document.querySelector('.button-click');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(formEl);
  let url = window.location.pathname.split('/');
  if (url[2] === 'registration') {
    url = '/auth/registration' 
  } 
  if (url[2] === 'login') {
    url = '/auth/login' 
  }
  axios
    .post(url, data)
    .then((r) => {
      if (!r.data.page) {
        window.Headers
        answEl.innerHTML = r.data;
      } else {
        window.location.replace(`http://127.0.0.1:3000${r.data}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

startBtn.addEventListener('click', () => {
  answEl.style.display = 'block';
});
