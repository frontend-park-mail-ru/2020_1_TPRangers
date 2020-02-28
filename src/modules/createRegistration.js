import { fetchPOST } from './ajax';
import {
  addRegExpValidationAll,
  addPasswordValidation,
  checkRegExpValidity,
  checkPasswordValidity,
} from './formValidation';

// eslint-disable-next-line import/no-cycle
import { routes } from './routes';

const formTmpl = require('../templates/form.pug');

/**
 * Данные для отрисовки формы
 * @type {{buttonName: string, formItems: {date: {name: string, fa_item: string, title: string, type: string, class: string, errorMsg: string}, password: {name: string, fa_item: string, placeholder: string, title: string, type: string, class: string, regExp: RegExp, errorMsg: string}, phone: {name: string, fa_item: string, placeholder: string, title: string, type: string, class: string, regExp: RegExp, errorMsg: string}, passwordRepeat: {name: string, fa_item: string, placeholder: string, title: string, type: string, class: string, errorMsg: string}, email: {name: string, fa_item: string, placeholder: string, title: string, type: string, class: string, regExp: RegExp, errorMsg: string}, username: {name: string, fa_item: string, placeholder: string, title: string, type: string, class: string, regExp: RegExp, errorMsg: string}}, classes: [string], id: string}}
 */
const regItems = {
  classes: ['regForm'],
  id: 'regForm',
  formItems: {
    username: {
      title: 'Ваше имя',
      name: 'username',
      placeholder: 'Иван Иванов',
      type: 'text',
      regExp: /^[a-zA-Zа-яА-Я]{0,20}$/i,
      errorMsg: 'Некорректное имя пользователя',
      class: 'formLb',
      fa_item: 'fas fa-user',
    },
    email: {
      title: 'Email',
      name: 'email',
      placeholder: 'ivan.ivanov@mail.ru',
      type: 'email',
      regExp: /.+@.+\..+/i,
      errorMsg: 'Некорректный адрес почты',
      class: 'formLb',
      fa_item: 'fas fa-at',
    },
    phone: {
      title: 'Телефон',
      name: 'phone',
      placeholder: '+7 910 777 77 77',
      type: 'text',
      regExp: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
      errorMsg: 'Некорректный телефон',
      class: 'formLb',
      fa_item: 'fas fa-phone',
    },
    date: {
      title: 'Дата рождения',
      name: 'date',
      type: 'date',
      // regExp: /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/i,
      errorMsg: 'Некорректная дата',
      class: 'formLb',
      fa_item: 'fas fa-birthday-cake',
    },
    password: {
      title: 'Пароль',
      name: 'password',
      placeholder: '',
      type: 'password',
      regExp: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i,
      errorMsg:
        'Пароль должен содержать одну заглавную, одну строчную букву, цифру и не менее 8 симвлолов',
      class: 'formLb',
      fa_item: 'fas fa-key',
    },
    passwordRepeat: {
      title: 'Повторите пароль',
      name: 'password-repeat',
      placeholder: '',
      type: 'password',
      errorMsg: 'Пароли не совпадают',
      class: 'formLb',
      fa_item: 'fas fa-key',
    },
  },
  buttonName: 'Регистрация',
};

/**
 * Класс для создания страницы регистрации
 */
class RegistrationPage {
  set parent(parent) {
    // eslint-disable-next-line no-underscore-dangle
    this._parent = parent;
  }

  get parent() {
    // eslint-disable-next-line no-underscore-dangle
    return this._parent;
  }

  /**
   * Функция рендера шаблона регистрации
   * @DOM-Object parent
   */
  renderTmpl(parent) {
    this.parent = parent;
    this.parent.innerHTML = '';
    this.parent.innerHTML += formTmpl(regItems);
    const regForm = document.getElementById('regForm');
    addRegExpValidationAll({
      form: regForm,
      formItems: regItems.formItems,
    });
    addPasswordValidation(
      regForm,
      regItems.formItems.password.name,
      regItems.formItems.passwordRepeat.name,
    );

    regForm.addEventListener('submit', event => {
      event.preventDefault();
      if (
        checkRegExpValidity({
          form: regForm,
          formItems: regItems.formItems,
        }) &&
        checkPasswordValidity({
          form: regForm,
          passwordField: regItems.formItems.password.name,
          passwordRepeatField: regItems.formItems.passwordRepeat.name,
        })
      ) {
        const email = regForm.elements.email.value;
        const password = regForm.elements.password.value;
        const name = regForm.elements.username.value;
        const phone = regForm.elements.phone.value;
        const date = regForm.elements.date.value;

        console.log(date);

        fetchPOST({
          url: 'http://138.68.77.22:3001/api/v1/registration',
          body: JSON.stringify({
            body: [
              {
                email,
                password,
                name,
                phone,
                date,
              },
            ],
          }),

          callback: response => {
            console.log(response);
            if (response.status !== 200) {
              console.log(`Looks like there was a problem. Status Code: ${response.status}`);
              return;
            }
            const hide = document.getElementsByClassName('mainLeftBlock')[0];
            hide.style.display = 'flex';
            routes.news(parent);
          },
        });
      }
    });
  }
}

export default new RegistrationPage();
