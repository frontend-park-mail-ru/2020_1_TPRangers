import MainPage from './createMainPage';
import LoginPage from './createLogin';
import RegistrationPage from './createRegistration';
import SettingsPage from './createSettings';
import ProfilePage from './createProfile';
import NewsPage from './newsPage';

// eslint-disable-next-line import/prefer-default-export
export const routes = {
  main: MainPage.renderTmpl,
  login: LoginPage.renderTmpl,
  registration: RegistrationPage.renderTmpl,
  settings: SettingsPage.renderTmpl,
  profile: ProfilePage.renderTmpl,
  news: NewsPage.renderTmpl,
};
