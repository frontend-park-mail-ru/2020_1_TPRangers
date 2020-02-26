import MainPage from './modules/createMainPage';
import './css/styles.css';
import './css/normalize.css';
import NewsPage from './modules/newsPage';
import { routes } from './modules/routes';

const app = document.getElementById('application');

MainPage.renderTmpl(app);

const rightBlock = document.getElementById('mainRightBlock');

NewsPage.renderTmpl(rightBlock);

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
