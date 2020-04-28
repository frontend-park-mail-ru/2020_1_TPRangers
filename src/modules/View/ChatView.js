import IView from "./IView";
import { fetchGET } from "../../ajax/ajax";

const chatTmpl = require("../../pug/pages/chat.pug");

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
      lastMessageAuthorAvatar: "https://picsum.photos/200/300",
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
      lastMessageAuthorAvatar: "https://picsum.photos/200/300",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    },
    {
      isGroupChat: true,
      chatName: "ChatName",
      chatId: 1,
      chatPhoto: "https://picsum.photos/500",
      chatCounter: 1,
      onlineStatus: true,
      lastMessageAuthorName: "Name",
      lastMessageAuthorAvatar: "https://picsum.photos/200/300",
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
      lastMessageAuthorAvatar: "https://picsum.photos/200/300",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    },
    {
      isGroupChat: true,
      chatName: "ChatName",
      chatId: 1,
      chatPhoto: "https://picsum.photos/500",
      chatCounter: 1,
      onlineStatus: true,
      lastMessageAuthorName: "Name",
      lastMessageAuthorPhoto: "https://picsum.photos/200/300",
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
      lastMessageAuthorPhoto: "https://picsum.photos/200/300",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    },
    {
      isGroupChat: true,
      chatName: "ChatName",
      chatId: 1,
      chatPhoto: "https://picsum.photos/500",
      chatCounter: 1,
      onlineStatus: true,
      lastMessageAuthorName: "Name",
      lastMessageAuthorPhoto: "https://picsum.photos/200/300",
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
      lastMessageAuthorPhoto: "https://picsum.photos/200/300",
      lastMessageAuthorSurname: "Surname",
      lastMessageTxt: "Last message"
    }
  ],

  chatInfo: {
    isGroupChat: true,
    chatId: "string",
    chatCounter: 0,
    statusOnline: true,
    chatName: "string",
    chatPhoto: "string",
    privateName: "string",
    privateSurname: "string",
    privateUrl: "string"
  },

  chatMessages: [
    {
      chatId: "string",
      chatPhoto: "string",
      chatName: "string",
      authorName: "string",
      authorSurname: "string",
      authorUrl: "string",
      authorPhoto: "string",
      text: "string",
      time: "string",
      isMe: true
    }
  ]
};

export default class MessagesView extends IView {
  render() {
    super.clear();
    fetchGET({
      url: BACKEND_IP + "/api/v1/chats",
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
          this.parent.innerHTML += chatTmpl(fakeData); // data
        });
      }
    });
  }
}
