import {createLogin} from "./modules/createLogin.js";
import {createMainPage} from "./modules/createMainPage.js"
import {createRegistration} from "./modules/createRegistration.js";
import {createSettings} from "./modules/createSettings.js";
import {createProfile} from "./modules/createProfile.js";
import {MainPage} from "./modules/createMainPage.js"


const app = document.getElementById("application");

app.addEventListener('click', function (evt) {
  const {target} = evt;
  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    routes[target.dataset.section](app);
  }
});

const routes = {
  main: createMainPage(app),
  login: createLogin,
  registration: createRegistration,
  settings: createSettings,
  about: createProfile,
};

createMainPage(app);

