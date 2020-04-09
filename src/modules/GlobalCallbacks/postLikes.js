import Observer from '../../controller/observer';
import { Router } from '../../Routes/routes';
import { fetchDELETE, fetchPOST } from '../../ajax/ajax';

const listenLikesCallback = () => {
  let likes = document.getElementsByClassName('js-like-post');
  [].forEach.call(likes,elem => {
    elem.addEventListener('click', event => Observer.emit('event:like', event));
  })

}

const likeEventCallback = event => {
  event.preventDefault();
  const current = event.toElement;
  if (current.classList.contains('js-like-no')) {
    current.classList.remove('js-like-no');
    current.classList.add('js-like-yes');
    current.nextSibling.textContent++;
    Observer.emit('sendLike', current);
  } else if (current.classList.contains('js-like-yes')) {
    current.classList.remove('js-like-yes');
    current.classList.add('js-like-no');
    current.nextSibling.textContent--;
    Observer.emit('removeLike', current);
  }
}

const likePost = post => {
  fetchPOST({
    url: BACKEND_IP + '/api/v1/post/' + post.id + '/like',
    callback: response => {
      console.log(response.status);
    }
  })
}

const removeLike = post => {
  fetchDELETE({
    url: BACKEND_IP + '/api/v1/post/' + post.id + '/like',
    callback: response => {
      console.log(response.status);
    }
  })
}


Observer.on('event:like', likeEventCallback)
Observer.on('listenPostsLikes', listenLikesCallback);
Observer.on('sendLike', likePost);
Observer.on('removeLike', removeLike);
