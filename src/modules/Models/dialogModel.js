import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import {fetchGET} from '../../ajax/ajax';
const msgTmpl = require('../../pug/mixins/messages.pug')


const dialogRenderCallback = () => {
  //console.log(`[DEBUG] dialog:render callback`);
  Observer.emit('dialog:listen-sticker-button');
  const messageForm = document.getElementById('js-message-form');

  messageForm.addEventListener('submit', event => {
    event.preventDefault();
    const chatId = Router.getFragment().split('/')[1];
    const text = messageForm.elements.text.value;
    //console.log(text)
    window.socket.send(JSON.stringify({chatId, text}));
    //console.log('[WS] send');
    messageForm.elements.text.value = '';
    setTimeout( fetchGET, 250, {
      url: CHAT_IP + '/api/v1/chats/' + chatId,
      callback: response => {
        response.json().then(data => {
          data.main = true;
          //console.log(data)
          const div = document.getElementById('js-dialogs-body');
          div.outerHTML = msgTmpl(data);
        })
      }
    })
  });
}

const listenStickerCallback = () => {
  const stickers = document.getElementById('js-emodji-container');
  const button = document.getElementById('js-chat-emodji');
  button.onclick = evt => {
    evt.preventDefault();
    if (stickers.classList.contains('display-none')) {
      stickers.classList.remove('display-none')
    } else {
      stickers.classList.add('display-none')
    }
  }
}


const listenNextButton = () => {
  const button = document.getElementById('js-change-button');
  const buttonPrev = document.getElementById('js-change-button-back');
  button.onclick = evt => {
    evt.preventDefault();
    const activePack = document.getElementsByClassName('js-sticker-active')[0];
    const nextPackId =  `js-pack-id-${(parseInt(activePack.id.split('-')[3],10)+1)%3}`;
    activePack.classList.add('display-none');
    activePack.classList.remove('js-sticker-active');
    const nextPack = document.getElementById(nextPackId);
    nextPack.classList.remove('display-none');
    nextPack.classList.add('js-sticker-active');
  }
  buttonPrev.onclick = evt => {
    evt.preventDefault();
    const activePack = document.getElementsByClassName('js-sticker-active')[0];
    let id = (parseInt(activePack.id.split('-')[3],10))-1;
    if (id < 0) {
      id = 2;
    }
    const nextPackId =  `js-pack-id-${id}`;
    activePack.classList.add('display-none');
    activePack.classList.remove('js-sticker-active');
    const nextPack = document.getElementById(nextPackId);
    nextPack.classList.remove('display-none');
    nextPack.classList.add('js-sticker-active');
  }
}

const sendSticker = src => {
  const chatId = Router.getFragment().split('/')[1];
  window.socket.send(JSON.stringify({chatId, sticker:src}));
  //console.log('[WS] send sticker');
  const container = document.getElementById('js-emodji-container');
  if (!container.classList.contains('display-none')) {
    container.classList.add('display-none');
  }
  setTimeout( fetchGET, 250, {
    url: CHAT_IP + '/api/v1/chats/' + chatId,
    callback: response => {
      response.json().then(data => {
        data.main = true;
        //console.log(data)
        const div = document.getElementById('js-dialogs-body');
        div.outerHTML = msgTmpl(data);
      })
    }
  })
}

const addEmodji = emodji => {
   const textarea = document.getElementById('text');
   textarea.value += emodji;
}

const listenEmojiPress = () => {
  const stickers = document.getElementsByClassName('js-sticker');
  [].forEach.call(stickers,val => {
    val.addEventListener('click', evt => {
      evt.preventDefault();
      //console.log(evt.target.src)
      Observer.emit('dialog:send-sticker',evt.target.src);
    })
  })
  const emodji = document.getElementsByClassName('js-emodji');
  [].forEach.call(emodji,val => {
    val.addEventListener('click', evt => {
      evt.preventDefault();
      Observer.emit('dialog:add-emodji',evt.target.id);
    })
  })
}

Observer.on('dialog:send-sticker', sendSticker);
Observer.on('dialog:add-emodji', addEmodji);
Observer.on('dialog:listen-sticker', listenEmojiPress);
Observer.on('dialog:listen-sticker-button', listenStickerCallback);
Observer.on('dialog:render', dialogRenderCallback);
Observer.on('dialog:listen-next-button', listenNextButton);
