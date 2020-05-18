import Observer from '../../controller/observer'
import {fetchGET} from '../../ajax/ajax';

const friendList = require('../../pug/mixins/friendsList.pug')
const otherUsersList = require('../../pug/mixins/otherUsersList.pug')

const inputCallback = () => {
  const search = document.getElementById('js-search');
  const filter = document.getElementById('js-show-filter');
  if (search.value) {
    if (filter.classList.contains('display-none')) {
      filter.classList.remove('display-none');
    }
    const select = document.getElementById('js-age-filter');
    const year = select.options[select.selectedIndex].value;
    let query = ""
    if (year !== "") {
      query += `?year=${year}`
    }
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
      url: BACKEND_IP + '/api/v1/users/search/' + search.value + query,
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
    if (!filter.classList.contains('display-none')) {
      filter.classList.add('display-none');
    }
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
}

const friendsRenderCallback = () => {
  console.log('friends:render');
  const search = document.getElementById('js-search');
  const searchForm = document.getElementById('js-search-form');
  const select = document.getElementById('js-age-filter');
  searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
  })
  search.addEventListener('input', inputCallback);
  select.addEventListener('change', inputCallback);
}

Observer.on('friends:render', friendsRenderCallback)
