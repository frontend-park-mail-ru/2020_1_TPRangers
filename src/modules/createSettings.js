import {createDefaultForm} from "./createForm.js";
import createBackButton from "./createBackButton.js";

const settingsItems = {
    avatar: {
        title: 'Загрузите/обновите аватар',
        name: 'avatar',
        type: 'file',
    },
    username: {
        title: 'Ваше имя',
        name: 'username',
        placeholder: 'Иван Иванов',
        type: 'text',
    },
    date: {
        title: 'Дата рождения',
        name: 'date',
        type: 'date',
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
}



export function createSettings(parent = document.body) {
    parent.innerHTML = '';
    const form = createDefaultForm(settingsItems, 'Сохранить');
    parent.appendChild(form);
    const backButton = createBackButton();
    parent.appendChild(backButton);
}