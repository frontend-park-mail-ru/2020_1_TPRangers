import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import { fetchGET, fetchMultipartPOST, fetchPOST } from '../../ajax/ajax';

// const commentsTmpl = require('../../pug/includes/modules/commentsList.pug')

const singlePostRenderCallback = () => {
  console.log(`[DEBUG] singlePost:render callback`);

  const postForm = document.getElementById('js-comment-form');

  postForm.addEventListener('submit', event => {
    event.preventDefault();
    Observer.emit('singlePost:submit');
  });
};

const singlePostSubmitCallback = () => {
  console.log(`[DEBUG] singlePost:submit callback`);

  const id = Router.getFragment().split('/')[1];
  const postForm = document.getElementById('js-comment-form');
  fetchPOST({
    url: BACKEND_IP + '/api/v1/comment',
    body: JSON.stringify({
      post_id: id,
      text: postForm.elements.comment.value
    }),
    callback: response => {
      if (response.status === 200) {
        const commentList = document.getElementById('comments_list');
        fetchGET({
          url: BACKEND_IP + `/api/v1/post/${id}/comments`,
          callback: response => {
            response.json().then(response => {
              if (!response.comments)
                response.comments = [];
              const data = {
                data: response,
              }
              postForm.elements.comment.value = '';
              console.log(data);
              // commentList.innerHTML = commentsTmpl(data);
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

// fetchGET({
//   url: BACKEND_IP + '/api/v1/profile',
//   callback: async response=> {
//     response = await response.json()
//     const data = {
//       authorPhoto: response.photo,
//       authorUrl: response.login,
//       authorName: response.name,
//       photo:{},
//       text: postForm.elements.comment.value,
//
//     }
//     console.log(response);
//   }
// })
