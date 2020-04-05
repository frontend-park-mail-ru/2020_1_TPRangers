import IView from './IView';

const leftTmpl = require('../../pug/includes/modules/left-block.pug');

export default class LeftView extends IView {
  render() {
    super.clear();
    this.parent.innerHTML += leftTmpl();



  }
}
