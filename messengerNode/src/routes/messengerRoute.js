const express = require('express')
const Router = express.Router()
const MessengerControl = require('../controller/MessengerControl')

Router.get('/getConversation/:conversationId', MessengerControl.getConversationById)
Router.get('/getAllConversations/:userId', MessengerControl.getAllConversations)
Router.get('/getMessages/:conversationId', MessengerControl.getMessages)
Router.post('/createMessage', MessengerControl.createMessage)
Router.post('/createConversation', MessengerControl.createConversation)
Router.get('/getConversation', MessengerControl.getConversation)
module.exports = Router