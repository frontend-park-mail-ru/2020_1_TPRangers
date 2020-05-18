import IView from "./IView";
import { fetchGET } from "../../ajax/ajax";
import { Router } from "../../Routes/routes";
import Observer from "../../controller/observer";

const chatTmpl = require("../../pug/pages/chat.pug");
const stickerTmpl = require("../../pug/mixins/stickerMixin.pug")

export default class DialogView extends IView {
  render() {
    super.clear();
    const chatId = Router.getFragment().split("/")[1];
    fetchGET({
      url:CHAT_IP + "/api/v1/chats/" + chatId,
      callback: response => {
        response.json().then(data => {
          data.main = true;
          console.log(data);
          this.parent.innerHTML += chatTmpl(data); // data
          Observer.emit("dialog:render");
          // Observer.emit("textarea:render", "js-message");
          fetchGET({
            url:BACKEND_IP + "/api/v1/stickers",
            callback: response => {
              response.json().then(response => {
                response.forEach(val => {
                  val.main = true;
                })
                const data = {
                  packs: response
                }
                console.log(data);
                const container = document.getElementById('js-emodji-container');
                container.innerHTML = stickerTmpl(data);
                Observer.emit('dialog:listen-sticker');
              });
            }
          })
        });
      }
    });
  }
}
