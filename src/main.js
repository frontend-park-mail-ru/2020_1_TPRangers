import MainPage from './modules/createMainPage';
import './css/styles.css';
import './css/normalize.css';
import { routes } from './modules/routes';

const app = document.getElementById('application');
console.log('hello');
MainPage.renderTmpl(app);

const rightBlock = document.getElementById('mainRightBlock');

app.addEventListener('click', evt => {
  const { target } = evt;
  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    routes[target.getAttribute('section')](rightBlock);
  }
});

app.addEventListener('load', event => {
  event.preventDefault();
});

routes.news(rightBlock);
