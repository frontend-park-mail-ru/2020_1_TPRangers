import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/pages/register.pug');

export default class RegView extends IView{
  render() {
    super.clear();
    this.parent.innerHTML += formTmpl();
    Observer.emit('reg:render');
  }
}
