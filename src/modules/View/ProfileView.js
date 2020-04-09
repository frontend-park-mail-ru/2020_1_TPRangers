import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';


const userProfileTmpl = require('../../pug/pages/userProfile.pug');

const dataForUserBlocks = {
        page: true,
        user: {
        name: 'Вика',
        surname: 'Губанова',
        online: true,
          background:  '../assets/img/main-block/fakeUser/background.jpg',
        photo: './assets/img/main-block/fakeUser/avatar.jpg',
        telephone: '+7(995)117-78-08', email: "blablabla@yandex.ru",
        dateOfB: '10.02.2000',
        myProfile: true,
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
export default class ProfileView extends IView{

    render() {
      super.clear();
      fetchGET({
        url: BACKEND_IP + '/api/v1/profile',
        callback: response => {
          response.json().then(response => {
            response.body.page = true;
            response.body.user.background = '../assets/img/main-block/fakeUser/background.jpg';
            console.log(response.body);
            this.parent.innerHTML += userProfileTmpl(response.body);
            Observer.emit('listenPostsLikes');
          })
        }
      });
    }

}


