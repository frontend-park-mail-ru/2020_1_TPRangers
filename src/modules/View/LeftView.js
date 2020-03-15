import IView from './IView';

const leftTmpl = require('../../pug/includes/modules/left-block.pug');

export default class LeftView extends IView {
  render() {
    super.render();
    this.parent.innerHTML += leftTmpl();
  }
}
