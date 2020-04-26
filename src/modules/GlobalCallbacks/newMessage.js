import Observer from '../../controller/observer';
import {Router} from '../../Routes/routes';

const newMessageCallback = response => {
  console.log('[DEBUG] New message callback');
  response.json().then(message => {
    if (Router.getFragment() !== 'messages') {
      sendNotification('Social-hub', {
        body: message,
        icon: 'favicon.ico',
        dir: 'auto'
      });
    } else {
      console.log(message);
    }
  })
}

Observer.emit('ws:newMessage', newMessageCallback);

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
    Notification.requestPermission.then(permission =>  {
      if (permission === "granted") {
        new Notification(title, options);
      }
    })
  }
}
