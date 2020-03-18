import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/pages/loginForm.pug');


export default class LoginView extends IView{
  render() {
    super.render();
    this.parent.innerHTML += formTmpl();
    Observer.emit('login:render');
  }
}
