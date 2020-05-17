import Observer from '../../controller/observer';
import { fetchDELETE, fetchGET, fetchMultipartPOST, fetchPOST } from '../../ajax/ajax';
import {Router} from '../../Routes/routes';

const postsTmpl = require('../../pug/mixins/postList.pug');
const subBlockTmpl = require('../../pug/mixins/subBlock.pug');

const listenPlusButton = () => {
  const button = document.getElementsByClassName('add-post-button-js')[0];
  button.onclick = () => {
    const bg = document.getElementById('blur-background-js');
    bg.classList.remove('hidden');
    const form = document.getElementById('add-post-js');
    form.classList.remove('hidden');
    Observer.emit('singleGroup:listen-submit-form-button');
    Observer.emit('singleGroup:close-button-listen');
  };
};

const closeForm = () => {
  const bg = document.getElementById('blur-background-js');
  bg.classList.add('hidden');
  const form = document.getElementById('add-post-js');
  form.classList.add('hidden');
};

const listenCloseButton = () => {
  const button = document.getElementsByClassName('close-add-post-js')[0];
  button.onclick = () => {
    Observer.emit('singleGroup:close-form');
  };
};

const listenSubCallback = () => {
  let subButton = document.getElementsByClassName('js-sub-button')[0];
  let subButtonMobile = document.getElementsByClassName('js-sub-button-mobile')[0];

  const clickFunc =  evt => {
    evt.preventDefault();
    if (subButtonMobile.classList.contains('js-add-sub') || subButton.classList.contains('js-add-sub')) {
      subButtonMobile.classList.add('js-remove-sub');
      subButton.classList.add('js-remove-sub');
      subButtonMobile.classList.add('fa-minus');
      subButtonMobile.classList.remove('js-add-sub');
      subButton.classList.remove('js-add-sub');
      subButtonMobile.classList.remove('fa-plus');
      subButton.innerText = "Отписаться"
      Observer.emit('singleGroup:add');
    } else if (subButtonMobile.classList.contains('js-remove-sub') || subButton.classList.contains('js-remove-sub')) {
      subButtonMobile.classList.add('js-add-sub');
      subButton.classList.add('js-add-sub');
      subButtonMobile.classList.add('fa-plus');
      subButtonMobile.classList.remove('js-remove-sub');
      subButton.classList.remove('js-remove-sub');
      subButtonMobile.classList.remove('fa-minus');
      subButton.innerText = "Подписаться"
      Observer.emit('singleGroup:remove');
    }
  }
  subButton.onclick = evt => {
    clickFunc(evt)
  }

  subButtonMobile.onclick = evt => {
    clickFunc(evt)
  }
}

const addSubCallback = () => {
  const group = Router.getFragment();
  fetchPOST({
    url: BACKEND_IP + `/api/v1/${group}/join`,
    callback: () => {
      Observer.emit('singleGroup:updateSubBlock');
    }
  })
}
const removeSubCallback = () => {
  const group = Router.getFragment();
  fetchDELETE({
    url: BACKEND_IP + `/api/v1/${group}/join`,
    callback: () => {
      Observer.emit('singleGroup:updateSubBlock');
    }
  })
}

const updateSubBlock = () => {
  const groupId = Router.getFragment().split('/')[1]
  fetchGET({
    url: BACKEND_IP + `/api/v1/group/${groupId}/profile`,
    callback: response => {
      response.json().then(response => {
        const subBlock = document.getElementsByClassName("js-sub-block")[0]
        if (!response.members) {
          response.members = []
        }
        const data = {
          profile: response
        }
        subBlock.innerHTML = subBlockTmpl(data);
      })
    }
  })
}

const renderCallback = () => {
  console.log(`[DEBUG] Single group render`);
  Observer.emit('singleGroup:plus-button-listen');
  Observer.emit('singleGroup:sub-button-listen');
};

const formSubmitCallback = () => {
  console.log(`[DEBUG] singleGroup:listen-submit-form-button callback`);
  const form = document.getElementById('js-post-form');
  form.onsubmit = evt => {
    evt.preventDefault();
    if (form.elements.photo.files[0]) {

      let body = new FormData();
      body.append('fileData', form.elements.photo.files[0]);

      fetchMultipartPOST({
        url: 'https://social-hub.ru/upload',
        body,
        callback: response => {
          response.json()
            .then(data => {
                Observer.emit('singleGroup:afterPhoto', data);
              }
            );
        }
      });
    } else {
      Observer.emit('singleGroup:afterPhoto');
    }
  };
};

const afterPhotoCallback = data => {
  console.log(`[DEBUG] singleGroup:afterPhoto callback`);

  let photoUrl = undefined;
  if (data) {
    photoUrl = 'https://social-hub.ru' + data.filename;
  }
  const form = document.getElementById('js-post-form');
  const text = form.elements.text.value;
  form.reset();
  const groupId = Router.getFragment().split('/')[1];
  fetchPOST({
    url: BACKEND_IP + `/api/v1/group/${groupId}/post/create`,
    body: JSON.stringify({
      text,
      photo: {
        url: photoUrl,
      }
    }),
    callback: response => {
      if (response.status === 200) {
        Observer.emit('singleGroup:close-form');
        Observer.emit('singleGroup:updatePosts');
      }
    }
  });
};

const reRenderPost = () => {
  const posts = document.getElementById('js-postList');
  const groupId = Router.getFragment().split('/')[1];
  fetchGET({
    url: BACKEND_IP + `/api/v1/group/${groupId}/feed`,

    callback: response => {
      response.json()
        .then(response => {
          response.forEach(val => {
            val.post = true
          });
          const data = {
            feed: response,
          }
          console.log(data)
          posts.innerHTML = postsTmpl(data);
          Observer.emit('listenPostsLikes');
        });
    }
  });
}

Observer.on('singleGroup:render', renderCallback);
Observer.on('singleGroup:plus-button-listen', listenPlusButton);
Observer.on('singleGroup:close-button-listen', listenCloseButton);
Observer.on('singleGroup:close-form', closeForm);
Observer.on('singleGroup:listen-submit-form-button', formSubmitCallback);
Observer.on('singleGroup:afterPhoto',afterPhotoCallback);
Observer.on('singleGroup:updatePosts', reRenderPost);
Observer.on('singleGroup:sub-button-listen',listenSubCallback);
Observer.on('singleGroup:add', addSubCallback);
Observer.on('singleGroup:remove', removeSubCallback);
Observer.on('singleGroup:updateSubBlock', updateSubBlock);
