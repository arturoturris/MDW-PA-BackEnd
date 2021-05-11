const {sequelize} = require('../config/sequelize.js')
const {DataTypes} =require('sequelize')

const Cierre = sequelize.define('Cierre',{
    id_cierre: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement:true,
        validate: {
            notNull:{
                msg: 'El id del cierre debe ser proporcionado.'
            }
        }
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull:{
                args: true,
                msg: 'El nombre debe ser proporcionado.'
            },
            is: {
                args: /[a-záéíóú ]+/i,
                msg: 'El nombre solo puede contener carácteres alfabeticos.'
            },
            len:{
                args: [5-50],
                msg: 'El nombre es demasiado corto o largo.'
            }
        }
    },
    descripcion:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull:{
                args: true,
                msg: 'La descripción debe ser proporcionado.'
            },
            is: {
                args: /[a-záéíóú ]+/i,
                msg: 'La descripcion  solo puede contener carácteres alfabeticos.'
            },
            len:{
                args: [5-50],
                msg: 'La descripción es demasiado corto o largo.'
            }
        }
    },
    url_rubrica: {
        type: DataTypes.STRING(355),
        allowNull: true,
    },
    url_entregable: {
        type: DataTypes.STRING(355),
        allowNull: true,
    },
    calificacion: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            isFloat: {
                msg: 'La calificación no tiene un formato válido.'
            }
        }
    },
    observaciones: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    fecha_asignacion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull:{
                args: true,
                msg: 'La fecha de asignación debe ser proporcionada.'
            },
            isDate:{
                msg: 'La fecha de asignación no tiene un formato válido.'
            }
        }
    },
    fecha_limite: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull:{
                args: true,
                msg: 'La fecha límite debe ser proporcionada.'
            },
            isDate:{
                msg: 'La fecha límite no tiene un formato válido.'
            }
        }
    },
    fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate:{
                msg: 'La fecha de entrega no tiene un formato válido.'
            }
        }
    },
    entregado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notNull: {
                msg: 'Tiene que indicar si la tarea ha sido entregada.'
            }
        }
    },
    devuelto: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notNull: {
                msg: 'Tiene que indicar si la tarea ha sido devuelta.'
            }
        }
    }
},{
    tableName: 'cierre',
    timestamps: false,
    hooks:{
        beforeSave: (cierre,options) => {
            cierre.set('nombre',cierre.get('nombre').toUpperCase())
            cierre.set('descripcion',cierre.get('descripcion').toUpperCase())
            if(cierre.get('observaciones'))
                cierre.set('observaciones',cierre.get('observaciones').toUpperCase())
        }
    }
})

Cierre.associate = function(models){
    models.Cierre.belongsTo(models.Proyecto,{
        foreignKey: {
            name: 'id_proyecto',
            allowNull: false
        },
        onDelete: 'CASCADE'
    })
}

module.exports = Cierre