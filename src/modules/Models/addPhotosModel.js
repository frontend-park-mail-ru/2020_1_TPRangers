import { Router } from "../../Routes/routes";
import Observer from "../../controller/observer";
import { fetchMultipartPOST, fetchPOST } from "../../ajax/ajax";

const addPhotosRenderCallback = () => {
  const photoForm = document.getElementById("add-photo-form-js");
  // const photoInput = document.getElementById('photos');
  // photoInput.setAttribute('multiple','');
  (function listenFileUpload() {
    const photoForm = document.getElementById('add-photo-form-js');
    photoForm.elements.photo.oninput = evt => {
      if (photoForm.elements.photo.files[0]) {
        const label = document.getElementsByClassName('input-file-label')[0];
        label.innerText = "Файл добавлен";
      }
    }
  })()
  photoForm.addEventListener("submit", event => {
    event.preventDefault();
    Observer.emit("addPhotos:send", photoForm);
  });
};

const sendPhotosCallback = form => {
  let body = new FormData();
  body.append("fileData", form.elements.photo.files[0]);
  fetchMultipartPOST({
    url: PHOTO_URL,
    body,
    callback: response => {
      response.json().then(data => {
        Observer.emit("addPhotos:afterPhoto", data);
      });
    }
  });
};

const addPhotosAfter = data => {
  const url = data.filename;
  const album_id = Router.getFragment().split("/")[1];
  fetchPOST({
    url: BACKEND_IP + "/api/v1/album/photo",
    body: JSON.stringify({
      album_id,
      url
    }),
    callback: response => {
      if (response.status === 200) {
        Observer.emit('photos:close-createPhoto-form');
        Router.callCurrent();
      }
    }
  });
};

Observer.on("addPhotos:afterPhoto", addPhotosAfter);
Observer.on("addPhotos:send", sendPhotosCallback);
Observer.on("addPhotos:render", addPhotosRenderCallback);
