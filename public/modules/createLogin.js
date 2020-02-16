import {createDefaultForm} from "./createForm.js";
import createBackButton from "./createBackButton.js";

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
    const form = createDefaultForm(loginItems, 'Войти');
    parent.appendChild(form);
    const backButton = createBackButton();
    parent.appendChild(backButton);
}
