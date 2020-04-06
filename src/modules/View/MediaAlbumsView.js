import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';


const mediaAlbumsTmpl = require('../../pug/pages/mediaAlbums.pug');

export default class MediaAlbumsView extends IView{

    render() {
      super.clear();

      fetchGET({
        url: BACKEND_IP + '/api/v1/media',

        callback: response => {
          response.json().then(response => {

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

            console.log(response.body);
            this.parent.innerHTML += mediaAlbumsTmpl(dataForTest); // response.body
          })
        }
      });
    }

}
