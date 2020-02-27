import MainPage from './createMainPage';
// eslint-disable-next-line import/no-cycle
import LoginPage from './createLogin';
// eslint-disable-next-line import/no-cycle
import RegistrationPage from './createRegistration';
import SettingsPage from './createSettings';
import ProfilePage from './createProfile';
import NewsPage from './createNewsPage';
import ErrorPage from './errorPage';
import UserPage from './createUserPage';

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
