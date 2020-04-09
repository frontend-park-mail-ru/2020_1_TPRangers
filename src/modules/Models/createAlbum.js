import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import { fetchPOST } from '../../ajax/ajax';

const createAlbumRenderCallback = () => {
  const albumForm = document.getElementById('js-createAlbum-form');
  albumForm.addEventListener('submit', event => {
    event.preventDefault();
    Observer.emit('createAlbum:send', albumForm);
  })
}

const sendAlbumNameCallback = form => {
  const name = form.elements.text.value;
  fetchPOST({
    url: BACKEND_IP + '/api/v1/album',
    body: JSON.stringify({
      name,
    }),
    callback: response => {
      if (response.status === 200) {
        Router.navigate('media');
      }
    }
  })
}

Observer.on('createAlbum:send', sendAlbumNameCallback)
Observer.on('createAlbum:render', createAlbumRenderCallback);
