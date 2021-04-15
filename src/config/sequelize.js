const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('registro_escolar','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    sequelize
}