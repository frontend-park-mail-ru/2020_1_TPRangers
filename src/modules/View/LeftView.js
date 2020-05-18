import IView from "./IView";

const leftTmpl = require("../../pug/layout/sidenav.pug");

export default class LeftView extends IView {
  render() {
    super.clear();
    this.parent.innerHTML += leftTmpl();
  }
}
