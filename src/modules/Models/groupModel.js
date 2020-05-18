import Observer from '../../controller/observer';
import { fetchGET, fetchMultipartPOST, fetchPOST } from '../../ajax/ajax';
import { Router } from '../../Routes/routes';

const groupList = require('../../pug/mixins/groupList.pug')

const listenPlusButton = () => {
  const button = document.getElementsByClassName('add-group-button-js')[0];
  button.onclick = () => {
    const bg = document.getElementById('blur-background-js');
    bg.classList.remove('hidden');
    const form = document.getElementById('add-group-js');
    form.classList.remove('hidden');
    Observer.emit('group:listen-submit-form-button');
    Observer.emit('group:close-button-listen');
  };
};

const closeForm = () => {
  const bg = document.getElementById('blur-background-js');
  bg.classList.add('hidden');
  const form = document.getElementById('add-group-js');
  form.classList.add('hidden');
}

const listenCloseButton = () => {
  const button = document.getElementsByClassName('close-add-group-js')[0];
  button.onclick = () => {
    Observer.emit('group:close-form');
  };
};

const groupRenderCallback = () => {
  console.log(`[DEBUG] group:render callback`);
  Observer.emit('group:plus-button-listen');
  Observer.emit('group:search');
};

const formSubmitCallback = () => {
  console.log(`[DEBUG] group:listen-submit-form-button callback`);
  const form = document.getElementById('js-group-form');
  form.onsubmit = evt => {
    evt.preventDefault();
    if (form.elements.photo.files[0]) {

      let body = new FormData();
      body.append('fileData', form.elements.photo.files[0]);

      fetchMultipartPOST({
        url:  'https://social-hub.ru/upload',
        body,
        callback: response => {
          response.json().then( data => {
              Observer.emit('group:afterPhoto', data);
            }
          )
        }
      })
    } else {
      Observer.emit('group:afterPhoto');
    }
  }
}

const afterPhotoCallback = data => {
  console.log(`[DEBUG] group:afterPhoto callback`);

  let photoUrl = undefined;
  if (data) {
    photoUrl = 'https://social-hub.ru' + data.filename;
  }

  const form = document.getElementById('js-group-form');

  const about = form.elements.text.value;
  const name = form.elements.name.value;
  form.reset();
  fetchPOST({
    url: BACKEND_IP + `/api/v1/group/create`,
    body: JSON.stringify({
      name,
      about,
      photoUrl,
    }),
    callback: response => {
      if (response.status === 200) {
        console.log(response);
        Observer.emit('group:close-form');
        fetchGET({
          url: BACKEND_IP + '/api/v1/group/list',
          callback: response => {
            response.json()
              .then(response => {
                const data = {
                  groups: response,
                  main: true,
                }
                const list = document.getElementById('js-group-list');
                list.innerHTML = groupList(data)
              })
          }
        })
      }
    }
  })
}

const searchCallback = () => {
  console.log('group:search');
  const search = document.getElementById('js-search');
  const searchForm = document.getElementById('js-search-form');
  searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
  })
  search.addEventListener('input', () => {
    if (search.value) {
      fetchGET({
        url: BACKEND_IP + '/api/v1/group/search/' + search.value,
        callback: response => {
          response.json()
            .then(response => {
              const data = {
                groups: response,
                main: true,
              }
              const list = document.getElementById('js-group-list');
              list.innerHTML = groupList(data)
            })
        }
      })
    } else {
      fetchGET({
        url: BACKEND_IP + '/api/v1/group/list',
        callback: response => {
          response.json()
            .then(response => {
              const data = {
                groups: response,
                main: true,
              }
              const list = document.getElementById('js-group-list');
              list.innerHTML = groupList(data)
            })
        }
      })
    }
  })
}

Observer.on('group:search', searchCallback)
Observer.on('group:plus-button-listen', listenPlusButton);
Observer.on('group:render', groupRenderCallback);
Observer.on('group:close-button-listen', listenCloseButton);
Observer.on('group:close-form', closeForm);
Observer.on('group:listen-submit-form-button', formSubmitCallback);
Observer.on('group:afterPhoto',afterPhotoCallback);
