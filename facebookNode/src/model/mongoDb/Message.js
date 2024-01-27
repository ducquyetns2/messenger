const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Message = new Schema({
    id: ObjectId,
    sender: String,
    conversationId: String,
    text: String
}, {
    timestamps: true
})
module.exports = mongoose.model('message', Message)