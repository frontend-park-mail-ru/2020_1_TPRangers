import Observer from '../../controller/observer';


const listenPlusButton = () => {
  const button = document.getElementsByClassName('add-album-button-js')[0];
  button.onclick = () => {
    const bg = document.getElementById('blur-background-js');
    bg.classList.remove('hidden');
    const form = document.getElementsByClassName('add-album-js')[0];
    form.classList.remove('hidden');
    Observer.emit('createAlbum:render');
    Observer.emit('listen-close-button');
  };
};

const closeForm = () => {
  const bg = document.getElementById('blur-background-js');
  bg.classList.add('hidden');
  const form = document.getElementsByClassName('add-album-js')[0];
  form.classList.add('hidden');
}

const listenCloseButton = () => {
  const button = document.getElementsByClassName('close-add-album-js')[0];
  button.onclick = () => {
      Observer.emit('close-createAlbum-form');
  };
};

Observer.on('close-createAlbum-form', closeForm);
Observer.on('listen-close-button', listenCloseButton);
Observer.on('listen-plus-button', listenPlusButton);
