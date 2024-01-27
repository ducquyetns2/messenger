const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const User = new Schema({
    id: ObjectId,
    useName: String,
    password: String,
    avatarPath: String,
    filePath: String
}, {
    timestamps: true
})
module.exports = mongoose.model('user', User)