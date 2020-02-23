let template = require("./templates/mainLinks.pug");
import  "./css/styles.css"
import  "./css/normalize.css"

let locals = {
  users: [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5"
  ]
};

document.querySelector("main").innerHTML = template(locals);