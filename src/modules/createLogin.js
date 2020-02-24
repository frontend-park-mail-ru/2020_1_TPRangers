import ajax from "./ajax.js";
import createBackButton from "./createBackButton";

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
            errorMsg: 'Некоррекнтый email'
        },
        password: {
            title: 'Пароль',
            name: 'password',
            placeholder: '',
            type: 'password',
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

    loginForm.elements['email'].addEventListener('input', function () {
        let errEmail = document.getElementById("error-email");
        if (/.+@.+\..+/i.test(loginForm.elements['email'].value) || loginForm.elements['email'].value==='') {
            errEmail.classList.remove('visible');
            errEmail.classList.add('hidden');
        } else {
            errEmail.classList.remove('hidden');
            errEmail.classList.add('visible');
        }
    });

    loginForm.elements['password'].addEventListener('input', function () {
        let errPass = document.getElementById("error-password");
        if (loginForm.elements['password'].value === '123' || loginForm.elements['password'].value==='') {
            errPass.classList.remove('visible');
            errPass.classList.add('hidden');
        } else {
            errPass.classList.remove('hidden');
            errPass.classList.add('visible');
        }
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
