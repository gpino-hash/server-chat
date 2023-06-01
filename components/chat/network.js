const express = require('express')
const response = require('../../network/response')
const router = express.Router()

const controller = require('./controller')

router.get('/:userId', (req, res) => {
    controller.getChats(req.params.userId)
      .then((chats) => response.success(req, res, chats))
      .catch(error => response.error(req, res, 'Unexpected Error', 500, error));
})

router.post('/', (req, res) => {

    controller.addChat(req.body.users)
        .then((resp) => response.success(req, res, resp, 201))
        .catch((e) => response.error(req, res, 'Informacion invalida', 400, 'Error en el message.controller'))
    
})

router.patch('/:id', (req, res) => {

    controller.updateChat(req.params.id, {chat: req.body.chat})
        .then((resp) => response.success(req, res, resp, 200))
        .catch((e) => response.error(req, res, 'Error interno', 500, e))
})

router.delete('/:id', (req, res) => {
    controller.deleteChat(req.params.id)
        .then(() => response.success(req, res, `Chat ${req.params.id} ha sido eliminado.`, 200))
        .catch((e) => response.error(req, res, 'Error interno', 500, e))
})

module.exports = router;