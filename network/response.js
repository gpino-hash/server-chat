const statusMessage = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not found',
    '500': 'Internal server error'
}

exports.success = (req, res, message, status = 200) => {
    let statusCode = status
    let statusMessage = message

    if (!statusCode) {
        statusCode = 200
    }

    if (!message) {
        statusMessage = statusMessage[statusCode]
    }
    
    res.status(statusCode).send(statusMessage)
}

exports.error = (req, res, message, status = 500, logMessage) => {
    console.error(logMessage)
    res.status(status).send(message)
}