const message = require('../components/messages/network')
const user = require('../components/user/network')
const chat = require('../components/chat/network')

const routes = (server) => {
    server.use('/messages', message)
    server.use('/users', user)
    server.use('/chats', chat)
}

module.exports = routes