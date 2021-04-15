const {sequelize} = require('../config/sequelize.js')
const {DataTypes} = require('sequelize')

const Proyecto = sequelize.define('Proyecto',{
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_proyecto: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'El nombre debe ser proporcionado.'
            },
            len:{
                args: [5-45],
                msg: 'Pocos o demasiados caracteres.'
            }
        }
    },
    fecha_inicio:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:  DataTypes.DATE.NOW,
        validate: {
            notNull: {
                args: true,
                msg: 'La fecha de inicio debe ser proporcionada.'
            },
            isDate: {
                args: true,
                msg: 'La fecha de inicio no contiene un formato válido.'
            }
        }
    },
    fecha_limite:{
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: {
                args: true,
                msg: 'La fecha límite no contiene un formato válido.'
            }
        }
    },
    fecha_fin:{
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: {
                args: true,
                msg: 'La fecha fin no contiene un formato válido.'
            }
        }
    },
    // evaluador: {
    //     type: DataTypes.INTEGER,
    //     references: sequelize
    // },
    descripcion:{
        type: DataTypes.STRING(200),
        allowNull: true,
        validate: {
            len: {
                args: [0,200],
                msg: 'Pocos o demasiados caracteres.'
            }
        }
    }
},{
    tableName: 'proyecto',
    timestamps: false,
    // beforeSave: (proyecto,options) => {

    // }
})

Proyecto.associate = function(models){
    models.Proyecto.belongsTo(models.Materia,{
        foreignKey:{
            name: 'nrc',
            allowNull: false
        },
        onDelete: 'CASCADE'
    })

    Proyecto.associate = function(models){
        models.Proyecto.belongsTo(models.Materia,{
            foreignKey:{
                name: 'nrc',
                allowNull: false
            },
            onDelete: 'CASCADE'
        })
    }
}

module.exports = Proyecto