function checkFormField(form, fieldName, regExp) {
    form.elements[`${fieldName}`].addEventListener('input', function () {
        const err = document.getElementById(`error-${fieldName}`);
        const innerRegExp = new RegExp(regExp)
        if (innerRegExp.test(form.elements[`${fieldName}`].value) || form.elements[`${fieldName}`].value === '') {
            err.classList.remove('visible');
            err.classList.add('hidden');
        } else {
            err.classList.remove('hidden');
            err.classList.add('visible');
        }
    });
}

export function addValidation({
    form = null,
    formItems = null,} = {}) {
    for (let element in formItems) {
        checkFormField(form, formItems[element].name, formItems[element].regExp);
    }
}

export function addPasswordValidation(form) {
    form.elements[`password-repeat`].addEventListener('input', function () {
        const err = document.getElementById(`error-password-repeat`);
        if (form.elements['password'].value === form.elements['password-repeat'].value || form.elements[`password-repeat`].value === '') {
            err.classList.remove('visible');
            err.classList.add('hidden');
        } else {
            err.classList.remove('hidden');
            err.classList.add('visible');
        }
    });
}


