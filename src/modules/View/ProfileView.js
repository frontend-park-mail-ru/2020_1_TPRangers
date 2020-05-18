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
            else {
              response.feed.forEach(val => {
                val.post = true
                if (val.photo.url) {
                  let img = new Image();
                  img.src = val.photo.url;
                  img.onload = function() {
                    val.photo.width = this.width;
                    val.photo.height = this.height;
                  }
                }
              })
            }
            if (!response.friends)
              response.friends = [];
            response.page = true
            console.log(response)
            this.parent.innerHTML += userProfileTmpl(response); //response
            Observer.emit('listenPostsLikes');
            Observer.emit('profile:render', response.user.login);
          })
        }
      });
    }

}


