import {createLogin} from "./modules/login.js";
import {createMainPage} from "./modules/createMainPage.js"
import {createProfile} from "./modules/createProfile.js";

const app = document.getElementById("application");

app.addEventListener('click', function (evt) {
  const {target} = evt;
  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    routes[target.dataset.section](app);
  }
});

app.addEventListener('load', (event) => {
  const {target} = event;
  event.preventDefault();
});

const routes = {
  main: createMainPage,
  login: createLogin,
  about: createProfile,
};

createMainPage(app);