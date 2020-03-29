import IView from './IView';
import Observer from '../../controller/observer';

const userProfileTmpl = require('../../pug/pages/userProfile.pug');

const dataForUserBlock = {
  header: true,

  fakeUserData: {
    name: 'Вика', 
    surname: 'Губанова', 
    online: true, 
    avatar: './assets/img/main-block/fakeUser/avatar.jpg', 
    background: './assets/img/main-block/fakeUser/background.jpg', 
    phone: '+7(995)117-78-08', 
    email: "blablabla@yandex.ru", 
    dateOfB: '10.02.2000', 

    media: [{ 
        link: 'photo/1', 
        src: 'https://picsum.photos/id/237/200/200' 
      }, { 
        link: 'photo/2', 
        src: 'https://picsum.photos/id/239/200/200' 
      }, { link: 'photo/3', 
            src: 'https://picsum.photos/id/238/200/200' 
      }
    ],

    posts: [{
      author: {
        name: 'Вика', 
        surname: 'Губанова', 
        id: 1, 
        avatar: './assets/img/main-block/fakeUser/avatar.jpg'
      },  
      dateOfPost: '12.03.2020', 
      text: 'Зенитное часовое число, следуя пионерской работе'
        + 'Эдвина Хаббла, параллельно. Наряду с этим, абсолютная погрешность '
        + 'distпредставляет собой действительный метеорит. Элонгация прекрасно '
        + 'проецирует натуральный логарифм, об этом в минувшую субботу сообщил '
        + 'заместитель администратора NASA. Высота, и это следует подчеркнуть, ' 
        + 'притягивает вращательный параметр, хотя для имеющих глаза-телескопы '
        + 'туманность Андромеды показалась бы на небе величиной с треть ковша Большой Медведицы.',
      img: null, 
      likes: 10, 
      comments: 4, 
      reply: 1
    },
    {
      author: {
        name: 'Вика', 
        surname: 'Губанова', 
        id: 1, 
        avatar: './assets/img/main-block/fakeUser/avatar.jpg'
      },  
      dateOfPost: '12.03.2020', 
      text: 'Зенитное часовое число, следуя пионерской работе'
        + 'Эдвина Хаббла, параллельно. Наряду с этим, абсолютная погрешность '
        + 'distпредставляет собой действительный метеорит. Элонгация прекрасно '
        + 'проецирует натуральный логарифм, об этом в минувшую субботу сообщил '
        + 'заместитель администратора NASA. Высота, и это следует подчеркнуть, ' 
        + 'притягивает вращательный параметр, хотя для имеющих глаза-телескопы '
        + 'туманность Андромеды показалась бы на небе величиной с треть ковша Большой Медведицы.',
      img: "https://picsum.photos/id/235/600/600", 
      likes: 10, 
      comments: 4, 
      reply: 1
    }],
  },
};



export default class UserProfileView extends IView{
    render() {
      super.render();
      this.parent.innerHTML += userProfileTmpl(dataForUserBlock);
      // Observer.emit('login:render');
    }
  }