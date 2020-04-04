const express = require('express');
const mainRouter = express.Router();
const multer  = require('multer');

const imgPath = '/sites/social-hub/uploads/img/';
const localImagePath = __dirname + '/uploads/img';

mainRouter.use((request, response, next) => {
  response.set('Content-Type', 'application/json');
  console.log(`[DEBUG] ${request.method}: Request URL is http://localhost:5000${request.path}`);
  next();
});

const imgStorageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, localImagePath);
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now() + '-' + file.originalname);
  }
});


mainRouter.post('/upload', multer({storage:imgStorageConfig}).single('fileData'),function (HttpRequest, HttpResponse) {
  if(!HttpRequest.file) {
    HttpResponse.status(502)
      .json({
        message: 'Ошибка при загрузке файла'
      });
  }
  else {
    HttpResponse.status(200)
      .json({
        message: 'Файл загружен',
        filename: HttpRequest.file.filename,
      });
  }
});

mainRouter.post('/', function (HttpRequest, HttpResponse) {
  HttpResponse.json({answer: 'test'});
});

module.exports = mainRouter;
