import { Router } from '../../Routes/routes';
import { fetchGET } from '../../ajax/ajax';
import Observer from '../../controller/observer';

const startCheckCallback = () => {
  if (Router.getFragment() === '') {
    fetchGET({
      url: BACKEND_IP + '/api/v1/profile',
      callback: response => {
        if (response.status === 200) {
          Observer.emit('draw-basic');
          Router.navigate('news');
        } else  {
          Router.navigate('login');
        }
      }
    });
  } else {
    fetchGET({
      url: BACKEND_IP + '/api/v1/profile',
      callback: response => {
        if (response.status === 200) {
          Observer.emit('draw-basic');
        } else if (response.status === 401) {
          if (!(Router.getFragment() === 'register') && !(Router.getFragment() === 'login')) {
            Router.navigate('login');
          } else {
            Router.callCurrent();
          }
        } else {
          Observer.emit('render:response-error', response);
        }
      }
    });
  }
};
Observer.on('start', startCheckCallback);
