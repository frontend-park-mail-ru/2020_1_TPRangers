import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';
import {Router} from '../../Routes/routes';

const dataForTest = {
  main: true,
  title: 'Hello',
  body: [
    'https://picsum.photos/seed/picsum/400/400',
    'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/200/300/?blur=2',
    'https://picsum.photos/seed/picsum/400/400',
    'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/200/300/?blur=2',
    'https://picsum.photos/seed/picsum/400/400',
    'https://picsum.photos/id/237/200/300'
  ]
}

const photosTmpl = require('../../pug/pages/mediaPhotos.pug');

export default class MediaPhotosView extends IView{

    render() {
      super.clear();
      const albumUrl = Router.getFragment().split('/')[1];
      fetchGET({
        url: BACKEND_IP + '/api/v1/albums/' + albumUrl,

        callback: response => {
          response.json().then(response => {

            const album = {
              main: true,
              title: 'Test',
              body: response.body,
            }

            console.log(album);
            this.parent.innerHTML += photosTmpl(album); // response.body
          })
        }
      });
    }

}
