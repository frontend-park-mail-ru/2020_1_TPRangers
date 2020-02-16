import {createDefaultForm} from "./createForm.js";

const regItems = {
    username: {
        title: 'Ваше имя',
        name: 'username',
        placeholder: 'Иван Иванов',
        type: 'text',
    },
    email: {
        title: 'Email',
        name: 'email',
        placeholder: 'ivan.ivanov@mail.ru',
        type: 'email',
    },
    phone: {
        title: 'Телефон',
        name: 'phone',
        placeholder: '+7 910 777 77 77',
        type: 'text'
    },
    password: {
        title: 'Пароль',
        name: 'password',
        placeholder: '',
        type: 'password'
    },
    passwordRepeat: {
        title: 'Повторите пароль',
        name: 'password-repeat',
        placeholder: '',
        type: 'password'
    }
}



export function createRegistration(parent = document.body) {
    parent.innerHTML = '';
    const form = createDefaultForm(regItems);
    parent.appendChild(form);
}