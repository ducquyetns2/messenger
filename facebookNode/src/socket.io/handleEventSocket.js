const socketAssist = require('./socketAssist')

function handleEventSocket(io) {
    let onlineUsers = []
    io.on('connection', socket => {
        socket.on('addUser', userId => {
            socketAssist.addUser(onlineUsers, userId, socket.id)
            io.emit('getUsers', onlineUsers)
        })
        socket.on('sendMessage', messages => {
            socket.broadcast.emit('recievedMessage', messages)
        })
        socket.on('removeUser', user => {
            onlineUsers = onlineUsers.filter(online => online.userId !== user._id)
            console.log('console', socket.id)
            io.emit('getUsers', onlineUsers)
        })
        socket.on('disconnect', () => {
            onlineUsers = socketAssist.deleteUser(onlineUsers, socket.id)
            io.emit('getUsers', onlineUsers)
        })
    })
}
module.exports = handleEventSocket