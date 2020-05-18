import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';

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

const newsTmpl = require('../../pug/pages/news.pug');

 export default class NewsView extends IView{

    render() {
      fetchGET({
        url: BACKEND_IP + '/api/v1/news',

        callback: response => {
          response.json().then(response => {
            console.log(response);
            response.forEach(val => {
              val.post = true
              if (val.photo.url) {
                let img = new Image();
                img.src = val.photo.url;
                img.onload = function() {
                  val.photo.width = this.width;
                  val.photo.height = this.height;
                }
              }
            })
            let posts = {
              main: true,
              feed: response,
            }
            console.log(posts)
            super.clear();
            this.parent.innerHTML += newsTmpl(posts); // response.body
            Observer.emit('listenPostsLikes')
          })
        }
      });
    }
 }
