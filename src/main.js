import MainPage from './modules/Main/createMainPage';
import './Normalize/css/styles.css';
import './Normalize/css/normalize.css';
import { routes } from './Routes/routes';

/**
 * Находим куда будет рендерится приложение
 * @type {HTMLElement}
 */
const app = document.getElementById('application');
/**
 * header & left block render
 */
MainPage.renderTmpl(app);

/**
 * Находим куда рендерить части приложения
 * @type {HTMLElement}
 */
const rightBlock = document.getElementById('mainRightBlock');

/**
 * Перехват действий пользователя
 */
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
