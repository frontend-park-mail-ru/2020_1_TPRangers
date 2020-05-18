import Observer from '../../controller/observer';
import { Router } from '../../Routes/routes';
import { fetchDELETE, fetchGET, fetchPOST } from '../../ajax/ajax';

const friendsBlockTmpl = require('../../pug/mixins/friendsBlock.pug')

const userRenderCallback = () => {
  let friendButton = document.getElementsByClassName('js-friend-button')[0];
  let friendButtonMobile = document.getElementsByClassName('js-friend-button-mobile')[0];

  const clickFunc =  evt => {
    evt.preventDefault();
    if (friendButtonMobile.classList.contains('js-add-friend') || friendButton.classList.contains('js-add-friend')) {
      friendButtonMobile.classList.remove('js-add-friend');
      friendButton.classList.remove('js-add-friend');
      friendButtonMobile.classList.remove('fa-user-plus');
      friendButton.innerText = "Удалить из друзей"
      friendButtonMobile.classList.add('js-remove-friend');
      friendButton.classList.add('js-remove-friend');
      friendButtonMobile.classList.add('fa-user-minus')
      Observer.emit('user:add');
    } else if (friendButtonMobile.classList.contains('js-remove-friend') || friendButton.classList.contains('js-remove-friend')) {
      friendButtonMobile.classList.remove('js-remove-friend');
      friendButton.classList.remove('js-remove-friend');
      friendButtonMobile.classList.remove('fa-user-minus');
      friendButton.innerText = "Добавить в друзья"
      friendButtonMobile.classList.add('js-add-friend');
      friendButton.classList.add('js-add-friend');
      friendButtonMobile.classList.add('fa-user-plus');
      Observer.emit('user:remove');
    }
  }
  friendButton.onclick = evt => {
      clickFunc(evt)
  }

  friendButtonMobile.onclick = evt => {
      clickFunc(evt)
  }
}

const addFriendCallback = () => {
  const login = Router.getFragment();
  fetchPOST({
    url: BACKEND_IP + '/api/v1/' + login,
    callback: () => {
      Observer.emit('user:friend-update')
    }
  })
}
const removeFriendCallback = () => {
  const login = Router.getFragment();
  fetchDELETE({
    url: BACKEND_IP + '/api/v1/' + login,
    callback: () => {
      Observer.emit('user:friend-update')
    }
  })
}

const updateFriendsBlock = () => {
  const id = Router.getFragment().split('/')[1]
  fetchGET({
    url: BACKEND_IP + '/api/v1/user/' + id,
    callback: response => {
      response.json().then(response => {
        const friendsBlock = document.getElementsByClassName("js-friends-block")[0]
        if (!response.friends)
          response.friends = [];
        friendsBlock.innerHTML = friendsBlockTmpl(response)
      })
    }
  })
}

Observer.on('user:friend-update', updateFriendsBlock)
Observer.on('user:render', userRenderCallback);
Observer.on('user:add', addFriendCallback);
Observer.on('user:remove', removeFriendCallback);
