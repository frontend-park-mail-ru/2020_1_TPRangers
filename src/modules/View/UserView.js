import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';

const userProfileTmpl = require('../../pug/pages/user.pug');

export default class UserView extends IView{

    render(id) {
      super.clear();
      fetchGET({
        url: BACKEND_IP + '/api/v1/user/' + id,
        callback: response => {
          response.json().then(response => {
            response.page = true;
            if (!response.feed)
              response.feed = [];
            if (!response.friends)
              response.friends = [];
            console.log(response);
            this.parent.innerHTML += userProfileTmpl(response); //response
            Observer.emit('user:render');
            Observer.emit('listenPostsLikes');
          })
        }
      });
    }

}


