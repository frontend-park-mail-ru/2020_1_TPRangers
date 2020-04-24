import Observer from '../../controller/observer'

const autoresizeCallback = elemId => {
  const textarea = document.getElementById(elemId);
  textarea.style.cssText = 'height:auto;';
  textarea.addEventListener('keydown', evt => {
    setTimeout(function () {
      evt.target.style.cssText = 'height:auto;';
      evt.target.style.cssText = 'height:' + evt.target.scrollHeight + 'px';
    }, 0);
  })
}

Observer.on('textarea:render', autoresizeCallback)
