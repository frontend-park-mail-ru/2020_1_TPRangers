function checkFormField(form, fieldName, regExp) {
  form.elements[`${fieldName}`].addEventListener('input', () => {
    const err = document.getElementById(`error-${fieldName}`);
    const infoText = document.getElementById(`tooltip-${fieldName}`);
    err.classList.add('visible');
    err.classList.remove('hidden');
    const innerRegExp = new RegExp(regExp);
    if (
      innerRegExp.test(form.elements[`${fieldName}`].value) ||
      form.elements[`${fieldName}`].value === ''
    ) {
      if (form.elements[`${fieldName}`].value === '') {
        err.classList.add('hidden');
        err.classList.remove('visible');
      }
      if (err.classList.contains('err')) {
        err.classList.remove('err');
      }
      err.classList.add('correct');
      infoText.innerText = '✔';
    } else {
      if (err.classList.contains('correct')) {
        err.classList.remove('correct');
      }
      err.classList.add('err');
      infoText.innerText = '!';
    }
  });
}

export function addValidation({ form = null, formItems = null } = {}) {
  for (const element in formItems) {
    checkFormField(form, formItems[element].name, formItems[element].regExp);
  }
}

export function addPasswordValidation(form) {
  form.elements['password-repeat'].addEventListener('input', () => {
    const err = document.getElementById('error-password-repeat');
    err.classList.add('visible');
    err.classList.remove('hidden');
    const infoText = document.getElementById('tooltip-password-repeat');
    if (
      form.elements.password.value === form.elements['password-repeat'].value ||
      form.elements['password-repeat'].value === ''
    ) {
      if (form.elements['password-repeat'].value === '') {
        err.classList.add('hidden');
        err.classList.remove('visible');
      }
      if (err.classList.contains('err')) {
        err.classList.remove('err');
      }
      err.classList.add('correct');
      infoText.innerText = '✔';
    } else {
      if (err.classList.contains('correct')) {
        err.classList.remove('correct');
      }
      err.classList.add('err');
      infoText.innerText = '!';
    }
  });
}
