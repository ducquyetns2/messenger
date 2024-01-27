const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { originUrl, secretKey } = require('./constant')
function config(app) {
    app.use(cookieParser(secretKey))
    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))
    app.use(express.static('src/public'))
    let corsOptions = {
        origin: originUrl,
        credentials: true,
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions))
}
module.exports = config