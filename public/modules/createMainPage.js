import createLinks from "./create_links.js";

const dataForMainPage = {
  login: {
    name: 'Вход',
    link: "login",
    cl: 'main_link',
  },
  registration: {
    name: 'Регистрация',
    link: "registration",
    cl: 'main_link',
  },
  about: {
    name: 'О проекте',
    link: "about",
    cl: 'main_link',
  },
};

export function createMainPage(parent) {
  parent.innerHTML = '';
  Object.values(dataForMainPage).forEach(function (key, val) {
    parent.appendChild(createLinks(key));
  });
}
