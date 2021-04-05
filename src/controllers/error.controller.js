function handleError(res,res,err){
    
    const errorName = err.name || ''
    let errorObject

    switch(errorName){
        case 'SequelizeConnectionRefusedError':{
            errorObject = {error: 'No hay conexión con la base de datos.'}
            break
        }
        case 'ReferenceError':{
            console.log(err)
            errorObject = {error: 'Error interno. Revisa la consola.'}
            break
        }
        default:{
            errorObject = err
            break
        }
    }

    res.status(500).json(errorObject)
}

module.exports = {
    handleError
}