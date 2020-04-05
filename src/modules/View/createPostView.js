import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/pages/sendPost.pug');

export default class sendPost extends IView{
  render() {
    super.render();
    this.parent.innerHTML += formTmpl();
    Observer.emit('post:render');
  }
}
