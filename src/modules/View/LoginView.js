import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/includes/modules/loginForm.pug');

const loginItems ={data: {
    classes: ['form form_light login-form'],
    id: 'js-login-form',
    formItems: {
      email: {
        title: 'Логин',
        name: 'email',
        placeholder: 'ivan.ivanov@mail.ru',
        type: 'email',
        regExp: /.+@.+\..+/i,
        errorMsg: 'Некоррекнтый email',
        class: 'form__label',
        fa_item: 'fas fa-at',
      },
      password: {
        title: 'Пароль',
        name: 'password',
        placeholder: '',
        type: 'password',
        regExp: '',
        errorMsg: 'Неправильный логин и/или пароль',
        class: 'form__label',
        fa_item: 'fas fa-key',
      },
    },
    buttonName: 'Войти',
  }
};

export default class LoginView extends IView{
  render() {
    super.render();
    this.parent.innerHTML += formTmpl(loginItems);
    Observer.emit('login:render');
  }
}
