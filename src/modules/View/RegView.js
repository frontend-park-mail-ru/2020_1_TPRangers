import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/pages/registration.pug');

export default class RegView extends IView{
  render() {
    super.render();
    this.parent.innerHTML += formTmpl();
    Observer.emit('reg:render');
  }
}
