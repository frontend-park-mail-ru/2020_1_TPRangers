import Observer from '../../controller/observer'
import {addRegExpValidationAll, checkRegExpValidity} from '../formValidation';
import { fetchGET, fetchPOST } from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

const formItems = {
  email: {
    name: 'email',
    regExp: /.+@.+\..+/i,
  },
  password: {
    name: 'password',
    regExp: '',
  },
};

let loginRenderCallback = () => {
  console.log(`[DEBUG] login:render callback`);

  fetchGET({
    url: BACKEND_IP + '/api/v1/profile',
    callback: response => {
      Observer.emit('login/reg:load', response);
    }
  });

  const loginForm = document.getElementById('js-login-form');

  addRegExpValidationAll({
    form: loginForm,
    formItems: formItems,
  });

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    if (
      checkRegExpValidity({
        form: loginForm,
        formItems: formItems,
      }))
    {
      Observer.emit('login:submit', event);
    }
  });

  loginForm.addEventListener('reset', event => {
    event.preventDefault();
    Router.navigate('reg')
  })
};

let loginSubmitCallback = () => {

  const loginForm = document.getElementById('js-login-form');

  console.log(`[DEBUG] login:submit callback`);
  const email = loginForm.elements.email.value;
  const password = loginForm.elements.password.value;
  fetchPOST({
    url: BACKEND_IP + '/api/v1/login',
    body: JSON.stringify({
          login: email,
          password,
    }),
    callback: response => {
      console.log(`[DEBUG] Response is`);
      console.log(response);
      Observer.emit('login:ajax', response);
    }
  })
};

let loginAjaxCallback = response => {
  console.log(`[DEBUG] login:ajax callback`);
  if (response.status === 200) {
    Observer.emit('draw-basic');
    Router.navigate('news');
  }
};


Observer.on('login:render', loginRenderCallback);
Observer.on('login:submit', loginSubmitCallback);
Observer.on(`login:ajax`, loginAjaxCallback);
