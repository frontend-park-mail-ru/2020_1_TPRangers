import IView from "./IView";
import { fetchGET } from "../../ajax/ajax";
import { Router } from "../../Routes/routes";
import Observer from "../../controller/observer";

const chatTmpl = require("../../pug/pages/chat.pug");

const fakeData = {
  main: true,

  chatInfo: {
    isGroupChat: true,
    chatId: 1,
    chatCounter: 0,
    statusOnline: true,
    chatName: "Yuck, salty halitosis!",
    chatPhoto: "https://picsum.photos/500",
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
      authorPhoto: "https://picsum.photos/300",
      text: "Привет, как твои дела, все хорошо?",
      time: "string",
      isMe: true
    },
    {
      chatId: "string",
      chatPhoto: "string",
      chatName: "string",
      authorName: "string",
      authorSurname: "string",
      authorUrl: "string",
      authorPhoto: "https://picsum.photos/500/100",
      text: "Да, все прекрасно, а у тебя?",
      time: "string",
      isMe: false
    },
    {
      chatId: "string",
      chatPhoto: "string",
      chatName: "string",
      authorName: "string",
      authorSurname: "string",
      authorUrl: "string",
      authorPhoto: "https://picsum.photos/500/100",
      text:
        "Lamias potus in quadrata!The ugly c-beam proudly imitates the admiral.Refrigerate cored cucumbers in a wok with ricotta for about an hour to chamfer their pepperiness.",
      time: "string",
      isMe: false
    },
    {
      chatId: "string",
      chatPhoto: "string",
      chatName: "string",
      authorName: "string",
      authorSurname: "string",
      authorUrl: "string",
      authorPhoto: "https://picsum.photos/300",
      text:
        "Lamias potus in quadrata!The ugly c-beam proudly imitates the admiral.Refrigerate cored cucumbers in a wok with ricotta for about an hour to chamfer their pepperiness.",
      time: "string",
      isMe: true
    },
    {
      chatId: "string",
      chatPhoto: "string",
      chatName: "string",
      authorName: "string",
      authorSurname: "string",
      authorUrl: "string",
      authorPhoto: "https://picsum.photos/300",
      text:
        "Lamias potus in quadrata!The ugly c-beam proudly imitates the admiral.Refrigerate cored cucumbers in a wok with ricotta for about an hour to chamfer their pepperiness.",
      time: "string",
      isMe: true
    }
  ]
};

export default class DialogView extends IView {
  render() {
    super.clear();
    const chatId = Router.getFragment().split("/")[1];
    fetchGET({
      url: BACKEND_IP + "/api/v1/chats/" + chatId,
      callback: response => {
        response.json().then(data => {
          data.main = true;
          console.log(data);

          this.parent.innerHTML += chatTmpl(fakeData); // data
          // Observer.emit("dialog:render");
          // Observer.emit("textarea:render", "js-message");
        });
      }
    });
  }
}
