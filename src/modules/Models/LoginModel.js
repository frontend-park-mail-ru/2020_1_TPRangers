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

const loginRenderCallback = () => {
  console.log(`[DEBUG] login:render callback`);

  fetchGET({
    url: BACKEND_IP + '/api/v1/profile',
    callback: response => {
      Observer.emit('login/reg:load', response);
    }
  });

  const loginForm = document.getElementById('js-login-form');


  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    Observer.emit('login:submit', event);
  });

  loginForm.addEventListener('reset', event => {
    event.preventDefault();
    Router.navigate('reg')
  })
};

const loginSubmitCallback = () => {

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
      Observer.emit('login:ajax', response);
    }
  })
};

const loginAjaxCallback = response => {
  console.log(`[DEBUG] login:ajax callback`);
  if (response.status === 200) {
    Observer.emit('draw-basic');
    Router.navigate('news');
  } else {
    const err = document.getElementById(`error-password`);
    const infoText = document.getElementById(`tooltip-password`);
    err.classList.add('visible');
    err.classList.remove('hidden');
    if (err.classList.contains('js-correct')) {
      err.classList.remove('js-correct');
    }
    err.classList.add('js-error');
    infoText.innerText = '!';
  }
};


Observer.on('login:render', loginRenderCallback);
Observer.on('login:submit', loginSubmitCallback);
Observer.on(`login:ajax`, loginAjaxCallback);
