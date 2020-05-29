import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';


const userProfileTmpl = require('../../pug/pages/profile.pug');

export default class ProfileView extends IView {

  render() {
    super.clear();
    fetchGET({
      url: BACKEND_IP + '/api/v1/profile',
      callback: response => {
        response.json()
          .then(response => {
            console.log(response)
            let date = new Date(Date.parse(response.user.date));
            response.user.date = ('0' + date.getDate()).slice(-2) +  '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
            if (!response.feed) {
              response.feed = [];
            } else {
              response.feed.forEach(val => {
                val.post = true;
                val.isMe = val.authorUrl === response.user.login;
                let date = new Date(Date.parse(val.date));
                val.date =  ('0' + date.getDate()).slice(-2) +  '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()  + ' в ' + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
              });
            }
            if (!response.friends) {
              response.friends = [];
            }
            response.page = true;
            this.parent.innerHTML += userProfileTmpl(response); //response
            Observer.emit('listenPostsLikes');
            Observer.emit('profile:render', response.user.login);
          })
      }
    });
  }

}


