import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';


const userProfileTmpl = require('../../pug/pages/profile.pug');

export default class ProfileView extends IView{

    render() {
      super.clear();
      fetchGET({
        url: BACKEND_IP + '/api/v1/profile',
        callback: response => {
          response.json().then(response => {
            if (!response.feed)
              response.feed = [];
            if (!response.friends)
              response.friends = [];
            response.page = true
            console.log(response)
            this.parent.innerHTML += userProfileTmpl(response); //response
            Observer.emit('listenPostsLikes');
          })
        }
      });
    }

}


