import IView from "./IView";
import Observer from "../../controller/observer";
import { fetchGET } from "../../ajax/ajax";

const groupTmpl = require('../../pug/pages/groups.pug')

export default class GroupView extends IView {
  render () {
    super.clear()
    fetchGET({
      url: BACKEND_IP + '/api/v1/group/list',

      callback: response => {
        response.json().then(response => {
          const data = {
            groups: response,
            main: true,
          }
          console.log(data)
          this.parent.innerHTML += groupTmpl(data);
          Observer.emit('group:render');
        });
      }
    });
  }
}
