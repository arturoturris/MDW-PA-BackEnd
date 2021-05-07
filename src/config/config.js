const ENV = process.argv[2]
const HOST = ENV == 'production' ?
    'http://3.142.69.247' :
    'http://localhost'
const API_PORT = process.env.port || 3300
const API_HOST = `${HOST}:${API_PORT}`
const API_VERSION = '/api/v1'
const API_URL = `${API_HOST}${API_VERSION}`

module.exports = {
    ENV,
    API_VERSION,
    API_URL,
    API_PORT
}

