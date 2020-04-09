import Observer from '../../controller/observer';
import { Router } from '../../Routes/routes';
import { fetchDELETE, fetchPUT } from '../../ajax/ajax';

const userRenderCallback = () => {
  let friendButton = document.getElementsByClassName('js-friend-button')[0];

  friendButton.addEventListener('click', evt => {
    evt.preventDefault();
    if (friendButton.classList.contains('js-add-friend')) {
      friendButton.classList.remove('js-add-friend');
      friendButton.firstChild.classList.remove('fa-user-plus');
      friendButton.classList.add('js-remove-friend');
      friendButton.firstChild.classList.add('fa-user-minus')
      Observer.emit('user:add');
    } else if (friendButton.classList.contains('js-remove-friend')) {
      friendButton.classList.remove('js-remove-friend');
      friendButton.firstChild.classList.remove('fa-user-minus');
      friendButton.firstChild.classList.add('fa-user-plus');
      friendButton.classList.add('js-add-friend');
      Observer.emit('user:remove');
    }
  })
}

const addFriendCallback = () => {
  const login = Router.getFragment();
  fetchPUT({
    url: BACKEND_IP + '/api/v1/' + login,
  })

}
const removeFriendCallback = () => {
  const login = Router.getFragment();
  fetchDELETE({
    url: BACKEND_IP + '/api/v1/' + login,
  })
}

Observer.on('user:render', userRenderCallback);
Observer.on('user:add', addFriendCallback);
Observer.on('user:remove', removeFriendCallback);
