import {createDefaultForm} from "./createForm.js";


const loginItems = {
    email: {
        title: 'Логин',
        name: 'email',
        placeholder: 'ivan.ivanov@mail.ru',
        type: 'email',
    },
    password: {
        title: 'Пароль',
        name: 'password',
        placeholder: '',
        type: 'password'
    }
};




 export function createLogin(parent = document.body) {
    parent.innerHTML = '';
    const form = createDefaultForm(loginItems);
    parent.appendChild(form);
}
