/**
 * Функция валидации строки формы по регулярному выражению
 * @DOM-Object form
 * @string fieldName
 * @string regExp
 */
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
      if (err.classList.contains('js-error')) {
        err.classList.remove('js-error');
      }
      err.classList.add('js-correct');
      infoText.innerText = '✔';
    } else {
      if (err.classList.contains('js-correct')) {
        err.classList.remove('js-correct');
      }
      err.classList.add('js-error');
      infoText.innerText = '!';
    }
  });
}

/**
 * Добавляет валидацию на форму по регулярным выражениям
 * @DOM-Object form
 * @json formItems
 */
export function addRegExpValidationAll({ form = null, formItems = null } = {}) {
  for (const element in formItems) {
    addRegExpValidation(form, formItems[element].name, formItems[element].regExp);
  }
}

/**
 * Добавлении к строке валидации пароля
 * @DOM-Object form
 * @string passwordField
 * @string passwordRepeatField
 */
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
      if (err.classList.contains('js-error')) {
        err.classList.remove('js-error');
      }
      err.classList.add('js-correct');
      infoText.innerText = '✔';
    } else {
      if (err.classList.contains('js-correct')) {
        err.classList.remove('js-correct');
      }
      err.classList.add('js-error');
      infoText.innerText = '!';
    }
  });
}

/**
 * Проверка совпадения по регулярным выражениям
 * @DOM-Object form
 * @json formItems
 * @returns {boolean}
 */
export function checkRegExpValidity({ form = null, formItems = null } = {}) {
  for (const element in formItems) {
    const innerRegExp = new RegExp(formItems[element].regExp);
    if (!innerRegExp.test(form.elements[formItems[element].name].value)) {
      return false;
    }
  }
  return true;
}

/**
 * Проврека совпадения паролей
 * @DOM-Object form
 * @string passwordField
 * @string passwordRepeatField
 * @returns {boolean}
 */
export function checkPasswordValidity({
  form = null,
  passwordField = null,
  passwordRepeatField = null,
} = {}) {
  return form.elements[`${passwordField}`].value === form.elements[`${passwordRepeatField}`].value;
}
