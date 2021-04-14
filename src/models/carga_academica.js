const {sequelize} = require('../config/sequelize.js')
const {DataTypes} =require('sequelize')

const CargaAcademica = sequelize.define('CargaAcademica',{
},{
    timestamps: false,
    tableName: 'carga_academica'
})

CargaAcademica.associate = function(models){
    models.CargaAcademica.belongsTo(models.Periodo,{
        foreignKey: 'id_periodo',
        allowNull: false
    },{
        onDelete: 'CASCADE'
    })
}

module.exports = CargaAcademica