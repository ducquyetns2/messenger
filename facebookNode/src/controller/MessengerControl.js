const Message = require('../model/mongoDb/Message')
const Conversation = require('../model/mongoDb/Conversation')

class MessengerControl {
    getConversationById(req, res) {
        Conversation.findById(req.params.conversationId)
            .then(result => {
                res.json({
                    error: false,
                    data: result
                })
            })
            .catch(error => {
                res.json({
                    error: true,
                    message: 'Error server'
                })
            })
    }
    getConversation(req, res) {
        Conversation.findOne({
            members: { $all: req.query.members }
        }).then(result => {
            res.json({
                error: false,
                data: result
            })
        }).catch(error => {
            res.json({
                error: true,
                message: 'Error server'
            })
        })
    }
    getAllConversations(req, res) {
        Conversation.find({
            members: { $in: [req.params.userId] }
        })
            .then(result => {
                res.json({
                    error: false,
                    data: result
                })
            })
            .catch(error => {
                res.json({
                    error: true,
                    message: 'Error server'
                })
            })
    }
    createConversation(req, res) {
        Conversation.create({
            members: req.body.members
        })
            .then(result => {
                res.json({
                    error: false,
                    data: result
                })
            })
            .catch(error => {
                res.json({
                    error: true,
                    message: 'Error server'
                })
            })
    }
    getMessages(req, res) {
        const conversationId = req.params.conversationId
        Message.find({
            conversationId
        })
            .then(result => {
                res.json({
                    error: false,
                    data: result
                })
            })
            .catch(error => {
                res.json({
                    error: true,
                    message: 'Error server'
                })
            })
    }
    createMessage(req, res) {
        Message.create(req.body)
            .then(result => {
                res.json({
                    error: false,
                    data: result
                })
            })
            .catch(error => {
                res.json({
                    error: true,
                    message: 'Error server'
                })
            })
    }
}
module.exports = new MessengerControl()