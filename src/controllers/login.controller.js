const {sequelize} = require('../config/sequelize')
const {handleError}=require('./error.controller')
const jwt = require('jsonwebtoken')
const JWTACCESSSECRET = '12345'

function getAccessToken(user){
    return jwt.sign(user,JWTACCESSSECRET,{expiresIn: 60 * 60 * 24})
}

async function findUser(email){
    try{
        return await sequelize.models.Usuario.findOne({
            attributes: [
                'id_usuario',
                'email',
                'contrasena',
                'rol',
                [sequelize.col('Persona.nombre'),'nombre'],
                [sequelize.col('Persona.paterno'),'paterno'],
                [sequelize.col('Persona.materno'),'materno']
            ],
            include: [
                {
                    model: sequelize.models.Persona,
                    attributes: []
                }
            ],
            where:{email}
        })
    }catch(err){
        return null
    }
}

async function authenticateUser(req,res){
    let usuario = await findUser(req.body.email)

    if(!usuario) return res.sendStatus(401)
    
    const authenticated = await sequelize.models.Usuario.prototype.comparePassword(req.body.contrasena,usuario.contrasena)

    if (!authenticated) return res.sendStatus(401)

    usuario = {
        id_usuario: usuario.id_usuario,
        nombre: `${usuario.get('nombre')} ${usuario.get('paterno')} ${usuario.get('materno')}`,
        rol: usuario.rol
    }

    res.json({token: getAccessToken(usuario)})  
}

function authorizeUser(req,res){
    const header = req.headers['authorization']
    const accessToken = header && header.split(' ')[1]

    if(!accessToken) return res.sendStatus(401)

    jwt.verify(accessToken,JWTACCESSSECRET,(err,user) => {
        if(err) return res.status(403).json(err.message)

        res.json(user)
    })
}

module.exports = {
    authenticateUser,
    authorizeUser
}