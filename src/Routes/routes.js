/**
 * модуль хранящий в себе роутинг проекта
 * @module routes
 */

import MainPage from '../modules/Main/createMainPage';
// eslint-disable-next-line import/no-cycle
import LoginPage from '../modules/Login/createLogin';
// eslint-disable-next-line import/no-cycle
import RegistrationPage from '../modules/Registration/createRegistration';
import SettingsPage from '../modules/Settings/createSettings';
import ProfilePage from '../modules/Profile/createProfile';
// eslint-disable-next-line import/no-cycle
import NewsPage from '../modules/News/createNewsPage';
import ErrorPage from '../modules/Error/errorPage';
import UserPage from '../modules/User/createUserPage';

/**
 * @description Настройка роутов для проекта, вызов различных функций для разных рутов
 * @const {
 *   routName: routeFunction
 * }
 */
// eslint-disable-next-line import/prefer-default-export
export const routes = {
  main: MainPage.renderTmpl,
  login: LoginPage.renderTmpl,
  registration: RegistrationPage.renderTmpl,
  settings: SettingsPage.renderTmpl,
  profile: ProfilePage.renderTmpl,
  news: NewsPage.renderTmpl,
  err: ErrorPage.renderTmpl,
  user: UserPage.renderTmpl,
};
