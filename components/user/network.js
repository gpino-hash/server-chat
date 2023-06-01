const express = require('express')
const response = require('../../network/response')
const router = express.Router()

const controller = require('./controller')

router.get('/', (req, res) => {
    const filterUser = req.query.user || null;
    controller.getUsers(filterUser)
      .then((users) => response.success(req, res, users))
      .catch(error => response.error(req, res, 'Unexpected Error', 500, error));
})

router.get('/:id', (req, res) => {
    controller.getUser(req.params.id)
      .then((user) => response.success(req, res, user))
      .catch(error => response.error(req, res, 'Unexpected Error', 500, error));
})

router.post('/', (req, res) => {

    controller.addUser(req.body.user)
        .then((resp) => response.success(req, res, resp, 201))
        .catch((e) => response.error(req, res, 'Informacion invalida', 400, 'Error en el user.controller'))
    
})

router.patch('/:id', (req, res) => {

    controller.updateUser(req.params.id, {user: req.body.user})
        .then((resp) => response.success(req, res, resp, 200))
        .catch((e) => response.error(req, res, 'Error interno', 500, e))
})

module.exports = router;