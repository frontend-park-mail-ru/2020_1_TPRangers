import { fetchGET } from './ajax';
import ErrorPage from './errorPage';
import { routes } from './routes';

const newsTmpl = require('../templates/newsFeedPage.pug');

class CreateNewsPage {
  set parent(parent) {
    // eslint-disable-next-line no-underscore-dangle
    this._parent = parent;
  }

  get parent() {
    // eslint-disable-next-line no-underscore-dangle
    return this._parent;
  }

  renderTmpl(parent) {
    fetchGET({
      url: 'http://138.68.77.22:3001/api/v1/news',
      callback: response => {
        console.log(response);
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          // ErrorPage.renderTmpl(parent, response.status);
          routes.login(parent);
          return;
        }

        response.json().then(data => {
          console.log(data);
          const toHide = document.getElementsByClassName('logRegLink');
          for (let it in toHide) {
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

export default new CreateNewsPage();
