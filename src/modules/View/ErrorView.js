import IView from './IView';
import Observer from '../../controller/observer';

const errorTmpl = require('../../pug/pages/error.pug');

const dataForError = {
        status: 404,
        text: 'Страница не найдена',
};


export default class ErrorView extends IView{
    render() {
      super.render();
      this.parent.innerHTML += errorTmpl(dataForError);
    }
  }