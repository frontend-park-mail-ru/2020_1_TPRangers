import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import {fetchGET} from '../../ajax/ajax';
const msgTmpl = require('../../pug/mixins/messages.pug')


const dialogRenderCallback = () => {
  console.log(`[DEBUG] dialog:render callback`);
  Observer.emit('dialog:listen-emodji-button');
  Observer.emit('dialog:listen-emodji');
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

const listenEmojiCallback = () => {
  const container = document.getElementById('js-emodji-container');
  const button = document.getElementById('js-chat-emodji');
  button.onclick = evt => {
    evt.preventDefault();
    if (container.classList.contains('display-none')) {
      container.classList.remove('display-none');
    } else {
      container.classList.add('display-none');
    }
  }
}

const addEmodjiToText = symbol => {
  const messageForm = document.getElementById('js-message-form');
  messageForm.elements.text.value += `&#${symbol}`;
}

const listenEmojiPress = () => {
  const emodji = document.getElementsByClassName('js-emodji');
  [].forEach.call(emodji,val => {
    val.addEventListener('click', evt => {
      evt.preventDefault();
      Observer.emit('dialog:add-emodji',evt.target.getAttribute('symbol'));
    })
  })
}

Observer.on('dialog:add-emodji', addEmodjiToText);
Observer.on('dialog:listen-emodji', listenEmojiPress);
Observer.on('dialog:listen-emodji-button', listenEmojiCallback);
Observer.on('dialog:render', dialogRenderCallback);
