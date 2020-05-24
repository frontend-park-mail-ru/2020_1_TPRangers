import Observer from '../../controller/observer'
import {
  addPasswordValidation,
  addRegExpValidationAll, checkPasswordValidity,
  checkRegExpValidity
} from '../formValidation';
import { fetchGET, fetchMultipartPOST, fetchPOST, fetchPUT } from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

let token;

const formItems =  {
  name: {
    name: 'name',
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

const settingsRenderCallback =  () => {
  //console.log(`[DEBUG] settings:render callback`);

  const settingsForm = document.getElementById('js-settings-form');

  fetchGET({
    url: BACKEND_IP + '/api/v1/csrf',
    callback: response => {
      response.json().then( response => {
          token = response.body.token;
          Observer.emit('settings:getInfo')
        }
      )
    }
  })

  settingsForm.phone.oninput = evt => {
    evt.preventDefault();
    if (settingsForm.phone.value === "+7 ") {
      settingsForm.phone.value = ""
    }
    settingsForm.phone.value = settingsForm.phone.value.replace(/[^0-9]*/gm,'')
    settingsForm.phone.value = settingsForm.phone.value.replace(/^[78]/gm,"+7 ")
    settingsForm.phone.value = settingsForm.phone.value.replace(/^([^\+78])/gm,"+7 $1")
    if (settingsForm.phone.value.length < 7) {
      settingsForm.phone.value = settingsForm.phone.value.replace(/^\+?[78] ([0-9]{0,3})/gm, `+7 $1`)
    } else if (settingsForm.phone.value.length < 10) {
      settingsForm.phone.value = settingsForm.phone.value.replace(/^\+?[78] ([0-9]{0,3})([0-9]{0,3})/gm, `+7 ($1) $2`)
    } else if (settingsForm.phone.value.length < 13) {
      settingsForm.phone.value = settingsForm.phone.value.replace(/^\+?[78] ([0-9]{0,3})([0-9]{0,3})([0-9]{0,2})/gm, `+7 ($1) $2-$3`)
    } else {
      settingsForm.phone.value = settingsForm.phone.value.replace(/^\+?[78] ([0-9]{0,3})([0-9]{0,3})([0-9]{0,2})([0-9]{0,2})/gm, `+7 ($1) $2-$3-$4`)
    }
  }

  addPasswordValidation(
    settingsForm,
    formItems.password.name,
    formItems.passwordRepeat.name,
  );

  settingsForm.addEventListener('submit', event => {
    event.preventDefault();
    if (settingsForm.phone.value.length !== 18 && settingsForm.phone.value !== "") {
      const err = document.getElementById(`register-error`);
      err.classList.remove('hidden');
      err.innerText = "Введите корректный номер телефона";
      return;
    }
    if (
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


const settingsSubmitCallback = async () => {
  //console.log(`[DEBUG] settings:submit callback`);

  const settingsForm = document.getElementById('js-settings-form');

  if (settingsForm.elements.avatar.files[0]) {

    let body = new FormData();
    body.append('fileData', settingsForm.elements.avatar.files[0]);

    fetchMultipartPOST({
      url:  'https://social-hub.ru/upload',
      body,
      callback: response => {
        response.json().then( data => {
            Observer.emit('settings:afterPhoto', data);
          }
        )
      }
    })
  } else {
    Observer.emit('settings:afterPhoto');
  }


};

const afterPhotoCallback = (response) => {
  //console.log(`[DEBUG] settings:afterPhoto callback`);
  const settingsForm = document.getElementById('js-settings-form');
  let photo = undefined;
  if (response) {
    photo = 'https://social-hub.ru' + response.filename;
  }
  const email = settingsForm.elements.email.value;
  const password = settingsForm.elements.pass.value;
  const name = settingsForm.elements.name.value;
  const telephone = settingsForm.elements.telephone.value;
  const date = settingsForm.elements.date.value;

  fetchPUT({
    url: BACKEND_IP + '/api/v1/settings',
    body: JSON.stringify({
      email,
      password,
      name,
      telephone,
      date,
      photo
    }),
    callback: response => {
      Observer.emit('settings:ajax', response);
    },
    headers: {
      'X-Csrf-Token': token.toString(),
      'Content-Type': 'application/json',
    }
  })
};

const settingsSetInputCallback = response => {
  //console.log(`[DEBUG] settings:set-input callback`);
  if (response.status === 200) {
    response.json().then(data => {
      for (const elem in data) {
        const settingsElem = document.getElementById(elem);
        if (settingsElem) {
          settingsElem.placeholder = data[elem];
        }
      }
    })
  }
};

const settingAjaxCallback = response => {
  //console.log(`[DEBUG] settings:ajax callback`);
  if (response.status === 200) {
    Router.navigate('profile');
  } else {
    const err = document.getElementById(`register-error`);
    err.classList.remove('hidden');
    err.innerText = "Пользователь с такой почтой уже существует"
  }
};

const getInfoCallback = () => {
  //console.log(`[DEBUG] settings:getInfo callback`);

  fetchGET({
    url: BACKEND_IP + '/api/v1/settings',
    callback: response => {
      Observer.emit('settings:set-input', response);
    },
    headers: {
      'X-Csrf-Token': token.toString(),
    }
  });
}

Observer.on('settings:render', settingsRenderCallback);
Observer.on('settings:submit', settingsSubmitCallback);
Observer.on('settings:set-input', settingsSetInputCallback);
Observer.on('settings:ajax', settingAjaxCallback);
Observer.on('settings:afterPhoto', afterPhotoCallback);
Observer.on('settings:getInfo', getInfoCallback);
