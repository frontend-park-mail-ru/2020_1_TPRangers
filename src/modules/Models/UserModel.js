import Observer from '../../controller/observer';
import { Router } from '../../Routes/routes';
import { fetchDELETE, fetchGET, fetchPOST } from '../../ajax/ajax';

const friendsBlockTmpl = require('../../pug/mixins/friendsBlock.pug')

let userLoginInner;

const submitCallback = event => {
  event.preventDefault();
  Observer.emit('post:submit', userLoginInner);
}

const userRenderCallback = () => {
  userLoginInner = Router.getFragment().split('/')[1];
  let friendButton = document.getElementsByClassName('js-friend-button')[0];
  let friendButtonMobile = document.getElementsByClassName('js-friend-button-mobile')[0];

  Observer.emit('user:plus-button-listen');

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
    url: BACKEND_IP + '/api/v1/profile',
    callback: profileResp => {
      profileResp.json()
        .then(profileResp => {
          fetchGET({
            url: BACKEND_IP + '/api/v1/user/' + id,
            callback: response => {
              response.json().then(response => {
                const friendsBlock = document.getElementsByClassName("js-friends-block")[0]
                if (!response.friends)
                  response.friends = [];
                response.friends.forEach(val => {
                  val.isMe = val.url === profileResp.user.login;
                })
                friendsBlock.innerHTML = friendsBlockTmpl(response)
              })
            }
          })
        })
    }
  })
}

const listenPlusButton = () => {
  const button = document.getElementsByClassName('add-post-button-js')[0];
  button.onclick = () => {
    const bg = document.getElementById('blur-background-js');
    bg.classList.remove('hidden');
    const form = document.getElementById('add-post-js');
    form.classList.remove('hidden');
    const postForm = document.getElementById('js-post-form');
    postForm.addEventListener('submit', submitCallback);
    (function listenFileUpload() {
      const postForm = document.getElementById('js-post-form');
      postForm.elements.photo.oninput = evt => {
        if (postForm.elements.photo.files[0]) {
          const label = document.getElementsByClassName('input-file-label')[0];
          label.innerText = "Файл добавлен";
        }
      }
    })()
    Observer.emit('user:close-button-listen');
  };
};

const closeForm = () => {
  const postForm = document.getElementById('js-post-form');
  postForm.removeEventListener('submit', submitCallback);
  const bg = document.getElementById('blur-background-js');
  bg.classList.add('hidden');
  postForm.reset();
  const label = document.getElementsByClassName('input-file-label')[0];
  label.innerText = "Загрузить картинку";
  const form = document.getElementById('add-post-js');
  form.classList.add('hidden');
}

const listenCloseButton = () => {
  const button = document.getElementsByClassName('close-add-post-js')[0];
  button.onclick = () => {
    Observer.emit('profile:close-form');
  };
};

Observer.on('user:friend-update', updateFriendsBlock)
Observer.on('user:render', userRenderCallback);
Observer.on('user:add', addFriendCallback);
Observer.on('user:remove', removeFriendCallback);
Observer.on('user:plus-button-listen', listenPlusButton);
Observer.on('user:close-button-listen', listenCloseButton);
Observer.on('user:close-form', closeForm);
