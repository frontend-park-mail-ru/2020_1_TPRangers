import IView from './IView';
import {fetchGET} from '../../ajax/ajax';
import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer';

const dialogTmpl = require('../../pug/pages/dialog.pug')
const msgTmpl = require('../../pug/includes/modules/messages.pug')

export default class DialogView extends IView{
  render() {
    super.clear();
    const chatId = Router.getFragment().split('/')[1];
    fetchGET({
      url: BACKEND_IP + '/api/v1/chats/' + chatId,
      callback: response => {
        response.json().then(data => {
          data.main = true;
          console.log(data);
          this.parent.innerHTML += dialogTmpl(data);
          this.parent.innerHTML += msgTmpl(data);
          Observer.emit('dialog:render');
          Observer.emit('textarea:render', 'js-message');
        })
      }
    })
  }
}
