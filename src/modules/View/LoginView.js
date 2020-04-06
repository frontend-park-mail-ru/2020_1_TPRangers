import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/pages/login.pug');


export default class LoginView extends IView{
  render() {
    super.clear();
    this.parent.innerHTML += formTmpl();
    Observer.emit('login:render');
  }
}
