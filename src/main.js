import createMainPage from './modules/createMainPage';
import './css/styles.css';
import './css/normalize.css';
import { dataForRouting } from './modules/dataForRouting';
import createNewsPage from './modules/newsPage';
import { routes } from './modules/routes';



const app = document.getElementById('application');

createMainPage(app, dataForRouting);

const rightBlock = document.getElementById('mainRightBlock');

createNewsPage(rightBlock);

app.addEventListener('click', evt => {
  const { target } = evt;
  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    routes[target.getAttribute('section')](rightBlock);
  }
});

app.addEventListener('load', event => {
  const { target } = event;
  event.preventDefault();
});
