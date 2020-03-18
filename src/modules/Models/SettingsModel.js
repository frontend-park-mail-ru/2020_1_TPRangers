import Observer from '../../controller/observer'
import {
  addPasswordValidation,
  addRegExpValidationAll, checkPasswordValidity,
  checkRegExpValidity
} from '../formValidation';
import { fetchGET, fetchPOST } from '../../ajax/ajax';
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
    name: 'telephone',
    type: 'text',
    regExp: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
  },
  date: {
    name: 'date',
    regExp: /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/i,
  },
  password: {
    name: 'pass',
    regExp: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i,
  },
  passwordRepeat: {
    name: 'password-repeat',
  },
};

let settingsRenderCallback = () => {
  console.log(`[DEBUG] settings:render callback`);

  const settingsForm = document.getElementById('js-settings-form');

  fetchGET({
    url: BACKEND_IP + '/api/v1/settings',
    callback: response => {
      Observer.emit('settings:set-input', response);
    }
  });

  addRegExpValidationAll({
    form: settingsForm,
    formItems: formItems,
  });

  addPasswordValidation(
    settingsForm,
    formItems.password.name,
    formItems.passwordRepeat.name,
  );

  settingsForm.addEventListener('submit', event => {
    event.preventDefault();
    if (
      checkRegExpValidity({
        form: settingsForm,
        formItems: formItems,
      }) &&
      checkPasswordValidity({
        form: settingsForm,
        passwordField: formItems.password.name,
        passwordRepeatField: formItems.passwordRepeat.name,
      })
    ) {
      Observer.emit('settings:submit', event);
    }
  });
};

let settingsSubmitCallback = () => {
  console.log(`[DEBUG] settings:submit callback`);

  const settingsForm = document.getElementById('js-settings-form');


  const email = settingsForm.elements.email.value;
  const password = settingsForm.elements.pass.value;
  const name = settingsForm.elements.username.value;
  const phone = settingsForm.elements.telephone.value;
  const date = settingsForm.elements.date.value;

  fetchPOST({
    url: BACKEND_IP + '/api/v1/settings',
    body: JSON.stringify({
      email,
      password,
      name,
      phone,
      date
    }),
    callback: response => {
      Observer.emit('settings:ajax', response);
    }
  })
};

let settingsSetInputCallback = response => {
  console.log(`[DEBUG] settings:set-input callback`);
  if (response.status === 200) {
    response.json().then(data => {
      for (const elem in data.body.user) {
        const settingsElem = document.getElementById(elem);
        if (settingsElem) {
          settingsElem.placeholder = data.body.user[elem];
        }
      }
    })
  }
};

let settingAjaxCallback = response => {
  console.log(`[DEBUG] settings:ajax callback`);
  console.log(response.status);
  if (response.status === 200)
    Router.navigate('profile');
};

Observer.on('settings:render', settingsRenderCallback);
Observer.on('settings:submit', settingsSubmitCallback);
Observer.on('settings:set-input', settingsSetInputCallback);
Observer.on('settings:ajax', settingAjaxCallback);
