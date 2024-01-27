const express = require("express")
const config = require("./config")
const webRoute = require('./routes')
const socket = require('./socket.io/socket')
const connectMongo = require('./model/mongoDb/connectMongo')
const app = express()
const httpServer = socket(app)
const PORT = 8080
config(app)
connectMongo()
webRoute(app)
httpServer.listen(PORT, () => {
    console.log(`listening at PORT:${PORT}`)
})