import ErrorView from '../View/ErrorView';
import Observer from '../../controller/observer';

const mainBlock = document.getElementById("main-block");

const errorRender = data => {
  let error = new ErrorView(mainBlock);
  error.render(data);
};
Observer.on('render:error', errorRender);
