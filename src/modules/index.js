// Main modules file
import { Router } from "../Routes/routes";

import LoginView from './View/LoginView';
import Observer from '../controller/observer';
import RegView from './View/RegView';

import UserProfileView from './View/UserProfileView';

import SettingsView from './View/SettingsView';


// const leftBlockTmpl = require("../pug/includes/modules/left-block.pug");
const testTmpl = require('../pug/pages/news.pug');


const app = document.getElementById('application');

if (!app) console.log('app not found');

app.addEventListener('click', evt => {
  if (evt.target instanceof Element) {
    if (evt.target.tagName === "IMG") {
      evt.preventDefault();

      const aNode = evt.target.parentNode;

      if (aNode.getAttribute("section") === "profile") {
        // TODO: Тут надо будет добавить обработку id  пользователя, чья страница
        Router.navigate(`${aNode.getAttribute("section")}`);
      } else {
        Router.navigate(aNode.getAttribute("section"));
      }
    } else if (evt.target.tagName === "A") {
      evt.preventDefault();
      Router.navigate(evt.target.getAttribute("section"));
    }
  }
});


const leftBlock = document.getElementById("left-block");

const mainBlock = document.getElementById("main-block");

const rightBlock = document.getElementById('right-block');





// TODO: Тут надо добавить обработчики всех страниц
Router.config({ mode: "history" });

Router.add(/news/, () => {
  console.log("news");
  mainBlock.innerHTML = testTmpl({ data: "Новости" });
})
    .add(/friends/, () => {
      console.log("friends");
      mainBlock.innerHTML = testTmpl({ data: "Друзья" });
    })
    .add(/messages/, () => {
      console.log('messages');
      mainBlock.innerHTML = testTmpl({ data: 'Сообщения' });
    })
    .add(/media/, () => {
      console.log('media');
      mainBlock.innerHTML = testTmpl({ data: 'Медиатека' });
    })
    .add(/settings/, () => {
      console.log('settings');
      let settings = new SettingsView(mainBlock);
      settings.render();
    })
    .add(/profile\/(.*)/, () => {
      console.log(Router.getFragment());
      console.log('profile');

      mainBlock.innerHTML = testTmpl({ data: 'Профиль пользователя не мой' });
    })
    .add(/profile/, () => {
      console.log(Router.getFragment());
      console.log('profile');

      let userProfile = new UserProfileView(mainBlock);
      userProfile.render();

    })
    .add(/login/, () => {
      let login = new LoginView(mainBlock);
      login.render();
    })
    .add(/reg/, () => {
      let reg = new RegView(mainBlock);
      reg.render();
    } )
    .listen();


Router.callCurrent();
//Initial check to understand if user authorized and to check '/' route
Observer.emit('start');
