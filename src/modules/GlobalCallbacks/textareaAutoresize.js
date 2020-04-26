import Observer from '../../controller/observer'

const autoresizeCallback = elemId => {
  const textarea = document.getElementById(elemId);
  textarea.style.cssText = 'height:auto;';
  textarea.addEventListener('keydown', evt => {
    setTimeout(function () {
      if (evt.target.scrollHeight < 220 || evt.target.scrollHeight === 222) {
        evt.target.style.cssText = 'height:auto;';
        evt.target.style.cssText = 'height:' + evt.target.scrollHeight + 'px';
      } else {
        evt.target.style.cssText = 'height:auto;';
        evt.target.style.cssText = 'height:202px';
      }
    }, 0);
  })
}

Observer.on('textarea:render', autoresizeCallback)
