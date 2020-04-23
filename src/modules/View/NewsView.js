import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';



const newsTmpl = require('../../pug/pages/news.pug');

 export default class NewsView extends IView{

    render() {
      fetchGET({
        url: BACKEND_IP + '/api/v1/news',

        callback: response => {
          response.json().then(response => {
            console.log(response);
            let posts = {
              main: true,
              feed: response,
            }
            super.clear();
            this.parent.innerHTML += newsTmpl(posts); // response.body
            Observer.emit('listenPostsLikes')
          })
        }
      });
    }

}

