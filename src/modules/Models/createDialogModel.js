import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import { fetchMultipartPOST, fetchPOST } from '../../ajax/ajax';
import {fetchGET} from '../../ajax/ajax';

const friendList = require('../../pug/includes/modules/createDialogFriendList.pug')

const createDialogRenderCallback = () => {
  console.log(`[DEBUG] createDialog:render callback`);

  const postForm = document.getElementById('js-createDialog-form');

  postForm.addEventListener('submit', event => {
    event.preventDefault();
  });
};

const addListenerCallback = () => {
  let friends = document.getElementsByClassName('js-add-login');
  console.log(friends);
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
                friends: response
              }
              console.log(data);
              const list = document.getElementById('js-createDialog-list');
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
              }
              console.log(data);
              const list = document.getElementById('js-createDialog-list');
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
  console.log(postForm.elements.logins.value)
  const current = evt.toElement;
  if (current.classList.contains("fa-check-circle"))
    return;
  console.log("[DEBUG] login added");
  const login = current.getAttribute("login");
  current.classList.remove("fa-plus-circle")
  current.classList.remove("js-don't-prevent")
  current.classList.add("fa-check-circle")

  postForm.elements.logins.value += `${login},`
}


Observer.on('createDialog:addListener', addListenerCallback);
Observer.on('createDialog:login', addLoginCallback);
Observer.on('createDialogFriends:render', friendsRenderCallback)
Observer.on('createDialog:render', createDialogRenderCallback);
