import {createDefaultForm} from "./createForm.js";
import createBackButton from "./createBackButton.js";

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
    date: {
        title: 'Дата рождения',
        name: 'date',
        type: 'date',
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
    const form = createDefaultForm(regItems, 'Регистрация');
    parent.appendChild(form);
    const backButton = createBackButton();
    parent.appendChild(backButton);
}