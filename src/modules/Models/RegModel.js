import Observer from '../../controller/observer';
import {addPasswordValidation, addRegExpValidationAll, checkRegExpValidity, checkPasswordValidity} from '../formValidation';
import {fetchPOST} from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

let formItems =  {
    username: {
      name: 'username',
      regExp: /^[a-zA-Zа-яА-Я]{0,20}$/i,
    },
    email: {
      name: 'email',
      regExp: /.+@.+\..+/i,
    },
    phone: {
      name: 'phone',
      type: 'text',
      regExp: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
    },
    date: {
      name: 'date',
      // regExp: /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/i,
      errorMsg: 'Некорректная дата',
    },
    password: {
      name: 'password',
      regExp: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i,
    },
    passwordRepeat: {
      name: 'password-repeat',
    },
  };

let regRenderCallback = () => {
  console.log(`[DEBUG] reg:render callback`);

  const regForm = document.getElementById('js-reg-form');

  addRegExpValidationAll({
    form: regForm,
    formItems: formItems,
  });

  addPasswordValidation(
    regForm,
    formItems.password.name,
    formItems.passwordRepeat.name,
  );

  regForm.addEventListener('submit', event => {
    event.preventDefault();
    if (
      checkRegExpValidity({
        form: regForm,
        formItems: formItems,
      }) &&
      checkPasswordValidity({
        form: regForm,
        passwordField: formItems.password.name,
        passwordRepeatField: formItems.passwordRepeat.name,
      })
    ) {
      Observer.emit('reg:submit', event);
    }
  });
};

let regSubmitCallback = event => {
  console.log(`[DEBUG] reg:submit callback`);

  const regForm = document.getElementById('js-reg-form');

  const email = regForm.elements.email.value;
  const password = regForm.elements.password.value;
  const name = regForm.elements.username.value;
  const phone = regForm.elements.phone.value;
  const date = regForm.elements.date.value;

  fetchPOST({
    url: BACKEND_IP+'/api/v1/registration',
    body: JSON.stringify({
      email,
      password,
      name,
      phone,
      date,
    }),
    callback: response => {
      console.log(`[DEBUG] Response is`);
      console.log(response);
      Observer.emit('reg:ajax', response);
    }
  })
};

let regAjaxCallback = response => {
  console.log(`[DEBUG] reg:ajax callback`);
  console.log(response.status);
  Observer.emit('load:draw-basic');
  Router.navigate('news');
};

Observer.on('reg:render', regRenderCallback);
Observer.on('reg:submit', regSubmitCallback);
Observer.on('reg:ajax', regAjaxCallback);
