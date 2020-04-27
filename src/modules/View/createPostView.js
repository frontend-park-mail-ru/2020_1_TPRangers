import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/pages/sendPost.pug');

export default class SendPost extends IView{
  render() {
    super.clear();
    this.parent.innerHTML += formTmpl();
    Observer.emit('post:render');
  }
}
