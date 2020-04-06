import Observer from '../../controller/observer';

const responseErrorRenderCallback = response => {
  response.json().then( data => {
    Observer.emit('error', {
      status: response.status,
      text: data.err,
      backButton: true,
    })
  });
};
Observer.on('render:response-error', responseErrorRenderCallback);
