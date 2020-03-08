import MainPage from './modules/Main/createMainPage';
import RegistrationPage from './modules/Registration/createRegistration';
import LoginPage from './modules/Login/createLogin';
import './Normalize/css/styles.css';
import './Normalize/css/normalize.css';
import { Router } from './Routes/routes';

/**
 * Находим куда будет рендерится приложение
 * @type {HTMLElement}
 */
const app = document.getElementById('application');
MainPage.renderTmpl(app);

/**
 * Находим куда рендерить части приложения
 * @type {HTMLElement}
 */
const rightBlock = document.getElementById('mainRightBlock');

Router.config({ mode: 'history' });

Router.add(() => {
  console.log('main');
  // LoginPage.renderTmpl(rightBlock);
})
  .add(/login/, () => {
    console.log('login');
    LoginPage.renderTmpl(rightBlock);
  })
  .add(/registration/, () => {
    console.log('registration2');
    RegistrationPage.renderTmpl(rightBlock);
  })
  .listen();

/**
 * Перехват действий ползователя
 */
app.addEventListener('click', evt => {
  const { target } = evt;
  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    Router.navigate(target.getAttribute('section'));
  }
});
