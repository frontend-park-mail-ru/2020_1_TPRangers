import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/pages/createAlbum.pug');

export default class CreateAlbumView extends IView{
  render() {
    super.clear();
    this.parent.innerHTML += formTmpl();
    Observer.emit('createAlbum:render');
  }
}
