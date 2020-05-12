import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';

// const formTmpl = require('../../pug/pages/createDialog.pug');
// const friendsTmpl = require('../../pug/pages/friendsCreateDialog.pug');
// const friendsList = require('../../pug/includes/modules/createDialogFriendList.pug')

export default class CreateDialogView extends IView{
  render() {
    super.clear();
    this.parent.innerHTML += formTmpl();
    fetchGET({
      url: BACKEND_IP + '/api/v1/friends',

      callback: response => {
        response.json().then(response => {
          const data = {
            friends: response
          }
          // this.parent.innerHTML += friendsTmpl(data); // response.body
          // this.parent.innerHTML += friendsList(data);
          Observer.emit('createDialogFriends:render');
          Observer.emit('createDialog:addListener');
          Observer.emit("createDialog:render");
        })
      }
    });
  }
}
