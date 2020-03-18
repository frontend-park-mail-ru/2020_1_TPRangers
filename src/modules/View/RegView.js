import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/includes/modules/regForm.pug');

const regItems = {data: {
    classes: ['form form_light reg-form'],
    id: 'js-reg-form',
    formItems: {
      username: {
        title: 'Ваше имя',
        name: 'username',
        placeholder: 'Иван Иванов',
        type: 'text',
        regExp: /^[a-zA-Zа-яА-Я]{0,20}$/i,
        errorMsg: 'Некорректное имя пользователя',
        class: 'form__label',
        fa_item: 'fas fa-user',
      },
      email: {
        title: 'Email',
        name: 'email',
        placeholder: 'ivan.ivanov@mail.ru',
        type: 'email',
        regExp: /.+@.+\..+/i,
        errorMsg: 'Некорректный адрес почты',
        class: 'form__label',
        fa_item: 'fas fa-at',
      },
      phone: {
        title: 'Телефон',
        name: 'phone',
        placeholder: '+7 910 777 77 77',
        type: 'text',
        regExp: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
        errorMsg: 'Некорректный телефон',
        class: 'form__label',
        fa_item: 'fas fa-phone',
      },
      date: {
        title: 'Дата рождения',
        name: 'date',
        type: 'date',
        // regExp: /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/i,
        errorMsg: 'Некорректная дата',
        class: 'form__label',
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
        class: 'form__label',
        fa_item: 'fas fa-key',
      },
      passwordRepeat: {
        title: 'Повторите пароль',
        name: 'password-repeat',
        placeholder: '',
        type: 'password',
        errorMsg: 'Пароли не совпадают',
        class: 'form__label',
        fa_item: 'fas fa-key',
      },
    },
    buttonName: 'Регистрация',
  }
};

export default class RegView extends IView{
  render() {
    super.render();
    this.parent.innerHTML += formTmpl(regItems);
    Observer.emit('reg:render');
  }
}
