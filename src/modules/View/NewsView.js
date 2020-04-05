import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';


const newsTmpl = require('../../pug/pages/news.pug');

export default class ProfileView extends IView{

    render() {
      super.render();

      fetchGET({
        url: BACKEND_IP + '/api/v1/friends',

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
                      img: 'https://picsum.photos/seed/picsum/400/400',
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
                      img: 'https://picsum.photos/id/237/200/300',
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
                      img: null,
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
                      img: 'https://picsum.photos/200/300/?blur=2',
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
                      img: 'https://picsum.photos/seed/picsum/400/400',
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
                      img: 'https://picsum.photos/200/300?grayscale',
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
                      img: null,
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
                      img: 'https://picsum.photos/200/300?grayscale',
                      likes: 10,
                    },
                ] 
            } 

            console.log(response.body);
            this.parent.innerHTML += newsTmpl(dataForTest); // response.body
          })
        }
      });
    }

}