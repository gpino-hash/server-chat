const express = require('express')
const app = express()
const server = require('http').Server(app)
const config = require('./config')

const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('./socket')

const router = require('./network/routes')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

socket.connect(server)

router(app)

app.use(config.publicRoute, express.static('public'))

server.listen(config.port, () => {
    console.log(`The app listening on ${config.host}:${config.port}`)
})