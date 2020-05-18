import IView from './IView';
import Observer from '../../controller/observer';



export default class ErrorView extends IView{
    render(errorData) {
      console.log(errorData)
      // super.clear();
      // this.parent.innerHTML += errorTmpl(errorData);
    }
  }
