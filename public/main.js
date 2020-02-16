import createLinks from "./modules/create_links.js";
import {createLogin} from "./modules/login.js";
import {createRegistration} from "./modules/createRegistration.js";

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

const routes = {
  login: createLogin,
  registration: createRegistration,
  about: null,
};

function createMainPage() {
  let app = document.getElementById("application")
  createLinks(dataForMainPage, app);

  app.addEventListener('click', function (evt) {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
      evt.preventDefault();
      routes[target.dataset.section]();
    }
  });
}

createMainPage();



