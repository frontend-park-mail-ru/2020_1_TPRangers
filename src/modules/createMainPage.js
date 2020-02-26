// eslint-disable-next-line import/no-unresolved
import { dataForRouting } from './dataForRouting';

const mainPageTmpl = require('../templates/mainPage.pug');

class MainPage {
  set parent(parent) {
    // eslint-disable-next-line no-underscore-dangle
    this._parent = parent;
  }

  get parent() {
    // eslint-disable-next-line no-underscore-dangle
    return this._parent;
  }

  renderTmpl(parent) {
    this.parent = parent;
    this.parent.innerHTML = '';
    this.parent.innerHTML += mainPageTmpl(dataForRouting);
  }
}

export default new MainPage();
