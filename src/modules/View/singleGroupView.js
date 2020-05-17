import IView from "./IView";
import Observer from "../../controller/observer";
import { fetchGET } from "../../ajax/ajax";
import { Router } from '../../Routes/routes';

const groupTmpl = require('../../pug/pages/singleGroup.pug')

export default class singleGroupView extends IView {
  render () {
    this.clear();
    const groupId = Router.getFragment().split("/")[1];
    const data = {
      page: true,
    }

    fetchGET({
      url: BACKEND_IP + `/api/v1/group/${groupId}/profile`,

      callback: response => {
        response.json()
          .then(response => {
            if (!response.members) {
              response.members = []
            }
            data.profile = response;
            fetchGET({
              url: BACKEND_IP + `/api/v1/group/${groupId}/feed`,

              callback: response => {
                response.json()
                  .then(response => {
                    response.forEach(val => {
                      val.post = true
                    });
                    data.feed = response;
                    this.parent.innerHTML = groupTmpl(data);
                    Observer.emit('singleGroup:render');
                    Observer.emit('listenPostsLikes');
                  });
              }
            });
          });
      }
    });

  }
}
