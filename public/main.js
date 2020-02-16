console.log('topkek');

const application = document.getElementById('application');

const menuItems = {
	signup: 'Регистрация',
	login: 'Авторизация',
	profile: 'Профиль',
	about: 'О себе',
};

function createInput(type, text, name) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = text;

    return input;
}

function createMenu() {
	application.innerHTML = '';
	Object.keys(menuItems).forEach(function (key) {
		const menuItem = document.createElement('a');
		menuItem.textContent = menuItems[key];
		menuItem.href = `/${key}`;
		menuItem.dataset.section = key;

		application.appendChild(menuItem);
	});
}

function ajax(method, url, body = null, callback) {

    console.log(method)
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function() {

        callback(xhr.status, xhr.responseText);
    });

    if (body) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(body));
        return;
    }

    xhr.send();

}


function createProfile() {
    application.innerHTML = '';
    ajax('GET', '/profile', null, function(status, responseText) {

    });
}

function createSignUp() {
    application.innerHTML = '';
    const form = document.createElement('form');

    const emailInput = createInput('email', 'Емайл', 'email');
    const passwordInput = createInput('password', 'Пароль', 'password');
    const ageInput = createInput('number', 'Возраст', 'age');

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Зарегистрироваться!';

    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(ageInput);
    form.appendChild(submitBtn);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = form.elements['email'].value;
        const age = parseInt(form.elements['age'].value);
        const password = form.elements['password'].value;

        ajax('POST', '/signup', { email, age, password }, function(status, responseText) {
            console.log(status)
            if (status === 201) {
                createProfile();
                return;
            }

            const { error } = JSON.parse(responseText);
            alert(error);
        })
    });

    const back = document.createElement('a');
    back.href = '/menu';
    back.textContent = 'Назад';
    back.dataset.section = 'menu';

    application.innerHTML = '';
    application.appendChild(form);
    application.appendChild(back);
}

function createLogin() {
	application.innerHTML = '';
	const form = document.createElement('form');

	const emailInput = createInput('email', 'Емайл', 'email');
	const passwordInput = createInput('password', 'Пароль', 'password');

	const submitBtn = document.createElement('input');
	submitBtn.type = 'submit';
	submitBtn.value = 'Авторизироваться!';

	form.appendChild(emailInput);
	form.appendChild(passwordInput);
	form.appendChild(submitBtn);

	const back = document.createElement('a');
	back.href = '/menu';
	back.textContent = 'Назад';
	back.dataset.section = 'menu';

	form.addEventListener('submit', function(e) {
		e.preventDefault();

		const email = emailInput.value.trim();
		const password = passwordInput.value.trim();

		ajax(
			'POST',
			'/login',
			{email, password},
			function (status, response) {
				if (status === 200) {
					createProfile();
				} else {
					const {error} = JSON.parse(response);
					alert(error);
				}
			}
		)

	});

	application.appendChild(form);
	application.appendChild(back);
}




const routes = {
	menu: createMenu,
	signup: createSignUp,
	login: createLogin,
	profile: createProfile,
	about: null,
};

application.addEventListener('click', function(evt) {
    const { target } = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        routes[target.dataset.section]();
    }
});

createMenu();