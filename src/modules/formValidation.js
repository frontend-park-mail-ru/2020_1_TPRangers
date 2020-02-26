function addRegExpValidation(form, fieldName, regExp) {
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

export function addRegExpValidationAll({ form = null, formItems = null } = {}) {
  for (const element in formItems) {
    addRegExpValidation(form, formItems[element].name, formItems[element].regExp);
  }
}

export function addPasswordValidation(form, passwordField, passwordRepeatField) {
  form.elements[`${passwordRepeatField}`].addEventListener('input', () => {
    const err = document.getElementById(`error-${passwordRepeatField}`);
    err.classList.add('visible');
    err.classList.remove('hidden');
    const infoText = document.getElementById('tooltip-password-repeat');
    if (
      form.elements[`${passwordField}`].value === form.elements[`${passwordRepeatField}`].value ||
      form.elements[`${passwordRepeatField}`].value === ''
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

export function checkRegExpValidity({ form = null, formItems = null } = {}) {
  for (const element in formItems) {
    const innerRegExp = new RegExp(formItems[element].regExp);
    if (!innerRegExp.test(form.elements[formItems[element].name].value)) {
      return false;
    }
  }
  return true;
}

export function checkPasswordValidity({
  form = null,
  passwordField = null,
  passwordRepeatField = null,
} = {}) {
  return form.elements[`${passwordField}`].value === form.elements[`${passwordRepeatField}`].value;
}
