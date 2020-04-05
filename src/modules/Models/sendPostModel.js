import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import { addRegExpValidationAll, checkRegExpValidity } from '../formValidation';
import { fetchMultipartPOST, fetchPOST } from '../../ajax/ajax';

const formItems = {
  post: {
    name: 'post',
    regExp: /.*/i,
  },
  text: {
    name: 'text',
    regExp: /.*/i,
  },
};

let sendPostRenderCallback = () => {
  console.log(`[DEBUG] post:render callback`);

  const postForm = document.getElementById('js-post-form');

  addRegExpValidationAll({
    form: postForm,
    formItems: formItems,
  });

  postForm.addEventListener('submit', event => {
    event.preventDefault();
    if (
      checkRegExpValidity({
        form: postForm,
        formItems: formItems,
      }))
    {
      Observer.emit('post:submit');
    }
  });

};

let submitPostCallback = () => {
  console.log(`[DEBUG] post:submit callback`);

  const postForm = document.getElementById('js-post-form');

  if (postForm.elements.photo.files[0]) {

    let body = new FormData();
    body.append('fileData', postForm.elements.photo.files[0]);

    fetchMultipartPOST({
      url:  'https://social-hub.ru/upload',
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

let afterPhotoPostCallback = response => {
  console.log(`[DEBUG] post:afterPhoto callback`);

  let photo = undefined;
  if (response) {
    console.log(response);
    photo = 'https://social-hub.ru' + response.filename;
  }

  const postForm = document.getElementById('js-post-form');

  const post = postForm.elements.post.value;
  const text = postForm.elements.text.value;
  fetchPOST({
    url: BACKEND_IP + '/api/v1/cretePost',
    body: JSON.stringify({
      post,
      text,
      photo,
    }),
    callback: response => {
      if (response.status === 200) {
        Router.navigate('news');
      }
    }
  })

};

Observer.on('post:render', sendPostRenderCallback);
Observer.on('post:afterPhoto', afterPhotoPostCallback);
Observer.on('post:submit', submitPostCallback);