import {createMainPage} from "./modules/createMainPage";
import {createLogin} from "./modules/createLogin";
import {createRegistration} from "./modules/createRegistration";
import {createSettings} from "./modules/createSettings";
import  "./css/styles.css"
import  "./css/normalize.css"


const app = document.getElementById("application");

app.addEventListener('click', function (evt) {
  const {target} = evt;
  console.log(evt)
  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    console.log(target.pathname);
  }
});

app.addEventListener('load', (event) => {
  const {target} = event;
  console.log(target)
  event.preventDefault();
});

const routes = {
  main: createMainPage,
  login: createLogin
};

createMainPage(app);
