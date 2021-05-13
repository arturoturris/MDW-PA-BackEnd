const {sequelize} = require('../config/sequelize.js')
const {DataTypes} = require('sequelize')

const Tarea = sequelize.define('Tarea',{
    id_tarea: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_tarea: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'El nombre debe ser proporcionado.'
            },
            len:{
                args: [5,45],
                msg: 'Pocos o demasiados carácteres.'
            }
        }
    },
    fecha_inicio:{
        type: DataTypes.DATEONLY,
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
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: {
                args: true,
                msg: 'La fecha límite no contiene un formato válido.'
            }
        }
    },
    fecha_fin:{
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: {
                args: true,
                msg: 'La fecha fin no contiene un formato válido.'
            }
        }
    },
    descripcion:{
        type: DataTypes.STRING(200),
        allowNull: true,
        validate: {
            len: {
                args: [0,200],
                msg: 'Pocos o demasiados caracteres.'
            }
        }
    },

},{
    tableName: 'tarea',
    timestamps: false,
    hooks: {
        beforeSave:(tarea,options) => {
            tarea.set('nombre_tarea',tarea.get('nombre_tarea').toUpperCase())
            tarea.set('descripcion',tarea.get('descripcion').toUpperCase())
        }
    }
})

Tarea.associate = function(models){
    
    models.Tarea.belongsToMany(models.Alumno,{
        through: models.Equipo,
        foreignKey: 'id_tarea'
    })
}

module.exports = Tarea