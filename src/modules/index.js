// Main modules file
import { Router } from "../Routes/routes";

import LoginView from "./View/LoginView";
import Observer from "../controller/observer";
import RegView from "./View/RegView";

import ProfileView from "./View/ProfileView";
import SettingsView from "./View/SettingsView";
import FriendsView from "./View/FriendsView";
import NewsView from "./View/NewsView";
import MediaView from "./View/MediaAlbumsView";
import UserView from "./View/UserView";
import MediaPhotosView from "./View/MediaPhotosView";
import SendPost from "./View/createPostView";
import CreateAlbum from "./View/createAlbum";
import AddPhotos from "./View/addPhotos";

// const leftBlockTmpl = require("../pug/includes/modules/left-block.pug");
const testTmpl = require("../pug/pages/news.pug");

const app = document.getElementById("app");

if (!app) console.log("app not found");

app.addEventListener("click", evt => {
  if (evt.target instanceof Element) {
    if (
      evt.target.tagName === "I" ||
      evt.target.tagName === "LI" ||
      evt.target.tagName === "IMG"
    ) {
      evt.preventDefault();
      const aNode = evt.target.parentNode;

      if (aNode.tagName === "A") Router.navigate(aNode.getAttribute("section"));
    } else if (evt.target.tagName === "A") {
      evt.preventDefault();
      Router.navigate(evt.target.getAttribute("section"));
    }
  }
});

const mainBlock = document.getElementById("main-block");

//Service Worker init
//
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('../sw.js')
//       .then(() => {
//         console.log('[DEBUG] ServiceWorker registered');
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   });
// }

// TODO: Тут надо добавить обработчики всех страниц
Router.config({ mode: "history" });

Router.add(/news/, () => {
  console.log("news");
  let news = new NewsView(mainBlock);
  news.render();
})
  .add(/friends/, () => {
    console.log("friends");
    let friends = new FriendsView(mainBlock);
    friends.render();
  })
  .add(/logout/, () => {
    console.log("logout");
    Observer.emit("logout");
  })
  .add(/media/, () => {
    let media = new MediaView(mainBlock);
    media.render();
    console.log("media");
  })
  .add(/album\/(.*)/, () => {
    console.log(Router.getFragment());

    let photos = new MediaPhotosView(mainBlock);
    photos.render();
  })
  .add(/settings/, () => {
    console.log("settings" + window.location.href);
    let settings = new SettingsView(mainBlock);
    settings.render();
  })
  .add(/user\/(.*)/, () => {
    // console.log(Router.getFragment());
    // console.log('login:', Router.getFragment().split('/')[1]); // так можно вытащить login user

    let user = new UserView(mainBlock);
    user.render(Router.getFragment().split("/")[1]);
  })
  .add(/profile/, () => {
    // console.log(Router.getFragment());
    console.log("profile");

    let userProfile = new ProfileView(mainBlock);
    userProfile.render();
  })
  .add(/login/, () => {
    let login = new LoginView(mainBlock);
    login.render();
  })
  .add(/reg/, () => {
    let reg = new RegView(mainBlock);
    reg.render();
  })
  .add(/createPost\/(.*)/, () => {
    let createPost = new SendPost(mainBlock);
    createPost.render();
  })
  .add(/createAlbum/, () => {
    let createAlbum = new CreateAlbum(mainBlock);
    createAlbum.render();
  })
  .add(/addPhotos\/(.*)/, () => {
    let addPhotos = new AddPhotos(mainBlock);
    addPhotos.render();
  })
  .add(
    /(?!news$)(?!friends$)(?!messages$)(?!media$)(?!album\/(.*)$)(?!settings$)(?!user\/(.*)$)(?!profile$)(?!login$)(?!reg$)(?!logout$)/,
    () => {
      let news = new NewsView(mainBlock);
      news.render();
    }
  )
  .listen();

if (navigator.onLine) {
  Router.callCurrent();
  //Initial check to understand if user authorized and to check '/' route
  Observer.emit("start");
} else {
  Observer.emit("render:error", {
    status: "Вы оффлайн",
    text: "Надеемся, что вы скоро снова присоденитесь к нам ",
    backButton: false
  });
}
