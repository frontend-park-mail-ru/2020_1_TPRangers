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
      class: 'formLb',
      fa_item: 'fas fa-at',
    },
    password: {
      title: 'Пароль',
      name: 'password',
      placeholder: '',
      type: 'password',
      regExp: '123',
      errorMsg: 'Неправильный логин и/или пароль',
      class: 'formLb',
      fa_item: 'fas fa-key',
    },
  },
  buttonName: 'Войти',
};

class LoginPage {
  set parent(parent) {
    // eslint-disable-next-line no-underscore-dangle
    this._parent = parent;
  }

  get parent() {
    // eslint-disable-next-line no-underscore-dangle
    return this._parent;
  }

  renderTmpl(parent) {
    this.parent = parent;
    this.parent.innerHTML = '';
    this.parent.innerHTML += formTmpl(loginItems);

    const loginForm = document.getElementById('loginForm');
    addValidation({
      // eslint-disable-next-line no-undef
      form: loginForm,
      formItems: loginItems.formItems,
    });

    loginForm.addEventListener('submit', event => {
      event.preventDefault();

      // eslint-disable-next-line no-unused-vars
      const email = loginForm.elements.email.value;
      // eslint-disable-next-line no-unused-vars
      const password = loginForm.elements.password.value;

      loginForm.addEventListener('submit', event => {
        event.preventDefault();

        // eslint-disable-next-line no-undef,no-shadow,no-unused-vars
        const email = loginForm.elements.email.value;
        // eslint-disable-next-line no-shadow,no-undef,no-unused-vars
        const password = loginForm.elements.password.value;
        fetchPOST({
          url: 'http://localhost:3001/login',
          body: { name: 'Hello, world' },

          callback: response => {
            if (response.status !== 200) {
              // eslint-disable-next-line no-console
              console.log(`Looks like there was a problem. Status Code: ${response.status}`);
              return;
            }
            response.json().then(data => {
              // eslint-disable-next-line no-console
              console.log(data);
            });
          },
        });
      });
    });
  }
}

export default new LoginPage();
