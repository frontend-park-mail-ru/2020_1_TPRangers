import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/pages/createDialog.pug');

export default class CreateDialogView extends IView{
  render() {
    super.clear();
    this.parent.innerHTML += formTmpl();
    Observer.emit("createDialog:render");
  }
}
