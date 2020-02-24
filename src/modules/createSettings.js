const formTmpl = require('../templates/form.pug');

const settingsItems = {
  classes: ['settingsForm'],
  id: 'settingsForm',
  formItems: {
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
      type: 'text',
    },
    password: {
      title: 'Пароль',
      name: 'password',
      placeholder: '',
      type: 'password',
    },
  },
  buttonName: 'Обновить профиль',
};

export default function createSettings(parent = document.body) {
  parent.innerHTML = '';
  parent.innerHTML += formTmpl(settingsItems);
  const settingsForm = document.getElementById('settingsForm');
}
