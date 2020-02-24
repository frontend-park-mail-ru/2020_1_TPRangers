import createBackButton from "./createBackButton";

const formTemp = require('../templates/form.pug');
const regItems = {
    classes: [
        'regForm',
    ],
    id: 'regForm',
    formItems: {
        username: {
            title: 'Ваше имя',
            name: 'username',
            placeholder: 'Иван Иванов',
            type: 'text',
            errorMsg: 'Некорректное имя пользователя',
        },
        email: {
            title: 'Email',
            name: 'email',
            placeholder: 'ivan.ivanov@mail.ru',
            type: 'email',
            errorMsg: 'Некорректный адрес почты',
        },
        phone: {
            title: 'Телефон',
            name: 'phone',
            placeholder: '+7 910 777 77 77',
            type: 'text',
            errorMsg: 'Некорректный телефон',
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
            type: 'password',
            errorMsg: 'Пароль должен содержать одну заглавную, одну строчную букву, цифру и не менее 8 симвлолов',
        },
        passwordRepeat: {
            title: 'Повторите пароль',
            name: 'password-repeat',
            placeholder: '',
            type: 'password',
            errorMsg: 'Пароли не совпадают',
        },
    },
    buttonName: "Регистрация"
}



export function createRegistration(parent = document.body) {
    parent.innerHTML = '';
    parent.innerHTML += formTemp(regItems);
    parent.innerHTML += createBackButton();
    const regForm = document.getElementsByClassName("regForm");


}