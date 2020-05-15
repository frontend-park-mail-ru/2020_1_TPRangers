import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import { fetchMultipartPOST, fetchPOST } from '../../ajax/ajax';
import {fetchGET} from '../../ajax/ajax';

const friendList = require('../../pug/mixins/friendsList.pug')

const addListenerCallback = () => {
  let friends = document.getElementsByClassName('js-add-login');
  [].forEach.call(friends,elem => {
    elem.addEventListener('click', event => {
      Observer.emit('createDialog:login', event)
    });
  })
}

const friendsRenderCallback = () => {
  console.log('createDialogFriends:render');
  const search = document.getElementById('js-search');
  search.addEventListener('input', () => {
    if (search.value) {
      fetchGET({
        url: BACKEND_IP + '/api/v1/friends/search/' + search.value,
        callback: response => {
          response.json()
            .then(response => {
              const data = {
                friends: response,
                canAdd: true,
                main: true
              }
              const list = document.getElementById('js-friends-list');
              list.innerHTML = friendList(data)
              Observer.emit('createDialog:addListener')
            })
        }
      })
    } else {
      fetchGET({
        url: BACKEND_IP + '/api/v1/friends',
        callback: response => {
          response.json()
            .then(response => {
              const data = {
                friends: response,
                canAdd: true,
                main: true
              }
              const list = document.getElementById('js-friends-list');
              list.innerHTML = friendList(data);
              Observer.emit('createDialog:addListener');
            })
        }
      })
    }
  })
}

const addLoginCallback = evt => {
  evt.preventDefault();
  const postForm = document.getElementById('js-createDialog-form');
  const current = evt.toElement;
  if (current.classList.contains("fa-check-circle"))
    return;
  console.log("[DEBUG] login added");
  const login = current.getAttribute("login");
  current.classList.remove("fa-plus-circle")
  current.classList.remove("js-don't-prevent")
  current.classList.remove('link')
  current.classList.add("fa-check-circle")

  postForm.elements.logins.value += `${login},`
}

const submitDialogCallback = () => {
  console.log(`[DEBUG] dialog:submit callback`);

  const dialogForm = document.getElementById('js-createDialog-form');

  if (dialogForm.elements.photo.files[0]) {

    let body = new FormData();
    body.append('fileData', dialogForm.elements.photo.files[0]);

    fetchMultipartPOST({
      url:  'https://social-hub.ru/upload',
      body,
      callback: response => {
        response.json().then( data => {
            Observer.emit('dialog:afterPhoto', data);
          }
        )
      }
    })
  } else {
    Observer.emit('dialog:afterPhoto');
  }

};

const createDialogRenderCallback = () => {
  console.log(`[DEBUG] createDialog:render callback`);

  const backButton = document.getElementById('back-button-js');

  backButton.onclick = evt => {
    evt.preventDefault();
    Router.goPrev()
  }


  const dialogForm = document.getElementById('js-createDialog-form');
  dialogForm.addEventListener('submit', event => {
    event.preventDefault();
    console.log(dialogForm);
    Observer.emit('dialog:submit');
  });
};

const afterPhotoDialogCallback = response => {
  console.log(`[DEBUG] dialog:afterPhoto callback`);

  let chatPhoto = undefined;
  if (response) {
    console.log(response);
    chatPhoto = 'https://social-hub.ru' + response.filename;
  }

  const dialogForm = document.getElementById('js-createDialog-form');

  const chatName = dialogForm.elements.text.value;
  const usersLogin = dialogForm.elements.logins.value.split(',').filter(elem => elem !== "");
  console.log(chatName, usersLogin);
  fetchPOST({
    url: CHAT_IP + `/api/v1/chats`,
    body: JSON.stringify({
      chatPhoto,
      chatName,
      usersLogin,
    }),
    callback: response => {
      if (response.status === 200) {
        Router.navigate('messages');
      }
    }
  })

};




Observer.on('createDialog:addListener', addListenerCallback);
Observer.on('createDialog:login', addLoginCallback);
Observer.on('createDialogFriends:render', friendsRenderCallback);
Observer.on('createDialog:render', createDialogRenderCallback);
Observer.on('dialog:afterPhoto', afterPhotoDialogCallback);
Observer.on('dialog:submit', submitDialogCallback);
