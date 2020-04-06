import Observer from '../../controller/observer';
import {fetchGET} from '../../ajax/ajax';

const profileRenderCallback = () => {
  console.log(`[DEBUG] profile:render callback`);
};

Observer.on('profile:render', profileRenderCallback);
