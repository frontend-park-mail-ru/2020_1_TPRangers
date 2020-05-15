import Observer from '../../controller/observer';
import { fetchDELETE } from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

const logoutCallback = () => {
    fetchDELETE({
      url: BACKEND_IP + '/api/v1/login',
      callback: response => {
          if (response.status === 200) {
            const grid = document.getElementById('app');
            const header = document.getElementsByClassName('header')[0];
            const side = document.getElementById('sidenav-js');
            side.style.display = 'none';
            grid.classList.add('grid-container');
            grid.classList.remove('grid-authorize');
            header.classList.remove('header_authorize-js');
            Router.navigate('login');
          }
      }
    })
};

Observer.on('logout', logoutCallback);
