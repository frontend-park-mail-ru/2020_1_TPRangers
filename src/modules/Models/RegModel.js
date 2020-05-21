import Observer from '../../controller/observer';
import {addPasswordValidation, addRegExpValidationAll, checkRegExpValidity, checkPasswordValidity} from '../formValidation';
import { fetchGET, fetchPOST } from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

const formItems =  {
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

const regRenderCallback = () => {
  //console.log(`[DEBUG] reg:render callback`);

  fetchGET({
    url: BACKEND_IP + '/api/v1/profile',
    callback: response => {
      Observer.emit('login/reg:load', response);
    }
  });

  const regForm = document.getElementById('js-reg-form');



  addPasswordValidation(
    regForm,
    formItems.password.name,
    formItems.passwordRepeat.name,
  );

  regForm.phone.oninput = evt => {
    evt.preventDefault();
    regForm.phone.value = regForm.phone.value.replace(/[^0-9]*/gm,'')
    regForm.phone.value = regForm.phone.value.replace(/^[78]/gm,"+7")
    regForm.phone.value = regForm.phone.value.replace(/^([^\+78])/gm,"+7 $1")
    console.log(regForm.phone.value.length);
    if (regForm.phone.value.length < 6) {
      regForm.phone.value = regForm.phone.value.replace(/^\+?[78]([0-9]{0,3})/gm, `+7 $1`)
    } else if (regForm.phone.value.length < 9) {
      regForm.phone.value = regForm.phone.value.replace(/^\+?[78]([0-9]{0,3})([0-9]{0,3})/gm, `+7 ($1) $2`)
    } else if (regForm.phone.value.length < 12) {
      regForm.phone.value = regForm.phone.value.replace(/^\+?[78]([0-9]{0,3})([0-9]{0,3})([0-9]{0,2})/gm, `+7 ($1) $2-$3`)
    } else {
      regForm.phone.value = regForm.phone.value.replace(/^\+?[78]([0-9]{0,3})([0-9]{0,3})([0-9]{0,2})([0-9]{0,2})/gm, `+7 ($1) $2-$3-$4`)
    }
    if (regForm.phone.value === "+7 ") {
      regForm.phone.value = ""
    }
  }

  regForm.addEventListener('submit', event => {
    event.preventDefault();
    if (
      checkPasswordValidity({
        form: regForm,
        passwordField: formItems.password.name,
        passwordRepeatField: formItems.passwordRepeat.name,
      })
    ) {
      Observer.emit('reg:submit', event);
    }
  });

  regForm.addEventListener('reset', event => {
    event.preventDefault();
    Router.navigate('login');
  })
};

const regSubmitCallback = event => {
  //console.log(`[DEBUG] reg:submit callback`);

  const regForm = document.getElementById('js-reg-form');

  const email = regForm.elements.email.value;
  const password = regForm.elements.password.value;
  const name = regForm.elements.username.value;
  const telephone = regForm.elements.phone.value;
  const date = regForm.elements.date.value;



  fetchPOST({
    url: BACKEND_IP+'/api/v1/registration',
    body: JSON.stringify({
      email,
      password,
      name,
      telephone,
      date,
    }),
    callback: response => {
      //console.log(`[DEBUG] Response is`);
      //console.log(response);
      Observer.emit('reg:ajax', response);
    }
  })
};

const regAjaxCallback = response => {
  //console.log(`[DEBUG] reg:ajax callback`);
  //console.log(response.status);
  if (response.status === 200) {
    Observer.emit('draw-basic');
    Router.navigate('news');
  } else {
    const err = document.getElementById(`register-error`);
    err.classList.remove('hidden');
    err.innerText = "Пользователь с такой почтой уже сущствует"
  }
};

Observer.on('reg:render', regRenderCallback);
Observer.on('reg:submit', regSubmitCallback);
Observer.on('reg:ajax', regAjaxCallback);
