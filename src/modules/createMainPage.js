const mainPageTmpl = require('../templates/mainPage.pug');


export function createMainPage(parent, dataForRouting) {
  parent.innerHTML = '';
  parent.innerHTML += mainPageTmpl(dataForRouting);
}
