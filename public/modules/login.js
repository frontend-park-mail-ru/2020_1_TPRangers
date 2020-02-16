import {createInput, createFormButton} from "./createForm.js";

const application = document.getElementById("application");


const loginItems = {
    email: {
        name: 'email',
        placeholder: 'Email',
        type: 'email',
    },
    password: {
        name: 'password',
        placeholder: 'Пароль',
        type: 'password'
    }
};

function createLoginForm (formItems = {
    by_default: {
        placeholder: undefined,
        name: undefined,
        type: undefined}
}) {
    const form = document.createElement('form');
    Object.values(formItems).forEach( (item) => {
        const input = createInput(item);
        form.appendChild(input);
    });
    const submit = createFormButton('submit', 'Войти');
    form.appendChild(submit);
    form.action = '#';
    return form;
}



 export function createLogin(parent = document.body) {
    parent.innerHTML = '';
    const form = createLoginForm(loginItems);
    parent.appendChild(form);
}
createLogin(application);

