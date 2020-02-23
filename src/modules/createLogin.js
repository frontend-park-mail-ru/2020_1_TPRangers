import {createDefaultForm} from "./createForm.js";
import createBackButton from "./createBackButton.js";
import ajax from "./ajax.js";
import {createProfile} from "./createProfile.js";

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
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = form.elements['email'].value;
        const password = form.elements['password'].value;

        ajax('POST', '/login', {email,password}, (status, response) => {
            if (status === 200) {
                createProfile(parent);
                return;
            } else {
                console.log(JSON.parse(response))
                const {error} = JSON.parse(response);
                alert(error);
            }

        });

    });
    parent.appendChild(form);
    const backButton = createBackButton();
    parent.appendChild(backButton);
}
