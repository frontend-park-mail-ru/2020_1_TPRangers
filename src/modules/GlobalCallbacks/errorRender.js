import ErrorView from '../View/ErrorView';
import Observer from '../../controller/observer';

const mainBlock = document.getElementById("app");

const errorRender = data => {
  let error = new ErrorView(mainBlock);
  error.render(data);
};
Observer.on('render:error', errorRender);
