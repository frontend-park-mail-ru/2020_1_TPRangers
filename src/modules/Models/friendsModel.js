import Observer from '../../controller/observer'
import {fetchGET} from '../../ajax/ajax';

const friendList = require('../../pug/includes/modules/friendList.pug')

const friendsRenderCallback = () => {
  console.log('friends:render');
  const search = document.getElementById('js-search');
  const searchForm = document.getElementById('js-search-form');
  searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
  })
  search.addEventListener('input', () => {
    if (search.value) {
      fetchGET({
        url: BACKEND_IP + '/api/v1/users/search/' + search.value,
        callback: response => {
          response.json()
            .then(response => {
              const data = {
                friends: response
              }
              const list = document.getElementById('js-friends-list');
              list.innerHTML = friendList(data)
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
