function addRegExpValidation(form, fieldName, regExp) {
  form.elements[`${fieldName}`].addEventListener('input', function() {
    const err = document.getElementById(`error-${fieldName}`);
    const innerRegExp = new RegExp(regExp);
    if (
      innerRegExp.test(form.elements[`${fieldName}`].value) ||
      form.elements[`${fieldName}`].value === ''
    ) {
      err.classList.remove('visible');
      err.classList.add('hidden');
    } else {
      err.classList.remove('hidden');
      err.classList.add('visible');
    }
  });
}

export function addRegExpValidationAll({ form = null, formItems = null } = {}) {
  for (let element in formItems) {
    addRegExpValidation(form, formItems[element].name, formItems[element].regExp);
  }
}

export function addPasswordValidation(form, passwordField, passwordRepeatField) {
  form.elements[`${passwordRepeatField}`].addEventListener('input', function() {
    const err = document.getElementById(`error-${passwordRepeatField}`);
    if (
      form.elements[`${passwordField}`].value === form.elements[`${passwordRepeatField}`].value ||
      form.elements[`${passwordRepeatField}`].value === ''
    ) {
      err.classList.remove('visible');
      err.classList.add('hidden');
    } else {
      err.classList.remove('hidden');
      err.classList.add('visible');
    }
  });
}

export function checkRegExpValidity({ form = null, formItems = null } = {}) {
  for (let element in formItems) {
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
