import IView from "./IView";
import Observer from "../../controller/observer";
import { fetchGET } from "../../ajax/ajax";

const friendsTmpl = require("../../pug/pages/friends.pug");

export default class ProfileView extends IView {
  render() {
    super.clear();

    fetchGET({
      url: BACKEND_IP + "/api/v1/friends",

      callback: response => {
        response.json().then(response => {
          const data = {
            main: true,
            friends: response,
            otherUsers: []
          };
          console.log(data);
          this.parent.innerHTML += friendsTmpl(data); // data
          Observer.emit("profile:render", response);
        });
      }
    });
  }
}
