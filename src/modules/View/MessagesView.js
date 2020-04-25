import IView from './IView';
import {fetchGET} from '../../ajax/ajax';

const messagesTmpl = require('../../pug/pages/messages.pug');

const fakeData = [
  {
  isGroupChat: true,
  chatName: "ChatName",
  chatId: 1,
  chatPhoto: "https://picsum.photos/500",
  chatCounter: 1,
  onlineStatus: true,
  lastMessageAuthorName: "Name",
  lastMessageAuthorSurname: "Surname",
  lastMessageTxt: "Last message"
  },
  {
    isGroupChat: false,
    chatName: "ChatName",
    chatId: 1,
    chatPhoto: "https://picsum.photos/500",
    chatCounter: 0,
    onlineStatus: false,
    lastMessageAuthorName: "Name",
    lastMessageAuthorSurname: "Surname",
    lastMessageTxt: "Last message"
  }
]

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
            dialogs: fakeData,
          }
          this.parent.innerHTML += messagesTmpl(data)
        })
      }
    })
  }
}
