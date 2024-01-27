const { DataTypes } = require('sequelize')
const sequelize = require('./configConnect')
const { USER } = require('../../constant')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    useName: DataTypes.STRING,
    password: DataTypes.STRING,
    avatarPath: DataTypes.STRING,
    filePath: DataTypes.STRING,
    position: {
        type: DataTypes.STRING,
        defaultValue: USER
    }
}, {
    timestamps: false
})
module.exports = User