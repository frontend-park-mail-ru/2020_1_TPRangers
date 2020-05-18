import IView from "./IView";
import Observer from "../../controller/observer";
import { fetchGET } from "../../ajax/ajax";

const friendsTmpl = require("../../pug/pages/friends.pug");
const otherUserList = require('../../pug/mixins/otherUsersList.pug');

export default class ProfileView extends IView {
  render() {

      fetchGET({
        url: BACKEND_IP + '/api/v1/friends',

      callback: response => {
        response.json().then(response => {
          const data = {
            main: true,
            friends: response,
            otherUsers: []
          };
          console.log(data);
          super.clear();
          this.parent.innerHTML += friendsTmpl(data);
          this.parent.innerHTML += otherUserList(data);
          Observer.emit("friends:render", response);
        });
      }
    });
  }
}


