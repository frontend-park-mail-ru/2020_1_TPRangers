import mainPageTmp from '../templates/mainPage.pug'

const dataForMainPage = {
  login: {
    name: 'Вход',
    link: 'login',
    cl: 'main_link',
  },
  registration: {
    name: 'Регистрация',
    link: 'registration',
    cl: 'main_link',
  },
  settings: {
    name: 'Настройки',
    link: 'settings',
    cl: 'main_link',
  },
  about: {
    name: 'О проекте',
    link: 'about',
    cl: 'main_link',
  },
};



class MainPage {
  render() {
    return mainPageTmp.call({}, dataForMainPage);
  }
}

export function createMainPage(parent) {
  let mainP = new MainPage();
  let test = mainP.render();
  console.log(test);
  parent.innerHTML = test;
}
