import IView from './IView';
import Observer from '../../controller/observer';

const errorTmpl = require('../../pug/pages/error.pug')


export default class ErrorView extends IView{
    render(errorData) {
      super.clear();
      this.parent.innerHTML += errorTmpl(errorData);
    }
  }
