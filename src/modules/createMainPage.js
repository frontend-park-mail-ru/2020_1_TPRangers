/**
 * модуль для отрисовки бокового меню и шапки
 * @module MainPage
 */

// eslint-disable-next-line import/no-unresolved
import { dataForRouting } from './dataForRouting';

/**
 * @description Хранит в себе шаблон для страницы
 * @const {function}
 */
const mainPageTmpl = require('../templates/mainPage.pug');

/**
 * @class  MainPage
 * @classdesc Отрисовывает шаблон для бокового меню и шапри страницы со статическими ссылками
 */
class MainPage {
  set parent(parent) {
    // eslint-disable-next-line no-underscore-dangle
    this._parent = parent;
  }

  get parent() {
    // eslint-disable-next-line no-underscore-dangle
    return this._parent;
  }

  /**
   *  Отрисовывает шаблон для бокового меню и шапри страницы со статическими ссылками
   * @param parent  элемент html страницы, в котором будет происходить отрисовка
   */
  renderTmpl(parent) {
    this.parent = parent;
    this.parent.innerHTML = '';
    this.parent.innerHTML += mainPageTmpl(dataForRouting);
  }
}

/** Возвращает объект класса, у которого можно вызвать параметры для отрисовки */
export default new MainPage();
