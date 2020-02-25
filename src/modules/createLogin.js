import ajax from "./ajax.js";
import createBackButton from "./createBackButton";
import {addValidation} from "./checkFormField";

const formTemp = require('../templates/form.pug')

const loginItems = {
    classes: [
        'loginForm',
    ],
    id: 'loginForm',
    formItems: {
        email: {
            title: 'Логин',
            name: 'email',
            placeholder: 'ivan.ivanov@mail.ru',
            type: 'email',
            regExp: /.+@.+\..+/i,
            errorMsg: 'Некоррекнтый email'
        },
        password: {
            title: 'Пароль',
            name: 'password',
            placeholder: '',
            type: 'password',
            regExp: "123",
            errorMsg: 'Неправильный логин и/или пароль',
        }
    },
    buttonName: 'Войти',
};

export function createLogin(parent = document.body) {
    parent.innerHTML = '';
    parent.innerHTML += formTemp(loginItems);
    parent.innerHTML += createBackButton();
    const loginForm = document.getElementById("loginForm");

   addValidation({
       form: loginForm,
       formItems: loginItems.formItems,
   });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = loginForm.elements['email'].value;
        const password = loginForm.elements['password'].value;



        ajax('POST', '/login', {email,password}, (status, response) => {
            if (status === 200) {
                // createProfile(parent);
                // return;
            } else {
                console.log(JSON.parse(response))
                const {error} = JSON.parse(response);
                alert(error);
            }

        });

    });
}
