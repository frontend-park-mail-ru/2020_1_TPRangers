import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';


const userProfileTmpl = require('../../pug/pages/userPage.pug');

const dataForUserBlocks = {
        page: true,
        isFriends: true,
        fakeUserData: {
        name: 'Вика',
        surname: 'Губанова',
        online: true,
        photo: './assets/img/main-block/fakeUser/avatar.jpg',
        telephone: '+7(995)117-78-08', email: "blablabla@yandex.ru",
        dateOfB: '10.02.2000',
          background: './assets/img/main-block/fakeUser/background.jpg',
        id: 1,
        posts: [
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
        ],
        media: [
          {
            src: 'https://picsum.photos/200'
          },
          {
            src: 'https://picsum.photos/300'
          },
          {
            src: 'https://picsum.photos/100'
          }
        ],
      },
};
export default class UserView extends IView{

    render(id) {
      super.clear();
      fetchGET({
        url: BACKEND_IP + '/api/v1/user/' + id,
        callback: response => {
          response.json().then(response => {
            response.page = true;
            response.user.background = '../assets/img/main-block/fakeUser/background.jpg';
            if (!response.feed)
              response.feed = [];
            console.log(response);
            this.parent.innerHTML += userProfileTmpl(response);
            Observer.emit('user:render');
            Observer.emit('listenPostsLikes');
          })
        }
      });
    }

}


