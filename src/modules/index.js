// Main modules file
import { Router } from "../Routes/routes";

import Observer from "../controller/observer";
import {fetchGET } from '../ajax/ajax';

Observer.on("login", data => {
  console.log(data);
});

fetchGET({
  url: BACKEND_IP+'/api/v1/profile',
  callback: response => {
    response.json().then (
      data => {console.log(data);}
    )
  }
});

const leftBlockTmpl = require("../pug/includes/modules/left-block.pug");
const testTmpl = require("../pug/pages/news.pug");

const app = document.getElementById("application");
if (!app) console.log("app not found");

app.addEventListener("click", evt => {
  if (evt.target instanceof Element) {
    if (evt.target.tagName === "IMG") {
      evt.preventDefault();

      const aNode = evt.target.parentNode;

      if (aNode.getAttribute("section") === "profile") {
        // TODO: Тут надо будет добавить обработку id  пользователя, чья страница
        Router.navigate(`${aNode.getAttribute("section")}/2`);
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
leftBlock.innerHTML += leftBlockTmpl();

const mainBlock = document.getElementById("main-block");

// const rightBlock = document.getElementById('right-block');

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
    console.log("messages");
    mainBlock.innerHTML = testTmpl({ data: "Сообщения" });
  })
  .add(/media/, () => {
    console.log("media");
    mainBlock.innerHTML = testTmpl({ data: "Мадиатека" });
  })
  .add(/settings/, () => {
    console.log("settings");
    mainBlock.innerHTML = testTmpl({ data: "Настройки" });
  })
  .add(/profile\/(.*)/, () => {
    console.log(Router.getFragment());
    console.log("profile");
    mainBlock.innerHTML = testTmpl({ data: "Профиль пользователя" });
  })
  .add(/main/, () => {
    console.log("main");
    mainBlock.innerHTML = testTmpl({ data: "Главная страница" });
  })
  .listen();

Router.callCurrent();
