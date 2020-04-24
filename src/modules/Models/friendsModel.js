import Observer from '../../controller/observer'
import {fetchGET} from '../../ajax/ajax';

const friendList = require('../../pug/includes/modules/friendList.pug')

const friendsRenderCallback = () => {
  console.log('friends:render');
  const search = document.getElementById('js-search');
  search.addEventListener('input', () => {
    console.log(search.value);
    if (search.value) {
      fetchGET({
        url: BACKEND_IP + '/api/v1/friends/search/' + search.value,
        callback: response => {
          response.json()
            .then(data => {
              console.log(data);
              const list = document.getElementById('js-friends-list');
              list.innerHTML = '<h1>Replace</h1>'
            })
        }
      })
    } else {
      fetchGET({
        url: BACKEND_IP + '/api/v1/friends',
        callback: response => {
          response.json()
            .then(response => {
              const data = {
                friends: response,
              }
              console.log(data);
              const list = document.getElementById('js-friends-list');
              list.innerHTML = friendList(data);
            })
        }
      })
    }
  })
}

Observer.on('friends:render', friendsRenderCallback)
