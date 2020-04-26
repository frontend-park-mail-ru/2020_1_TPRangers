import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import { fetchMultipartPOST, fetchPOST } from '../../ajax/ajax';
import {fetchGET} from '../../ajax/ajax';

const dialogRenderCallback = () => {
  console.log(`[DEBUG] dialog:render callback`);

  const messageForm = document.getElementById('js-message-form');

  messageForm.addEventListener('submit', event => {
    event.preventDefault();
    const chatId = Router.getFragment().split('/')[1];
    const text = messageForm.elements.message.value;
    window.socket.send(JSON.stringify({chatId, text}));
    console.log('[WS] send');
  });
}

Observer.on('dialog:render', dialogRenderCallback)
