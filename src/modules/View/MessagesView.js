import IView from "./IView";
import { fetchGET } from "../../ajax/ajax";

const messagesTmpl = require("../../pug/pages/messages.pug");

const fakeData = {
  main: true,

  dialogs: [
    {
      isGroupChat: true,
      chatName: "ChatName",
      chatId: 1,
      chatPhoto: "https://picsum.photos/500",
      chatCounter: 1,
      onlineStatus: true,
      lastMessageAuthorName: "Name",
      lastMessageAuthorPhoto: "https://picsum.photos/400",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    },
    {
      isGroupChat: false,
      chatName: "ChatName",
      chatId: 2,
      chatPhoto: "https://picsum.photos/500",
      chatCounter: 0,
      onlineStatus: false,
      lastMessageAuthorName: "Name",
      lastMessageAuthorPhoto: "https://picsum.photos/300",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    },
    {
      isGroupChat: true,
      chatName: "ChatName",
      chatId: 3,
      chatPhoto: "https://picsum.photos/500",
      chatCounter: 1,
      onlineStatus: true,
      lastMessageAuthorName: "Name",
      lastMessageAuthorPhoto: "https://picsum.photos/100",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    },
    {
      isGroupChat: false,
      chatName: "ChatName",
      chatId: 4,
      chatPhoto: "https://picsum.photos/500",
      chatCounter: 0,
      onlineStatus: false,
      lastMessageAuthorName: "Name",
      lastMessageAuthorPhoto: "https://picsum.photos/400/100",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    },
    {
      isGroupChat: true,
      chatName: "ChatName",
      chatId: 5,
      chatPhoto: "https://picsum.photos/500",
      chatCounter: 1,
      onlineStatus: true,
      lastMessageAuthorName: "Name",
      lastMessageAuthorPhoto: "https://picsum.photos/100/300",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    },
    {
      isGroupChat: false,
      chatName: "ChatName",
      chatId: 6,
      chatPhoto: "https://picsum.photos/500",
      chatCounter: 0,
      onlineStatus: false,
      lastMessageAuthorName: "Name",
      lastMessageAuthorPhoto: "https://picsum.photos/200",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    },
    {
      isGroupChat: true,
      chatName: "ChatName",
      chatId: 7,
      chatPhoto: "https://picsum.photos/500",
      chatCounter: 1,
      onlineStatus: true,
      lastMessageAuthorName: "Name",
      lastMessageAuthorPhoto: "https://picsum.photos/200",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    },
    {
      isGroupChat: false,
      chatName: "ChatName",
      chatId: 8,
      chatPhoto: "https://picsum.photos/500",
      chatCounter: 0,
      onlineStatus: false,
      lastMessageAuthorName: "Name",
      lastMessageAuthorPhoto: "https://picsum.photos/200",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    }
  ]
};

export default class MessagesView extends IView {
  render() {
    super.clear();
    fetchGET({
      url:CHAT_IP + "/api/v1/chats",
      callback: response => {
        response.json().then(response => {
          response.forEach(elem => {
            if (elem.lastMessageTime) {
              const date = new Date(Date.parse(elem.lastMessageTime));
              elem.lastMessageTime = date.toLocaleTimeString();
            }
          });
          console.log(response);
          const data = {
            main: true,
            dialogs: response
          };

          this.parent.innerHTML += messagesTmpl(data); // data
        });
      }
    });
  }
}
