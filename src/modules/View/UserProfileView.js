import IView from './IView';
import Observer from '../../controller/observer';

const userProfileTmpl = require('../../pug/pages/userProfile.pug');

const dataForUserBlocks = {
        header: true,
};

export default class UserProfileView extends IView{
    render() {
      super.render();
      this.parent.innerHTML += userProfileTmpl(dataForUserBlocks);
      // Observer.emit('login:render');
    }
  }