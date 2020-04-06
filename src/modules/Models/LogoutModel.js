import Observer from '../../controller/observer';
import { fetchDELETE } from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

const logoutCallback = () => {
    fetchDELETE({
      url: BACKEND_IP + '/api/v1/login',
      callback: response => {
          if (response.status === 200) {
            const leftBlock = document.getElementById("left-block");
            const rightBlock = document.getElementById('right-block');
            //Очистка правого и левого блока
            leftBlock.innerHTML = '';
            rightBlock.innerHTML = '';
            Router.navigate('login');
          }
      }
    })
};

Observer.on('logout', logoutCallback);
