import {ajax} from "./ajax.js";
import createBackButton from "./createBackButton";

const formTemp = require('../templates/form.pug');

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
        },
        password: {
            title: 'Пароль',
            name: 'password',
            placeholder: '',
            type: 'password'
        }
    },
    buttonName: 'Войти'
};

export function createLogin(parent = document.body) {
    parent.innerHTML = '';
    parent.innerHTML += formTemp(loginItems);

    parent.innerHTML += createBackButton();

    const loginForm = document.getElementById("loginForm");
    console.log(loginForm);
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = loginForm.elements['email'].value;
        const password = loginForm.elements['password'].value;



        // ajax('POST', '/login', {email,password}, (status, response) => {
        //     if (status === 200) {
        //         // createProfile(parent);
        //         // return;
        //     } else {
        //         console.log(JSON.parse(response))
        //         const {error} = JSON.parse(response);
        //         alert(error);
        //     }
        //
        // });

        // fetch('http://localhost:3001/login', {
        //     method: 'POST',
        //     credentials: "same-origin",
        //     mode: 'cors'
        // }).then(
        //     function(response) {
        //         if (response.status !== 200) {
        //             console.log('Looks like there was a problem. Status Code: ' +
        //                 response.status);
        //             return;
        //         }
        //         response.json().then(function(data) {
        //             console.log(data);
        //         });            }
        // )
        //     .catch(function(err) {
        //         console.log('Fetch Error :-S', err);
        //     });

        //

        FetchModule.fetchPOST({url: 'http://localhost:3001/login', body: {name: 'Hello, world'},callback: response => {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }
                        response.json().then(function(data) {
                            console.log(data);
                        });            }})

    });
}
