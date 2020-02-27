import { fetchGET } from './ajax';
import ErrorPage from './errorPage';

const profileTmpl = require('../templates/profile.pug');

class ProfilePage {
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
          console.log(data);
          for (const elem in data.body.feed) {
            console.log(data.body.feed[elem]);
          }
          data.body.user.isMe = true;
          console.log(data.body);
          this.parent.innerHTML += profileTmpl(data.body);
        });
      },
    });
  }
}

export default new ProfilePage();
