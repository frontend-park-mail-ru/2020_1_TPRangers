import Observer from '../../controller/observer';
import {fetchGET} from '../../ajax/ajax';

let profileRenderCallback = () => {
  fetchGET({
    url: BACKEND_IP + '/api/v1/profile',
    callback: response => {
      response.json().then(ans => {
        console.log(ans);
      })
    }
  });
};

Observer.on('profile:render', profileRenderCallback);
