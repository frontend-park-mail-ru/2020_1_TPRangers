import { fetchGET } from './ajax';

const newsTmpl = require('../templates/newsFeedPage.pug');

const data = {
  posts: [
    {
      postName: 'Default post name',
      textData:
        'Lorem Ipsum is simply dummy text of the printing and typesetting' +
        ' industry. Lorem Ipsum has been the industrys standard dummy ' +
        'text ever since the 1500s, when an unknown printer took a ' +
        'galley of type and scrambled it to make a type specimen book. ' +
        'It has survived not only five centuries, but also the leap into' +
        ' electronic typesetting, remaining essentially unchanged. ' +
        'It was popularised in the 1960s with the release of Letraset' +
        ' sheets containing Lorem Ipsum passages, and more recently ' +
        'with desktop publishing software like Aldus PageMaker including' +
        ' versions of Lorem Ipsum.',
      imageData: 'https://picsum.photos/200/300?grayscale',
    },
    {
      postName: 'Default post name',
      textData:
        'Lorem Ipsum is simply dummy text of the printing and typesetting' +
        ' industry. Lorem Ipsum has been the industrys standard dummy ' +
        'text ever since the 1500s, when an unknown printer took a ' +
        'galley of type and scrambled it to make a type specimen book. ' +
        'It has survived not only five centuries, but also the leap into' +
        ' electronic typesetting, remaining essentially unchanged. ' +
        'It was popularised in the 1960s with the release of Letraset' +
        ' sheets containing Lorem Ipsum passages, and more recently ' +
        'with desktop publishing software like Aldus PageMaker including' +
        ' versions of Lorem Ipsum.',
      imageData: 'https://picsum.photos/200/300?grayscale',
    },
    {
      postName: 'Default post name',
      textData:
        'Lorem Ipsum is simply dummy text of the printing and typesetting' +
        ' industry. Lorem Ipsum has been the industrys standard dummy ' +
        'text ever since the 1500s, when an unknown printer took a ' +
        'galley of type and scrambled it to make a type specimen book. ' +
        'It has survived not only five centuries, but also the leap into' +
        ' electronic typesetting, remaining essentially unchanged. ' +
        'It was popularised in the 1960s with the release of Letraset' +
        ' sheets containing Lorem Ipsum passages, and more recently ' +
        'with desktop publishing software like Aldus PageMaker including' +
        ' versions of Lorem Ipsum.',
      imageData: 'https://picsum.photos/200/300?grayscale',
    },
    {
      postName: 'Default post name',
      textData:
        'Lorem Ipsum is simply dummy text of the printing and typesetting' +
        ' industry. Lorem Ipsum has been the industrys standard dummy ' +
        'text ever since the 1500s, when an unknown printer took a ' +
        'galley of type and scrambled it to make a type specimen book. ' +
        'It has survived not only five centuries, but also the leap into' +
        ' electronic typesetting, remaining essentially unchanged. ' +
        'It was popularised in the 1960s with the release of Letraset' +
        ' sheets containing Lorem Ipsum passages, and more recently ' +
        'with desktop publishing software like Aldus PageMaker including' +
        ' versions of Lorem Ipsum.',
      imageData: 'https://picsum.photos/200/300?grayscale',
    },
    {
      postName: 'Default post name',
      textData:
        'Lorem Ipsum is simply dummy text of the printing and typesetting' +
        ' industry. Lorem Ipsum has been the industrys standard dummy ' +
        'text ever since the 1500s, when an unknown printer took a ' +
        'galley of type and scrambled it to make a type specimen book. ' +
        'It has survived not only five centuries, but also the leap into' +
        ' electronic typesetting, remaining essentially unchanged. ' +
        'It was popularised in the 1960s with the release of Letraset' +
        ' sheets containing Lorem Ipsum passages, and more recently ' +
        'with desktop publishing software like Aldus PageMaker including' +
        ' versions of Lorem Ipsum.',
      imageData: 'https://picsum.photos/200/300?grayscale',
    },
    {
      postName: 'Default post name',
      textData:
        'Lorem Ipsum is simply dummy text of the printing and typesetting' +
        ' industry. Lorem Ipsum has been the industrys standard dummy ' +
        'text ever since the 1500s, when an unknown printer took a ' +
        'galley of type and scrambled it to make a type specimen book. ' +
        'It has survived not only five centuries, but also the leap into' +
        ' electronic typesetting, remaining essentially unchanged. ' +
        'It was popularised in the 1960s with the release of Letraset' +
        ' sheets containing Lorem Ipsum passages, and more recently ' +
        'with desktop publishing software like Aldus PageMaker including' +
        ' versions of Lorem Ipsum.',
      imageData: 'https://picsum.photos/200/300?grayscale',
    },
  ],
};

class CreateNewsPage {
  set parent(parent) {
    // eslint-disable-next-line no-underscore-dangle
    this._parent = parent;
  }

  get parent() {
    // eslint-disable-next-line no-underscore-dangle
    return this._parent;
  }

  renderTmpl(parent) {
    fetchGET({
      url: 'http://138.68.77.22:3001/api/v1/news',
      callback: response => {
        console.log(response);
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);

          return;
        }

        response.json().then(data => {
          console.log(data);
        });
      },
    });

    this.parent = parent;
    this.parent.innerHTML = '';
    this.parent.innerHTML += newsTmpl(data);
  }
}

export default new CreateNewsPage();
