import IView from './IView';
import Observer from '../../controller/observer';

const userProfileTmpl = require('../../pug/pages/userProfile.pug');

const dataForUserBlocks = {
        page: true,
        fakeUserData: { name: 'Вика', 
        surname: 'Губанова', online: true, avatar: './assets/img/main-block/fakeUser/avatar.jpg', background: './assets/img/main-block/fakeUser/background.jpg', phone: '+7(995)117-78-08', email: "blablabla@yandex.ru", dateOfB: '10.02.2000',
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
export default class UserProfileView extends IView{
    render() {
      super.render();
      this.parent.innerHTML += userProfileTmpl(dataForUserBlocks);
      // Observer.emit('login:render');
    }
  }