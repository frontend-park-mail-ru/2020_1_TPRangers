import {
  addRegExpValidationAll,
  addPasswordValidation,
  checkRegExpValidity,
  checkPasswordValidity,
} from './formValidation';
import { fetchPOST, fetchGET, fetchPUT } from './ajax';

const formTmpl = require('../templates/form.pug');
/**
 * Данные для рендера базовой формы настроек
 * @type {{buttonName: string, formItems: {date: {name: string, fa_item: string,
 * placeholder: string, title: string, type: string, class: string, regExp: RegExp,
 * errorMsg: string}, password: {name: string, fa_item: string, placeholder: string,
 * title: string, type: string, class: string, regExp: RegExp, errorMsg: string},
 * phone: {name: string, fa_item: string, placeholder: string, title: string, type: string,
 * class: string, regExp: RegExp, errorMsg: string}, avatar: {name: string, fa_item: string,
 * title: string, type: string, class: string}, passwordRepeat: {name: string, fa_item: string,
 * placeholder: string, title: string, type: string, class: string, errorMsg: string},
 * email: {name: string, fa_item: string, placeholder: string, title: string, type: string,
 * class: string, regExp: RegExp, errorMsg: string}, username: {name: string, fa_item: string,
 * placeholder: string, title: string, type: string, class: string, regExp: RegExp,
 * errorMsg: string}}, classes: [string], id: string}}
 */
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
      type: 'text',
      placeholder: '',
      // regExp: /(19|20)\d\d[-.]((0[1-9]|1[012])-(0[1-9]|[12]\d)|
      // (0[13-9]|1[012])[-.]30|(0[13578]|1[02])-31)/i,
      regExp: /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/i,
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

/**
 * класс создания страницы настроек
 */
class SettingsPage {
  set parent(parent) {
    // eslint-disable-next-line no-underscore-dangle
    this._parent = parent;
  }

  get parent() {
    // eslint-disable-next-line no-underscore-dangle
    return this._parent;
  }

  /**
   * Рендер шаблона формы регистрации
   * @DOM-Object parent
   */
  renderTmpl(parent) {
    this.parent = parent;
    this.parent.innerHTML = '';

    fetchGET({
      url: 'http://138.68.77.22:3001/api/v1/settings',
      callback: response => {
        console.log(response);
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          return;
        }

        response.json().then(data => {
          console.log(data);
          for (const elem in data.body.user) {
            switch (elem) {
              case 'Username':
                settingsItems.formItems.username.placeholder = data.body.user[elem];
                break;
              case 'Telephone':
                settingsItems.formItems.phone.placeholder = data.body.user[elem];
                break;
              case 'Date':
                settingsItems.formItems.date.placeholder = data.body.user[elem];
                break;
              case 'Photo':
                settingsItems.formItems.avatar.placeholder = data.body.user[elem];
                break;
              case 'Email':
                settingsItems.formItems.email.placeholder = data.body.user[elem];
                break;
              default:
                break;
            }
          }

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
            event.preventDefault();
            if (
              checkRegExpValidity({
                form: settingsForm,
                formItems: settingsItems.formItems,
              }) &&
              checkPasswordValidity({
                form: settingsForm,
                passwordField: settingsItems.formItems.password.name,
                passwordRepeatField: settingsItems.formItems.passwordRepeat.name,
              })
            ) {
              const email = settingsForm.elements.email.value;
              const password = settingsForm.elements.password.value;
              const name = settingsForm.elements.username.value;
              const phone = settingsForm.elements.phone.value;
              const date = settingsForm.elements.date.value;
              const avatar = document.querySelector('input[type="file"]');
              console.log(avatar);

              const avatarData = new FormData();
              avatarData.append('uploadedFile', avatar.files[0]);
              console.log(avatarData);

              fetchPOST({
                url: 'http://138.68.77.22:3001/api/v1/settings',
                body: JSON.stringify({
                  email,
                  password,
                  name,
                  phone,
                  date,
                }),

                // eslint-disable-next-line no-shadow
                callback: response => {
                  console.log(response);
                  if (response.status !== 200) {
                    console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                    return;
                  }
                  console.log('ok');
                  // eslint-disable-next-line no-shadow
                  response.json().then(data => {
                    console.log(data);
                  });
                },
              });

              fetchPUT({
                url: 'http://138.68.77.22:3001/api/v1/settings',
                body: avatarData,

                // eslint-disable-next-line no-shadow
                callback: response => {
                  console.log(response);
                  if (response.status !== 200) {
                    console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                    return;
                  }
                  console.log('ok');
                  // eslint-disable-next-line no-shadow
                  response.json().then(data => {
                    console.log(data);
                  });
                },
              });
            }
          });
        });
      },
    });
  }
}

export default new SettingsPage();
