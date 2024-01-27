const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Conversation = new Schema({
    id: ObjectId,
    members: Array
}, {
    timestamps: false
})
module.exports = mongoose.model('conversation', Conversation)