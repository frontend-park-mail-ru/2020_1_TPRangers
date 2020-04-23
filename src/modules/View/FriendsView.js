import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';

const friendsTmpl = require('../../pug/pages/friends.pug');
const friendsList = require('../../pug/includes/modules/friendList.pug')

export default class ProfileView extends IView{

    render() {
      super.clear();

      fetchGET({
        url: BACKEND_IP + '/api/v1/friends',

        callback: response => {
          response.json().then(response => {
            const data = {
              friends: response
            }
            console.log(data);
            this.parent.innerHTML += friendsTmpl(data); // response.body
            this.parent.innerHTML += friendsList(data);
            Observer.emit('friends:render');
          })
        }
      });
    }


}



