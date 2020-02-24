const mainPageTmpl = require('../templates/mainPage.pug');

const dataForMainPage = {
  data: [
    {
      name: 'Вход',
      link: 'login',
      classes: [
        'mainLink',
      ]
    }, {
      name: 'Регистрация',
      link: 'registration',
      classes:
      [
        'mainLink',
      ]
    }, {
      name: 'Настройки',
      link: 'settings',
      classes:
      [
        'mainLink',
      ]
    }, {
      name: 'О проекте',
      link: 'about',
      classes:
      [
        'mainLink',
      ]
    },
  ]
};


export function createMainPage(parent) {
  parent.innerHTML = '';
  parent.innerHTML += mainPageTmpl(dataForMainPage);
}
