import Observer from '../../controller/observer';
import { Router } from '../../Routes/routes';

const authCheckCallback = response => {
  console.log(`[DEBUG] load callback`);
  if (response.status === 200) {
    Observer.emit('draw-basic');
    Router.navigate('news');
  }
};

Observer.on('login/reg:load', authCheckCallback);
