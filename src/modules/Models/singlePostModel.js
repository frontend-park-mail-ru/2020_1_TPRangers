import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import { fetchGET, fetchMultipartPOST, fetchPOST } from '../../ajax/ajax';

const commentsTmpl = require('../../pug/mixins/commentsList.pug')

const singlePostRenderCallback = () => {
  console.log(`[DEBUG] singlePost:render callback`);

  const postForm = document.getElementById('js-single-post-form');
  const backButton = document.getElementById('back-button-js');

  backButton.onclick = evt => {
    evt.preventDefault();
    Router.goPrev()
  }

  postForm.addEventListener('submit', event => {
    event.preventDefault();
    Observer.emit('singlePost:submit');
  });
};

const singlePostSubmitCallback = () => {
  console.log(`[DEBUG] singlePost:submit callback`);

  const id = Router.getFragment().split('/')[1];
  const postForm = document.getElementById('js-single-post-form');
  fetchPOST({
    url: BACKEND_IP + '/api/v1/comment',
    body: JSON.stringify({
      post_id: id,
      text: postForm.elements.text.value
    }),
    callback: response => {
      if (response.status === 200) {
        const commentList = document.getElementById('js-comments-list');
        fetchGET({
          url: BACKEND_IP + `/api/v1/post/${id}/comments`,
          callback: response => {
            response.json().then(response => {
              if (!response.comments)
                response.comments = [];
              const data = {
                data: response,
              }
              postForm.elements.text.value = '';
              console.log(data);
              commentList.innerHTML = commentsTmpl(data);
              Observer.emit('listenCommentLikes');
            })
          }
        })
      }
    }
  })
}

Observer.on('singlePost:render', singlePostRenderCallback);
Observer.on('singlePost:submit', singlePostSubmitCallback);

