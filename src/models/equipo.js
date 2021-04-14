const {sequelize} = require('../config/sequelize.js')
const {DataTypes} = require('sequelize')

const Equipo = sequelize.define('Equipo',{
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'El id del proyecto debe ser proporcionado.'
            },
            async isValid(value) {
                let proyecto = await sequelize.models.Proyecto.findOne({where: {id_proyecto: value}})
                if(!proyecto)
                    throw new Error('No existe un proyecto con el id proporcionado.')
            }
        }
    },
    matricula: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'La matricula del alumno debe ser proporcionada.'
            },
            async isValid(value) {
                let alumno = await sequelize.models.Alumno.findOne({where: {matricula: value}})
                if(!alumno)
                    throw new Error('No un alumno con la matricula proporcionada.')
            }
        }
    }
},{
    timestamps: false,
    tableName: 'equipo'
})

module.exports = Equipo