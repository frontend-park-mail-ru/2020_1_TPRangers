import IView from "./IView";
import Observer from "../../controller/observer";

export default class SendPost extends IView {
  render() {
    Observer.emit("post:render");
  }
}
