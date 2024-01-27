const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('authentication', 'sa', 'Anhquy28', {
    host: 'localhost',
    dialect: 'mssql'
});
module.exports = sequelize