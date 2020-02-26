import {
  addRegExpValidationAll,
  addPasswordValidation,
  checkRegExpValidity,
  checkPasswordValidity,
} from './formValidation';
import { fetchPOST, fetchGET, fetchPUT } from './ajax';

const formTmpl = require('../templates/form.pug');

const settingsItems = {
  classes: ['settingsForm'],
  id: 'settingsForm',
  formItems: {
    avatar: {
      title: 'Загрузите/обновите аватар',
      name: 'avatar',
      type: 'file',
      class: 'formLb',
      fa_item: 'fas fa-camera-retro',
    },
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
  buttonName: 'Обновить профиль',
};

class SettingsPage {
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

    fetchGET({
      url: 'http://localhost:3001/settings',
      callback: response => {
        console.log(response);
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          return;
        }

        response.json().then(data => {
          console.log(data);
        });
      },
    });

    this.parent.innerHTML += formTmpl(settingsItems);
    const settingsForm = document.getElementById('settingsForm');
    addRegExpValidationAll({
      form: settingsForm,
      formItems: settingsItems.formItems,
    });

    addPasswordValidation(
      settingsForm,
      settingsItems.formItems.password.name,
      settingsItems.formItems.passwordRepeat.name,
    );

    settingsForm.addEventListener('submit', event => {
      if (
        checkRegExpValidity({
          form: settingsForm,
          formItems: settingsForm.formItems,
        }) &&
        checkPasswordValidity({
          form: settingsForm,
          passwordField: settingsForm.formItems.password.name,
          passwordRepeatField: settingsForm.formItems.passwordRepeat.name,
        })
      ) {
        event.preventDefault();

        const email = settingsForm.elements.email.value;
        const password = settingsForm.elements.password.value;
        const name = settingsForm.elements.username.value;
        const phone = settingsForm.elements.phone.value;
        const date = settingsForm.elements.date.value;

        const avatar = new FormData();
        avatar.append('avatar', settingsForm.files[0]);

        fetchPOST({
          url: 'http://localhost:3001/settings',
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
            console.log('ok');
            response.json().then(data => {
              console.log(data);
            });
          },
        });

        fetchPUT({
          url: 'http://localhost:3001/settings',
          headers: { 'Content-Type': 'multipart/form-data' },
          body: {
            body: avatar,
          },

          callback: response => {
            console.log(response);
            if (response.status !== 200) {
              console.log(`Looks like there was a problem. Status Code: ${response.status}`);
              return;
            }
            console.log('ok');
            response.json().then(data => {
              console.log(data);
            });
          },
        });
      }
    });
  }
}

export default new SettingsPage();
