const userRoute = require('./userRoute')
const messengerRoute = require('./messengerRoute')
const TokenController = require('../middleware/TokenController')

function webRoute(app) {
    app.use('/api', userRoute)
    app.use('/api', TokenController.verifyToken, messengerRoute)
}
module.exports = webRoute
