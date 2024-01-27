const { Server } = require('socket.io')
const { createServer } = require('http')
const handleEventSocket = require('./handleEventSocket')
function socket(app) {
    const httpServer = createServer(app)
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:3000'
        }
    })
    handleEventSocket(io)
    return httpServer
}
module.exports = socket