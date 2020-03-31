// Main modules file
import { Router } from "../Routes/routes";

import LoginView from './View/LoginView';
import Observer from '../controller/observer';
import RegView from './View/RegView';
import UserProfileView from './View/UserProfileView';


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

let userProfile = new UserProfileView(mainBlock);
    userProfile.render();


