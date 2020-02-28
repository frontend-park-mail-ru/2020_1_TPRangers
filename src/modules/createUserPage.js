import { fetchGET } from './ajax';

const profileTmpl = require('../templates/profile.pug');
/**
 * Данные заглушка для рендера страницы другого пользователя
 * @type {{feed: [{PostText: string, PostName: string, PostPhoto: string}, {PostText: string,
 * PostName: string, PostPhoto: string}, {PostText: string, PostName: string, PostPhoto: string}],
 * user: {isMe: boolean, Username: string, Photo: string, Date: string}}}
 */
const ptrData = {
  user: {
    Username: 'Not You',
    Date: '42.42.1982',
    Photo:
      'https://peopletalk.ru/wp-content/uploads/2019/09/snimok-ekrana-2019-09-20-v-18.54.44-640x449.png',
    isMe: false,
  },

  feed: [
    {
      PostName: 'Default post name',
      PostText:
        'Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry. Lorem Ipsum has been the industrys' +
        ' standard dummy text ever since the 1500s, when an unknown' +
        ' printer took a galley of type and scrambled it to make a type' +
        ' specimen book. It has survived not only five centuries, but also' +
        ' the leap into electronic typesetting, remaining essentially' +
        ' unchanged. It was popularised in the 1960s with the release of' +
        ' Letraset sheets containing Lorem Ipsum passages, and more recently' +
        ' with desktop publishing software like Aldus PageMaker including ' +
        'versions of Lorem Ipsum.',
      PostPhoto: 'https://picsum.photos/200/300?grayscale',
    },
    {
      PostName: 'Default post name',
      PostText:
        'Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry. Lorem Ipsum has been the industrys' +
        ' standard dummy text ever since the 1500s, when an unknown' +
        ' printer took a galley of type and scrambled it to make a type' +
        ' specimen book. It has survived not only five centuries, but also' +
        ' the leap into electronic typesetting, remaining essentially' +
        ' unchanged. It was popularised in the 1960s with the release of' +
        ' Letraset sheets containing Lorem Ipsum passages, and more recently' +
        ' with desktop publishing software like Aldus PageMaker including ' +
        'versions of Lorem Ipsum.',
      PostPhoto: 'https://picsum.photos/200/300?grayscale',
    },
    {
      PostName: 'Default post name',
      PostText:
        'Lorem Ipsum is simply dummy text of the printing and ' +
        'typesetting industry. Lorem Ipsum has been the industrys' +
        ' standard dummy text ever since the 1500s, when an unknown' +
        ' printer took a galley of type and scrambled it to make a type' +
        ' specimen book. It has survived not only five centuries, but also' +
        ' the leap into electronic typesetting, remaining essentially' +
        ' unchanged. It was popularised in the 1960s with the release of' +
        ' Letraset sheets containing Lorem Ipsum passages, and more recently' +
        ' with desktop publishing software like Aldus PageMaker including ' +
        'versions of Lorem Ipsum.',
      PostPhoto: 'https://picsum.photos/200/300?grayscale',
    },
  ],
};

/**
 * Класс для создания страницы другого пользователя
 */
class UserPage {
  set parent(parent) {
    // eslint-disable-next-line no-underscore-dangle
    this._parent = parent;
  }

  get parent() {
    // eslint-disable-next-line no-underscore-dangle
    return this._parent;
  }

  /**
   * Рендер шаблона для страницы другого пользователя
   * @DOM-Object parent
   */
  renderTmpl(parent) {
    this.parent = parent;
    this.parent.innerHTML = '';
    /**
     * GET запрос для полученя данных о пользователе
     */
    fetchGET({
      url: 'http://138.68.77.22:3001/api/v1/profile',
      callback: response => {
        console.log(response);
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          return;
        }

        response.json().then(data => {
          console.log(data);
          // this.parent.innerHTML += profileTmpl(data.body);
        });
      },
    });
    /**
     * Рендер заглушки для страницы пользователя
     */
    this.parent.innerHTML += profileTmpl(ptrData);
  }
}

export default new UserPage();
