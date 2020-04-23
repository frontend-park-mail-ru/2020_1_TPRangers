import IView from './IView';
import {fetchGET} from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

export default class DialogView extends IView{
  render() {
    super.clear();
    const chatId = Router.getFragment().split('/')[1];
    fetchGET({
      url: BACKEND_IP + '/api/v1/chats/' + chatId,
      callback: response => {
        response.json().then(data => {
          console.log(data);
          this.parent.innerHTML += `<h1>Чат номер ${chatId}</h1>`;
        })
      }
    })
  }
}
