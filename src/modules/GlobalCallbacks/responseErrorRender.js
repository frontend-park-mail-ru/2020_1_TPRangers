import Observer from '../../controller/observer';

let responseErrorRenderCallback = response => {
  response.json().then( data => {
    Observer.emit('error', {
      status: response.status,
      text: data.err,
      backButton: true,
    })
  });
};
Observer.on('render:response-error', responseErrorRenderCallback);
