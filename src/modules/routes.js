import createMainPage from './createMainPage';
import { createLogin } from './createLogin';
import createRegistration from './createRegistration';
import createSettings from './createSettings';
import createProfile from './createProfile';
import createNewsPage from './newsPage';

export const routes = {
  main: createMainPage,
  login: createLogin,
  registration: createRegistration,
  settings: createSettings,
  profile: createProfile,
  news: createNewsPage,
};
