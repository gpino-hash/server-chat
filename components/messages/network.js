const express = require('express')
const multer = require('multer')
const response = require('../../network/response')
const router = express.Router()
const config = require('../../config')

const controller = require('./controller')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public${config.filesRoute}/`);
    },
  
    filename: function (req, file, cb) {
      const ext = file.originalname.split(".").pop();
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
  });
  
  const upload = multer({ storage });

router.get('/', (req, res) => {
    const filterMessage = req.query.chat || null;
    controller.getMessages(filterMessage)
      .then((messageList) => response.success(req, res, messageList))
      .catch(error => response.error(req, res, 'Unexpected Error', 500, error));
})

router.get('/:id', (req, res) => {
    controller.getMessage(req.params.id)
      .then((messageList) => response.success(req, res, messageList))
      .catch(error => response.error(req, res, 'Unexpected Error', 500, error));
})

router.post('/', upload.single('file'), (req, res) => {

    controller.addMessage(req.body.user, req.body.chat, req.body.message, req.file)
        .then((fullMessage) => response.success(req, res, fullMessage, 201))
        .catch((e) => response.error(req, res, 'Informacion invalida', 400, 'Error en el message.controller'))
    
})

router.patch('/:id', (req, res) => {

    controller.updateMessage(req.params.id, {message: req.body.message})
        .then((fullMessage) => response.success(req, res, fullMessage, 200))
        .catch((e) => response.error(req, res, 'Error interno', 500, e))
})

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => response.success(req, res, `Message ${req.params.id} ha sido eliminado.`, 200))
        .catch((e) => response.error(req, res, 'Error interno', 500, e))
})

module.exports = router;