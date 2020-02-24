const formTemp = require('../templates/form.pug');

const loginItems = {
  classes: ['loginForm'],
  id: 'loginForm',
  formItems: {
    email: {
      title: 'Логин',
      name: 'email',
      placeholder: 'ivan.ivanov@mail.ru',
      type: 'email',
    },
    password: {
      title: 'Пароль',
      name: 'password',
      placeholder: '',
      type: 'password',
    },
  },
  buttonName: 'Войти',
};

export default function createLogin(parent = document.body) {
  parent.innerHTML = '';
  parent.innerHTML += formTemp(loginItems);

  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = loginForm.elements['email'].value;
    const password = loginForm.elements['password'].value;

    FetchModule.fetchPOST({
      url: 'http://localhost:3001/login',
      body: { name: 'Hello, world' },
      callback: response => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then(function(data) {
          console.log(data);
        });
      },
    });
  });
}
