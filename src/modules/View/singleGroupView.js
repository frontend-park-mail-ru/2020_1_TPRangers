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
      url: BACKEND_IP + '/api/v1/profile',
      callback: profileResp => {
        profileResp.json()
          .then(profileResp => {
            fetchGET({
              url: BACKEND_IP + `/api/v1/group/${groupId}/profile`,

              callback: response => {
                response.json()
                  .then(response => {
                    if (!response.members) {
                      response.members = []
                    }
                    response.members.forEach(val => {
                      val.isMe = val.url === profileResp.user.login;
                    })
                    response.owner.isOwner = response.owner.url === profileResp.user.login;
                    data.profile = response;
                    fetchGET({
                      url: BACKEND_IP + `/api/v1/group/${groupId}/feed`,

                      callback: response => {
                        response.json()
                          .then(response => {
                            response.forEach(val => {
                              val.isMe = val.authorUrl === profileResp.user.login;
                              val.post = true
                              let date = new Date(Date.parse(val.date));
                              val.date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
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
          })
      }
    })
  }
}
