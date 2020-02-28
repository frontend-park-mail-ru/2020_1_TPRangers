import { fetchGET } from './ajax';
import ErrorPage from './errorPage';

const profileTmpl = require('../templates/profile.pug');

/**
 * Класс для рендера профиля пользователя
 */
class ProfilePage {
  set parent(parent) {
    // eslint-disable-next-line no-underscore-dangle
    this._parent = parent;
  }

  get parent() {
    // eslint-disable-next-line no-underscore-dangle
    return this._parent;
  }

  /**
   * Рендер шаблона профиля пользователя
   * @DOM-Object parent
   */
  renderTmpl(parent) {
    this.parent = parent;
    this.parent.innerHTML = '';
    /**
     * GET запрос для получения данных о пользователе
     */
    fetchGET({
      url: 'http://138.68.77.22:3001/api/v1/profile',
      callback: response => {
        console.log(response);
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          ErrorPage.renderTmpl(parent, response.status);
          return;
        }

        response.json().then(data => {
          /**
           * В случае успешного ответа рендер профиля пользователя
           */
          data.body.user.isMe = true;
          console.log(data.body);
          const toHide = document.getElementsByClassName('logRegLink');
          for (const it in toHide) {
            if (it < 2) {
              toHide[it].style.display = 'none';
            }
          }
          data.body.user.Photo = 'https://picsum.photos/200';
          this.parent.innerHTML += profileTmpl(data.body);
        });
      },
    });
  }
}

export default new ProfilePage();
