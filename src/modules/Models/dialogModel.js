import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import {fetchGET} from '../../ajax/ajax';
const msgTmpl = require('../../pug/mixins/messages.pug')

const dialogRenderCallback = () => {
  console.log(`[DEBUG] dialog:render callback`);

  const messageForm = document.getElementById('js-message-form');

  messageForm.addEventListener('submit', event => {
    event.preventDefault();
    const chatId = Router.getFragment().split('/')[1];
    const text = messageForm.elements.text.value;
    console.log(text)
    window.socket.send(JSON.stringify({chatId, text}));
    console.log('[WS] send');
    messageForm.elements.text.value = '';
    setTimeout( fetchGET, 250, {
      url: CHAT_IP + '/api/v1/chats/' + chatId,
      callback: response => {
        response.json().then(data => {
          data.main = true;
          console.log(data)
          const div = document.getElementById('js-dialogs-body');
          div.outerHTML = msgTmpl(data);
        })
      }
    })
  });
}

Observer.on('dialog:render', dialogRenderCallback)
