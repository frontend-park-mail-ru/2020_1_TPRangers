import LeftView from '../View/LeftView';
import RightView from '../View/RightView';
import Observer from '../../controller/observer';
import {fetchGET} from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

const leftBlock = document.getElementById("left-block");
const rightBlock = document.getElementById("right-block");

const drawBasicCallback = () => {
  console.log(`[DEBUG] draw-basic callback`);
  Observer.emit('ws');
  const grid = document.getElementById('app');
  const header = document.getElementsByClassName('header')[0];
  const side = document.getElementById('sidenav-js');
  side.style.display = 'flex';
  grid.classList.add('grid-authorize');
  grid.classList.remove('grid-container');
  header.classList.add('header_authorize-js');
  Router.callCurrent();
};


const createWebsocket = () => {
  // ws register
  console.log('[DEBUG] ws connection...')
  fetchGET({
    url: CHAT_IP + '/api/v1/ws',
    callback: response => {
      response.json().then( response => {
        console.log(response);
        window.socket = new WebSocket(`${WS_IP}/api/v1/ws/${response.token}`);

        window.socket.onopen = function(e) {
          console.log("[WS] Соединение установлено");
        };

        window.socket.onmessage = function(event) {
          Observer.emit("ws:newMessage", event);
        };

        window.socket.onclose = function(event) {
          if (event.wasClean) {
            console.log(`[WS] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
          } else {
            createWebsocket();
            console.log('[WS] Соединение прервано');
          }
        };

        window.socket.onerror = function(error) {
          console.error(`[WS] ${error.message}`);
        };
      })
    }
  })
}

Observer.on('ws', createWebsocket);
Observer.on('draw-basic', drawBasicCallback);
