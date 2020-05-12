import Observer from '../../controller/observer'
import {fetchGET} from '../../ajax/ajax';

const friendList = require('../../pug/mixins/friendsList.pug')
const otherUsersList = require('../../pug/mixins/otherUsersList.pug')

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
        url: BACKEND_IP + '/api/v1/friends/search/' + search.value,
        callback: response => {
          response.json()
            .then(response => {
              const data = {
                friends: response
              }
              console.log(response)
              const list = document.getElementById('js-friends-list');
              list.innerHTML = friendList(data)
            })
        }
      })
      fetchGET({
        url: BACKEND_IP + '/api/v1/users/search/' + search.value,
        callback: response => {
          response.json()
            .then(response => {
              const data = {
                otherUsers: response
              }
              console.log(response)
              const list = document.getElementById('js-otherusers-list');
              list.innerHTML = otherUsersList(data)
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
              const otherList = document.getElementById('js-otherusers-list');
              list.innerHTML = friendList(data)
              otherList.innerHTML = ''
            })
        }
      })
    }
  })
}

Observer.on('friends:render', friendsRenderCallback)
