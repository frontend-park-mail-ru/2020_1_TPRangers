import IView from './IView';
import {fetchGET} from '../../ajax/ajax';
import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer';

const dialogTmpl = require('../../pug/pages/dialog.pug')

const fakeData = {
  main: true,
  chatInfo: {
    isGroupChat: false,
    chatName: "ChatName",
    chatId: 0,
    chatPhoto: "https://picsum.photos/500",
    chatCounter: 1,
    onlineStatus: true,
    lastMessageAuthorName: "author",
    lastMessageAuthorSurname: "surname",
    lastMessageTxt: "message text"
  },
  chatMessages: [
    {
      chatId: 0,
      chatPhoto: "https://picsum.photos/500",
      chatName: "ChatName",
      authorName: "authorName",
      authorSurname: "Surname",
      authorUrl: "login",
      authorPhoto: "https://picsum.photos/500",
      text: "message text",
      time: "20:00"
    },
    {
      chatId: 0,
      chatPhoto: "https://picsum.photos/500",
      chatName: "ChatName",
      authorName: "authorName",
      authorSurname: "Surname",
      authorUrl: "login",
      authorPhoto: "https://picsum.photos/500",
      text: "second message text",
      time: "20:00"
    },
    {
      chatId: 0,
      chatPhoto: "https://picsum.photos/500",
      chatName: "ChatName",
      authorName: "authorName",
      authorSurname: "Surname",
      authorUrl: "login",
      authorPhoto: "https://picsum.photos/500",
      text: "message text",
      time: "20:00"
    },
    {
      chatId: 0,
      chatPhoto: "https://picsum.photos/500",
      chatName: "ChatName",
      authorName: "authorName",
      authorSurname: "Surname",
      authorUrl: "login",
      authorPhoto: "https://picsum.photos/500",
      text: "second message text",
      time: "20:00"
    },
    {
      chatId: 0,
      chatPhoto: "https://picsum.photos/500",
      chatName: "ChatName",
      authorName: "authorName",
      authorSurname: "Surname",
      authorUrl: "login",
      authorPhoto: "https://picsum.photos/500",
      text: "message text",
      time: "20:00"
    },
    {
      chatId: 0,
      chatPhoto: "https://picsum.photos/500",
      chatName: "ChatName",
      authorName: "authorName",
      authorSurname: "Surname",
      authorUrl: "login",
      authorPhoto: "https://picsum.photos/500",
      text: "second message text",
      time: "20:00"
    }
  ]
}

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
          Observer.emit('dialog:render');
          Observer.emit('textarea:render', 'js-message');
        })
      }
    })
  }
}
