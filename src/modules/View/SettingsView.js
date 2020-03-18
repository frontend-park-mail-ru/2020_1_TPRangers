import IView from './IView';
import Observer from '../../controller/observer';

const formTmpl = require('../../pug/pages/settings.pug');

export default class SettingsView extends IView{
  render() {
    super.render();
    this.parent.innerHTML += formTmpl();
    Observer.emit('settings:render');
  }
}
