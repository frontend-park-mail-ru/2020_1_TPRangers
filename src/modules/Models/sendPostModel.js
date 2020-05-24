import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import { fetchMultipartPOST, fetchPOST } from '../../ajax/ajax';

let userLoginInner;

const sendPostRenderCallback = userLogin => {
  // console.log(`[DEBUG] post:render callback`);
  userLoginInner = userLogin;
  const postForm = document.getElementById('js-post-form');

  postForm.addEventListener('submit', event => {
    event.preventDefault();
    Observer.emit('post:submit');
  });

};

const submitPostCallback = userLogin => {
  if (userLogin) {
    userLoginInner = userLogin;
  }
  // console.log(`[DEBUG] post:submit callback`);

  const postForm = document.getElementById('js-post-form');

  if (postForm.elements.photo.files[0]) {

    let body = new FormData();
    body.append('fileData', postForm.elements.photo.files[0]);

    fetchMultipartPOST({
      url:  PHOTO_URL,
      body,
      callback: response => {
        response.json().then( data => {
            Observer.emit('post:afterPhoto', data);
          }
        )
      }
    })
  } else {
    Observer.emit('post:afterPhoto');
  }

};

const afterPhotoPostCallback = response => {
  // console.log(`[DEBUG] post:afterPhoto callback`);

  let photo = undefined;
  if (response) {
    photo =  response.filename;
  }

  const postForm = document.getElementById('js-post-form');

  const text = postForm.elements.text.value;
  fetchPOST({
    url: BACKEND_IP + `/api/v1/${userLoginInner}/post`,
    body: JSON.stringify({
      text,
      photo: {
        url: photo,
      }
    }),
    callback: response => {
      if (response.status === 200) {
        const bg = document.getElementById('blur-background-js');
        if (!bg.classList.contains("hidden")) {
          bg.classList.add('hidden');
        }
        Router.callCurrent();
      }
    }
  })

};

Observer.on('post:render', sendPostRenderCallback);
Observer.on('post:afterPhoto', afterPhotoPostCallback);
Observer.on('post:submit', submitPostCallback);
