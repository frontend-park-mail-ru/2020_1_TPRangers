import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';

const dataForTest = {
  main: true,
  body: [
    {
      title: 'Hello',
      img: 'https://picsum.photos/seed/picsum/400/400',
      id: 1,
    },
    {
      title: 'ntern',
      img: 'https://picsum.photos/id/237/200/300',
      id: 2,
    },
    {
      title: 'assets',
      img: null,
      id: 3,
    },
    {
      title: 'Placeat',
      img: 'https://picsum.photos/200/300/?blur=2',
      id: 4,
    },
  ]
}

const mediaAlbumsTmpl = require('../../pug/pages/albums.pug');

export default class MediaAlbumsView extends IView{

    render() {
      super.clear();

      fetchGET({
        url: BACKEND_IP + '/api/v1/albums',

        callback: response => {
          response.json().then(response => {
            console.log(response);
            const albums = {
              main: true,
              albums: response
            }
            this.parent.innerHTML += mediaAlbumsTmpl(albums); // albums
            Observer.emit("listen-plus-button");
          })
        }
      });
    }

}
