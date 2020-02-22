const dataForMainPage = [
  {
    name: 'Вход',
    link: 'login',
    cl: 'main_link',
  },
  {
    name: 'Регистрация',
    link: 'registration',
    cl: 'main_link',
  },
  {
    name: 'Настройки',
    link: 'settings',
    cl: 'main_link',
  },
  {
    name: 'О проекте',
    link: 'about',
    cl: 'main_link',
  },
];

export function createMainPage(parent) {
  parent.innerHTML = '';
  let mainPage = new MainPage();
  parent.innerHTML = mainPage.render();
}

class MainPage {
  _data = dataForMainPage;

  get data() {
    return this._data;
  }

  set data(d) {
    this._data = d;
  }

  _renderTmpl() {
    return window.fest['components/mainPage/startPage.tmpl'](this._data)
  }

  render() {
    return this._renderTmpl()
  }
}