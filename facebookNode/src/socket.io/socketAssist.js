class socketAssist {
    addUser(users, userId, socketId) {
        users.some(user => user.userId === userId)
            || users.push({ userId, socketId })
    }
    deleteUser(users, socketId) {
        users = users.filter(user => user.socketId !== socketId)
        return users
    }
}
module.exports = new socketAssist()