import LeftView from '../View/LeftView';
import RightView from '../View/RightView';
import Observer from '../../controller/observer';

const leftBlock = document.getElementById("left-block");
const rightBlock = document.getElementById('right-block');

let drawBasicCallback = () => {
  console.log(`[DEBUG] draw-basic callback`);
  new LeftView(leftBlock).render();
  new RightView(rightBlock).render();
};
Observer.on('draw-basic', drawBasicCallback);
