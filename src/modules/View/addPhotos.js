import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/pages/albums.pug');

export default class AddPhotos extends IView{
  render() {
    // super.clear();
    // this.parent.innerHTML += formTmpl();
    // Observer.emit('addPhotos:render');
  }
}
