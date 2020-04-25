import { Router } from '../../Routes/routes';
import Observer from '../../controller/observer'
import { fetchMultipartPOST, fetchPOST } from '../../ajax/ajax';


const createDialogRenderCallback = () => {
  console.log(`[DEBUG] createDialog:render callback`);

  const postForm = document.getElementById('js-createDialog-form');

  postForm.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event.target);
  });
};


Observer.on('createDialog:render', createDialogRenderCallback);
