const errorTmpl = require('../templates/errorPage.pug');

class ErrorPage {
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
    const body = {
      errStatus: 400,
    };
    this.parent.innerHTML += errorTmpl(body);
  }
}

export default new ErrorPage();
