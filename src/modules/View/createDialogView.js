import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';

const formTmpl = require('../../pug/pages/createDialog.pug');


export default class CreateDialogView extends IView{
  render() {
    super.clear();
    fetchGET({
      url: BACKEND_IP + '/api/v1/friends',

      callback: response => {
        response.json().then(response => {
          const data = {
            main:true,
            friends: response,
            canAdd: true
          }
          console.log(data)
          this.parent.innerHTML += formTmpl(data);
          Observer.emit('createDialogFriends:render');
          Observer.emit('createDialog:addListener');
          Observer.emit("createDialog:render");
        })
      }
    });
  }
}
