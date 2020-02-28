/**
 * модуль для отрисовки страницы ошибки, которая приходит с сервера
 * @module ErrorPage
 */

/**
 * @description Хранит в себе шаблон для страницы
 * @const {function}
 */
const errorTmpl = require('../templates/errorPage.pug');

/**
 * @class ErrorPage
 * @classdesc Отрисовывает шаблон  с ошибкой, пришедшей с сервера
 */
class ErrorPage {
  set parent(parent) {
    // eslint-disable-next-line no-underscore-dangle
    this._parent = parent;
  }

  get parent() {
    // eslint-disable-next-line no-underscore-dangle
    return this._parent;
  }

  /**
   *  Отрисовывает шаблон  с полученными  с сервера данными в родительском элементе
   * @param parent  элемент html страницы, в котором будет происходить отрисовка
   */
  renderTmpl(parent) {
    this.parent = parent;
    this.parent.innerHTML = '';
    const body = {
      errStatus: 500,
    };
    this.parent.innerHTML += errorTmpl(body);
  }
}

/** Возвращает объект класса, у которого можно вызвать параметры для отрисовки */
export default new ErrorPage();
