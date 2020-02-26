import { fetchPOST } from './ajax';
import { addRegExpValidationAll, checkRegExpValidity } from './formValidation';
import RegistrationPage from './createRegistration';
import NewsPage from './newsPage';

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
      regExp: '',
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
    addRegExpValidationAll({
      form: loginForm,
      formItems: loginItems.formItems,
    });

    loginForm.addEventListener('submit', event => {
      event.preventDefault();
      if (
        checkRegExpValidity({
          form: loginForm,
          formItems: loginItems.formItems,
        })
      ) {
        const email = loginForm.elements.email.value;
        const password = loginForm.elements.password.value;
        fetchPOST({
          url: 'http://localhost:3001/login',
          body: {
            body: [
              {
                login: email,
                password,
              },
            ],
          },

          callback: response => {
            if (response.status !== 200) {
              RegistrationPage.renderTmpl(this.parent);
              return;
            }

            NewsPage.renderTmpl(this.parent);

          },
        });
      }
    });
  }
}

export default new LoginPage();
