/**
 * модуль для отрисовки страницы новостей
 * @module newsTmpl
 */

import { fetchGET } from '../../Ajax/ajax';
import { Router } from '../../Routes/routes';

/**
 * @description Хранит в себе шаблон для страницы
 * @const {function}
 */
const newsTmpl = require('./templates/newsFeedPage.pug');

/**
 * @class CreateNewsPage
 * @classdesc Отрисовывает шаблон  с данными о постах в новостной ленте, которые приодят с сервера
 */
class CreateNewsPage {
  set parent(parent) {
    // eslint-disable-next-line no-underscore-dangle
    this._parent = parent;
  }

  get parent() {
    // eslint-disable-next-line no-underscore-dangle
    return this._parent;
  }

  /**
   *  Отправляет GET запрос на сервер и отрисовывает страницу с новостями в родительском элементе
   *  если ответ от сервера не возвращает ошибку, иначе отрисовывает модуль для отрисовки страницы
   *  с ошибкой
   * @param parent  элемент html страницы, в котором будет происходить отрисовка
   */
  renderTmpl(parent) {
    console.log('lading news Page');
    fetchGET({
      url: 'http://138.68.77.22:3001/api/v1/news',
      callback: response => {
        console.log(response);
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          // ErrorPage.renderTmpl(parent, response.status);
          // routes.login(parent);
          Router.navigate('login');
          return;
        }

        response.json().then(data => {
          console.log(data);
          const toHide = document.getElementsByClassName('logRegLink');
          for (const it in toHide) {
            if (it < 2) {
              toHide[it].style.display = 'none';
            }
          }
          this.parent.innerHTML += newsTmpl(data.body);
        });
      },
    });

    this.parent = parent;
    this.parent.innerHTML = '';
  }
}

/** Возвращает объект класса, у которого можно вызвать параметры для отрисовки */
export default new CreateNewsPage();
