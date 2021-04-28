const {sequelize} = require('../config/sequelize.js')
const {DataTypes} =require('sequelize')

const Entregable = sequelize.define('Entregable',{
    id_entregable: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement:true,
        validate: {
            notNull:{
                msg: 'El id del entregable debe ser proporcionado.'
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
    url: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    fecha_asignacion: {
        type: DataTypes.DATE(),
        allowNull: false,
        validate: {
            notNull:{
                args: true,
                msg: 'La fecha debe ser proporcionada.'
            }
        }
    }
},{
    tableName: 'entregable',
    timestamps: false,
    beforeSave: (entregable,options) => {
        entregable.set('nombre',entregable.get('nombre').toUpperCase())
    }
})

Entregable.associate = function(models){
    // models.Entregable.belongsTo(models.Proyecto,{
    //     foreignKey: {
    //         name: 'id_proyecto',
    //         allowNull: false
    //     },
    //     onDelete: 'CASCADE'
    // })

    models.Entregable.belongsTo(models.Etapa,{
        foreignKey:{
            name: 'id_etapa'
        }
    })
}

module.exports = Entregable