import IView from './IView';
import Observer from '../../controller/observer';
import { fetchGET } from '../../ajax/ajax';

const newsTmpl = require('../../pug/pages/news.pug');

 export default class NewsView extends IView{

    render() {
      fetchGET({
        url: BACKEND_IP + '/api/v1/profile',
        callback: profileResp => {
          profileResp.json()
            .then(profileResp => {
              fetchGET({
                url: BACKEND_IP + '/api/v1/news',

                callback: response => {
                  response.json().then(response => {
                    response.forEach(val => {
                      val.post = true
                      val.isMe = profileResp.user.login === val.authorUrl;
                      let date = new Date(Date.parse(val.date));
                      val.date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' в ' + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
                    })
                    let posts = {
                      main: true,
                      feed: response,
                    }
                    //console.log(posts)
                    super.clear();
                    this.parent.innerHTML += newsTmpl(posts); // response.body
                    Observer.emit('listenPostsLikes')
                  })
                }
              });
            })
        }
      });
    }
 }
