import Observer from '../../controller/observer';
import {Router} from '../../Routes/routes';
import { fetchGET } from '../../ajax/ajax';

const msgTmpl = require('../../pug/mixins/messages.pug')

const newMessageCallback = response => {
  console.log('[DEBUG] New message callback');
  const data = JSON.parse(response.data);
  console.log(data);
    if (Router.getFragment().split('/')[0] === 'chat' && Router.getFragment().split('/')[1] === data.message.chatId) {
      fetchGET({
        url:CHAT_IP + '/api/v1/chats/' + data.message.chatId,
        callback: response => {
          response.json().then(data => {
            data.main = true;
            const div = document.getElementById('js-dialogs-body');
            div.outerHTML = msgTmpl(data);
          })
        }
      })
    } else {
      sendNotification(data.message.chatName, {
        body: data.message.text,
        icon: data.message.chatPhoto,
        dir: 'auto'
      });
    }
}

Observer.on('ws:newMessage', newMessageCallback);

function sendNotification(title, options) {
  if (!("Notification" in window)) {
    return;
  }
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options);
    notification.onclick = () => {
      Router.navigate('messages');
    };
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(permission =>  {
      if (permission === "granted") {
        new Notification(title, options);
      }
    })
  }
}
