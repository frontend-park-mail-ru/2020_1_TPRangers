import Observer from '../../controller/observer';

let userLoginInner;

const listenPlusButton = () => {
  const button = document.getElementsByClassName('add-post-button-js')[0];
  button.onclick = () => {
    const bg = document.getElementById('blur-background-js');
    bg.classList.remove('hidden');
    const form = document.getElementById('add-post-js');
    form.classList.remove('hidden');
    Observer.emit("post:render", userLoginInner);
    Observer.emit('profile:close-button-listen');
  };
};

const closeForm = () => {
  const bg = document.getElementById('blur-background-js');
  bg.classList.add('hidden');
  const form = document.getElementById('add-post-js');
  form.classList.add('hidden');
}

const listenCloseButton = () => {
  const button = document.getElementsByClassName('close-add-post-js')[0];
  button.onclick = () => {
    Observer.emit('profile:close-form');
  };
};

const profileRenderCallback = userLogin => {
  console.log(`[DEBUG] profile:render callback`);
  Observer.emit('profile:plus-button-listen');
  userLoginInner = userLogin;
};

Observer.on('profile:plus-button-listen', listenPlusButton);
Observer.on('profile:render', profileRenderCallback);
Observer.on('profile:close-button-listen', listenCloseButton);
Observer.on('profile:close-form', closeForm);
