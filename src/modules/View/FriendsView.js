import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';


const friendsTmpl = require('../../pug/pages/friends.pug');

export default class ProfileView extends IView{

    render() {
      super.clear();

      fetchGET({
        url: BACKEND_IP + '/api/v1/friends',

        callback: response => {
          response.json().then(response => {

            const dataForTest = {
              main: true,
              body: [
                    {
                        name: 'Бонд',
                        surname: 'Джеймс',
                        id: 'blabla',
                        isOnline: false,
                        avatar: 'https://picsum.photos/200'
                    },
                    {
                      name: 'Бонд',
                      surname: 'Джеймс',
                      id: 'blabla',
                      isOnline: false,
                      avatar: 'https://picsum.photos/200'
                    },
                    {
                      name: 'Бонд',
                      surname: 'Джеймс',
                      id: 'blabla',
                      isOnline: false,
                      avatar: 'https://picsum.photos/200'
                    },
                    {
                      name: 'Бонд',
                      surname: 'Джеймс',
                      id: 'blabla',
                      isOnline: false,
                      avatar: 'https://picsum.photos/200'
                    },
                    {
                      name: 'Бонд',
                      surname: 'Джеймс',
                      id: 'blabla',
                      isOnline: false,
                      avatar: 'https://picsum.photos/200'
                    },
                    {
                      name: 'Бонд',
                      surname: 'Джеймс',
                      id: 'blabla',
                      isOnline: false,
                      avatar: 'https://picsum.photos/200'
                    },
                    {
                      name: 'Бонд',
                      surname: 'Джеймс',
                      id: 'blabla',
                      isOnline: false,
                      avatar: 'https://picsum.photos/200'
                  },
                  {
                    name: 'Бонд',
                    surname: 'Джеймс',
                    id: 'blabla',
                    isOnline: false,
                    avatar: 'https://picsum.photos/200'
                  },
                  {
                    name: 'Бонд',
                    surname: 'Джеймс',
                    id: 'blabla',
                    isOnline: false,
                    avatar: 'https://picsum.photos/200'
                  },
                  {
                    name: 'Бонд',
                    surname: 'Джеймс',
                    id: 'blabla',
                    isOnline: false,
                    avatar: 'https://picsum.photos/200'
                  },
                  {
                    name: 'Бонд',
                    surname: 'Джеймс',
                    id: 'blabla',
                    isOnline: false,
                    avatar: 'https://picsum.photos/200'
                  },
                  {
                    name: 'Бонд',
                    surname: 'Джеймс',
                    id: 'blabla',
                    isOnline: false,
                    avatar: 'https://picsum.photos/200'
                  }
                ]
            }

            console.log(response.body);
            response.body.main = true;
            this.parent.innerHTML += friendsTmpl(response.body); // response.body
            Observer.emit('profile:render', response);
          })
        }
      });
    }

}


