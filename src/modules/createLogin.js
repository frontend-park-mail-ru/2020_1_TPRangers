import { fetchGET, fetchPOST } from './ajax';
import { addRegExpValidationAll, checkRegExpValidity } from './formValidation';
// eslint-disable-next-line import/no-cycle
import { routes } from './routes';

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
          body: JSON.stringify({
            body: [
              {
                login: email,
                password,
              },
            ],
          }),

          callback: response => {
            if (response.status !== 200) {
              console.log(`Looks like there was a problem. Status Code: ${response.status}`);
              const err = document.getElementById('error-password');
              const infoText = document.getElementById('tooltip-password');
              err.classList.add('visible');
              err.classList.remove('hidden');
              err.classList.remove('correct');
              err.classList.add('err');
              infoText.innerText = '!';
              if (infoText.hasAttribute('data-tooltip')) {
                infoText.setAttribute(
                  'data-tooltip',
                  'Пользователя с такими данными не существует!',
                );
              }
              return;
            }

            fetchGET({
              url: 'http://localhost:3001/login',
              headers: {
                'X-Login': email,
              },
              callback: response => {
                routes.profile(parent);
              },
            });
          },
        });
      }
    });
  }
}

export default new LoginPage();
