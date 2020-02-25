import { addValidation, addPasswordValidation } from './checkFormField';

const formTmpl = require('../templates/form.pug');

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
    },
    email: {
      title: 'Email',
      name: 'email',
      placeholder: 'ivan.ivanov@mail.ru',
      type: 'email',
      regExp: /.+@.+\..+/i,
      errorMsg: 'Некорректный адрес почты',
    },
    phone: {
      title: 'Телефон',
      name: 'phone',
      placeholder: '+7 910 777 77 77',
      type: 'text',
      regExp: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
      errorMsg: 'Некорректный телефон',
    },
    date: {
      title: 'Дата рождения',
      name: 'date',
      type: 'date',
      regExp: /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/i,
      errorMsg: 'Некорректная дата',
    },
    password: {
      title: 'Пароль',
      name: 'password',
      placeholder: '',
      type: 'password',
      regExp: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i,
      errorMsg:
        'Пароль должен содержать одну заглавную, одну строчную букву, цифру и не менее 8 симвлолов',
    },
    passwordRepeat: {
      title: 'Повторите пароль',
      name: 'password-repeat',
      placeholder: '',
      type: 'password',
      errorMsg: 'Пароли не совпадают',
    },
  },
  buttonName: 'Регистрация',
};

export default function createRegistration(parent = document.body) {
  parent.innerHTML = '';
  parent.innerHTML += formTmpl(regItems);
  const regForm = document.getElementById('regForm');
  addValidation({
    form: regForm,
    formItems: regItems.formItems,
  });
  addPasswordValidation(regForm);
}
