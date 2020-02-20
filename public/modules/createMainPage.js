import createLinks from "./createLinks.js";

let menuStaff = {
login: {
  name: 'Вход',
    link: 'login',
  cl: 'main_link',
},
reg: {
  name: 'Регистрация',
    link: 'registration',
  cl: 'main_link',
},
set: {
  name: 'Настройки',
    link: 'settings',
  cl: 'main_link',
},
about: {
  name: 'О проекте',
    link: 'about',
  cl: 'main_link',
},
};

export function createMainPage(parent) {
  let menu = document.createElement('div');
  menu.classList.add('mainMenu');
  Object.values(menuStaff).forEach(function (item) {
    menu.innerHTML += createLinks(item);
  });
  parent.appendChild(menu);
}

