import Observer from '../../controller/observer';
import { Router } from '../../Routes/routes';
import { fetchDELETE, fetchPOST } from '../../ajax/ajax';

const listenCommentLikesCallback = () => {
  let likes = document.getElementsByClassName('js-like-comment');
  [].forEach.call(likes,elem => {
    elem.addEventListener('click', event => Observer.emit('event:commentLike', event));
  })

}

const likeEventCallback = event => {
  event.preventDefault();
  const current = event.toElement;
  if (current.classList.contains('js-like-no')) {
    current.classList.remove('js-like-no');
    current.classList.add('js-like-yes');
    current.nextSibling.textContent++;
    Observer.emit('sendCommentLike', current);
  } else if (current.classList.contains('js-like-yes')) {
    current.classList.remove('js-like-yes');
    current.classList.add('js-like-no');
    current.nextSibling.textContent--;
    Observer.emit('removeCommentLike', current);
  }
}

const likeComment = comment => {
  fetchPOST({
    url: BACKEND_IP + '/api/v1/comment/' + comment.id + '/like',
    callback: response => {
      console.log(response.status);
    }
  })
}

const dislikeComment = comment => {
  fetchDELETE({
    url: BACKEND_IP + '/api/v1/comment/' + comment.id + '/like',
    callback: response => {
      console.log(response.status);
    }
  })
}


Observer.on('event:commentLike', likeEventCallback)
Observer.on('listenCommentLikes', listenCommentLikesCallback);
Observer.on('sendCommentLike', likeComment);
Observer.on('removeCommentLike', dislikeComment);
