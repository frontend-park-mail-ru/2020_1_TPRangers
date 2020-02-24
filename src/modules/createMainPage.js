const mainPageTmpl = require('../templates/mainPage.pug');

export default function createMainPage(parent, dataForRouting) {
  parent.innerHTML = '';
  parent.innerHTML += mainPageTmpl(dataForRouting);
}
