import {createMainPage} from "./modules/createMainPage";
import {createLogin} from "./modules/createLogin";
import {createRegistration} from "./modules/createRegistration";
import {createSettings} from "./modules/createSettings";
import  "./css/styles.css"
import  "./css/normalize.css"
import {createProfile} from "./modules/createProfile";
import {dataForRouting} from "./modules/dataForRouting";
import {createNewsPage} from "./modules/newsPage"

const app = document.getElementById("application");

app.addEventListener('click', function (evt) {
  const {target} = evt;
  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    routes[target.getAttribute('section')](rightBlock);
  }
});

app.addEventListener('load', (event) => {
  const {target} = event;
  console.log(target)
  event.preventDefault();
});

createMainPage(app, dataForRouting);

const rightBlock = document.getElementById('mainRightBlock');

const routes = {
  main: createMainPage,
  login: createLogin,
  registration: createRegistration,
  settings: createSettings,
  profile: createProfile,
  news: createNewsPage,
};

createNewsPage(rightBlock);
