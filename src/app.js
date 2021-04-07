const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const {API_PORT,API_VERSION} = require('./config/config')

//CONFIG
app.set('port',API_PORT)

//MIDDLEWARES
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//ROUTES
app.use(`${API_VERSION}`,require('./routes/index'))

//LOADING MODELS
require('./models/index')

//SERVER
app.listen(app.get('port'),(req,res) => {
    console.log(`API ON PORT ${app.get('port')}`)
})