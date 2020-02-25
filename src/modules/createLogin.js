import { fetchPOST } from './ajax';
import { addValidation } from './checkFormField';

const formTmpl = require('../templates/form.pug');

const loginItems = {
  classes: ['loginForm'],
  id: 'loginForm',
  formItems: {
    email: {
      title: 'Логин',
      name: 'email',
      placeholder: 'ivan.ivanov@mail.ru',
      type: 'email',
      regExp: /.+@.+\..+/i,
      errorMsg: 'Некоррекнтый email',
    },
    password: {
      title: 'Пароль',
      name: 'password',
      placeholder: '',
      type: 'password',
      regExp: '123',
      errorMsg: 'Неправильный логин и/или пароль',
    },
  },
  buttonName: 'Войти',
};

export default function createLogin(parent = document.body) {
  parent.innerHTML = '';
  parent.innerHTML += formTmpl(loginItems);
  const loginForm = document.getElementById('loginForm');

  addValidation({
    form: loginForm,
    formItems: loginItems.formItems,
  });

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = loginForm.elements['email'].value;
    const password = loginForm.elements['password'].value;

    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const email = loginForm.elements['email'].value;
      const password = loginForm.elements['password'].value;
      fetchPOST({
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
  });
}
