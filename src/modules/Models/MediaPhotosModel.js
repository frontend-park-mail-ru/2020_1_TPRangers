import Observer from '../../controller/observer';


const listenPlusButton = () => {
  const button = document.getElementsByClassName('add-photo-button-js')[0];
  button.onclick = () => {
    const bg = document.getElementById('blur-background-js');
    bg.classList.remove('hidden');
    const form = document.getElementsByClassName('add-photo-js')[0];
    form.classList.remove('hidden');
    Observer.emit('addPhotos:render');
    Observer.emit('photos:listen-close-button');
  };
};

const closeForm = () => {
  const bg = document.getElementById('blur-background-js');
  bg.classList.add('hidden');
  const form = document.getElementsByClassName('add-photo-js')[0];
  form.classList.add('hidden');
}

const listenCloseButton = () => {
  const button = document.getElementsByClassName('close-add-photo-js')[0];
  console.log(button)
  button.onclick = () => {
    Observer.emit('photos:close-createPhoto-form');
  };
};

Observer.on('photos:close-createPhoto-form', closeForm);
Observer.on('photos:listen-close-button', listenCloseButton);
Observer.on('photos:listen-plus-button', listenPlusButton);
