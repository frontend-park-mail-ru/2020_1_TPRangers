import IView from './IView';
import {fetchGET} from '../../ajax/ajax';

const messagesTmpl = require('../../pug/pages/messages.pug');

export default class MessagesView extends IView{
  render() {
    super.clear()
    fetchGET({
      url: BACKEND_IP+'/api/v1/chats',
      callback: response => {
        response.json().then(response => {
          console.log(response);
          const data = {
            main: true,
            dialogs: response,
          }
          this.parent.innerHTML += messagesTmpl(data)
        })
      }
    })
  }
}
