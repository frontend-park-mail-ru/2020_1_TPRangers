import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';
import {Router} from '../../Routes/routes';

const userProfileTmpl = require('../../pug/pages/user.pug');

export default class UserView extends IView{

    render(id) {
      fetchGET({
        url: BACKEND_IP + '/api/v1/user/' + id,
        callback: response => {
          response.json().then(response => {
            response.page = true;
            if (!response.feed) {
              response.feed = [];
            }
            if (!response.friends)
              response.friends = [];
            console.log(response);
            response.page = true;
            super.clear();
            this.parent.innerHTML += userProfileTmpl(response);
            Observer.emit('user:render');
            Observer.emit('listenPostsLikes');
          })
        }
      });
    }

}


