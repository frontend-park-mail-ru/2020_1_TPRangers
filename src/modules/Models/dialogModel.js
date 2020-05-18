import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import {fetchGET} from '../../ajax/ajax';
const msgTmpl = require('../../pug/mixins/messages.pug')


const dialogRenderCallback = () => {
  console.log(`[DEBUG] dialog:render callback`);
  Observer.emit('dialog:listen-sticker-button');
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

const addEmodjiToText = src => {
  const chatId = Router.getFragment().split('/')[1];
  window.socket.send(JSON.stringify({chatId, sticker:src}));
  console.log('[WS] send sticker');
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
}

const listenEmojiPress = () => {
  const stickers = document.getElementsByClassName('js-sticker');
  [].forEach.call(stickers,val => {
    val.addEventListener('click', evt => {
      evt.preventDefault();
      console.log(evt.target.src)
      Observer.emit('dialog:add-emodji',evt.target.src);
    })
  })
}

Observer.on('dialog:add-emodji', addEmodjiToText);
Observer.on('dialog:listen-sticker', listenEmojiPress);
Observer.on('dialog:listen-sticker-button', listenEmojiCallback);
Observer.on('dialog:render', dialogRenderCallback);
