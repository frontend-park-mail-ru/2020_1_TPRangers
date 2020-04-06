import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';


const newsTmpl = require('../../pug/pages/news.pug');

export default class ProfileView extends IView{

    render() {
      super.clear();

      fetchGET({
        url: BACKEND_IP + '/api/v1/news',

        callback: response => {
          response.json().then(response => {

            const dataForTest = {
              main: true,
              body: [
                    {
                      author: {
                        name: 'nternational',
                        surname: 'nternational',
                        avatar: './assets/img/main-block/fakeUser/avatar.jpg',

                      },
                      dateOfPost: '10.01.01',
                      text: 'Placeat dolore pariatur et qui autem.',
                      photo: {url:'https://picsum.photos/seed/picsum/400/400'},
                      likes: 10,
                    },
                    {
                      author: {
                        name: 'nternational',
                        surname: 'nternational',
                        avatar: './assets/img/main-block/fakeUser/avatar.jpg',

                      },
                      dateOfPost: '10.01.01',
                      text: 'Placeat dolore pariatur et qui autem.',
                      photo: { url: 'https://picsum.photos/id/237/200/300'},
                      likes: 10,
                    },
                    {
                      author: {
                        name: 'nternational',
                        surname: 'nternational',
                        avatar: './assets/img/main-block/fakeUser/avatar.jpg',

                      },
                      dateOfPost: '10.01.01',
                      text: 'Placeat dolore pariatur et qui autem.',
                      photo: null,
                      likes: 10,
                    },
                    {
                      author: {
                        name: 'nternational',
                        surname: 'nternational',
                        avatar: './assets/img/main-block/fakeUser/avatar.jpg',

                      },
                      dateOfPost: '10.01.01',
                      text: 'Placeat dolore pariatur et qui autem.',
                      photo: {url: 'https://picsum.photos/200/300/?blur=2'},
                      likes: 10,
                    },
                    {
                      author: {
                        name: 'nternational',
                        surname: 'nternational',
                        avatar: './assets/img/main-block/fakeUser/avatar.jpg',

                      },
                      dateOfPost: '10.01.01',
                      text: 'Placeat dolore pariatur et qui autem.',
                      photo: {url: 'https://picsum.photos/seed/picsum/400/400'},
                      likes: 10,
                    },
                    {
                      author: {
                        name: 'nternational',
                        surname: 'nternational',
                        avatar: './assets/img/main-block/fakeUser/avatar.jpg',

                      },
                      dateOfPost: '10.01.01',
                      text: 'Placeat dolore pariatur et qui autem.',
                      photo: {urL: 'https://picsum.photos/200/300?grayscale'},
                      likes: 10,
                    },
                    {
                      author: {
                        name: 'nternational',
                        surname: 'nternational',
                        avatar: './assets/img/main-block/fakeUser/avatar.jpg',

                      },
                      dateOfPost: '10.01.01',
                      text: 'Placeat dolore pariatur et qui autem.',
                      photo: null,
                      likes: 10,
                    },
                    {
                      author: {
                        name: 'nternational',
                        surname: 'nternational',
                        avatar: './assets/img/main-block/fakeUser/avatar.jpg',

                      },
                      dateOfPost: '10.01.01',
                      text: 'Placeat dolore pariatur et qui autem.',
                      photo: {url:  'https://picsum.photos/200/300?grayscale'},
                      likes: 10,
                    },
                ]
            }

            console.log(response.body);
            response.body.main = true;
            response.body.feed.forEach(elem => {
              elem.author = {
                name: 'Вика',
                surname: 'Губанова',
                avatar: './assets/img/main-block/fakeUser/avatar.jpg',

              };
            });
            this.parent.innerHTML += newsTmpl(dataForTest); // response.body
          })
        }
      });
    }

}
