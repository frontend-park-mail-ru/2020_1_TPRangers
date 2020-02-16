console.log('topkek');

const application = document.getElementById('application');

function createInput(type, text, name) {
	const input = document.createElement('input');
	input.type = type;
	input.name = name;
	input.placeholder = text;

	return input;
}


function ajax(method, url, body = null, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.withCredentials = true;

	xhr.addEventListener('readystatechange', function() {
		if (xhr.readyState !== 4) return;

		callback(xhr.status, xhr.responseText);
	});

	if (body) {
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
		xhr.send(JSON.stringify(body));
		return;
	}

	xhr.send();
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

		ajax('POST', '/signup', {email, age, password}, function (status, responseText) {
			if (status === 201) {
				createProfile();
				return;
			}

			const {error} = JSON.parse(responseText);
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




application.addEventListener('click', function (evt) {
	const {target} = evt;

	if (target instanceof HTMLAnchorElement) {
		evt.preventDefault();
		routes[target.dataset.section]();
	}
});

createSignUp();