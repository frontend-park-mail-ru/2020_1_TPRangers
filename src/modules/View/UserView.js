import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

const userProfileTmpl = require('../../pug/pages/user.pug');

export default class UserView extends IView {

  render(id) {
    fetchGET({
      url: BACKEND_IP + '/api/v1/profile',
      callback: profileResp => {
        profileResp.json()
          .then(profileResp => {
            fetchGET({
              url: BACKEND_IP + '/api/v1/user/' + id,
              callback: response => {
                response.json()
                  .then(response => {
                    response.page = true;
                    if (!response.feed) {
                      response.feed = [];
                    }
                    if (!response.friends) {
                      response.friends = [];
                    }
                    response.friends.forEach(val => {
                      val.isMe = val.url === profileResp.user.login;
                    })
                    response.feed.forEach(val => {
                      val.post = true;
                      val.isMe = val.authorUrl === profileResp.user.login;
                      let date = new Date(Date.parse(val.date));
                      val.date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' в ' + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
                    });
                    response.page = true;
                    super.clear();
                    this.parent.innerHTML += userProfileTmpl(response);
                    Observer.emit('user:render');
                    Observer.emit('listenPostsLikes');
                  });
              }
            });
          });
      }
    });
  }

}


