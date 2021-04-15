const API_PORT = process.env.port || 3300
const API_HOST = `http://localhost:${API_PORT}`
const API_VERSION = '/api/v1'
const API_URL = `${API_HOST}${API_VERSION}`

module.exports = {
    API_VERSION,
    API_URL,
    API_PORT
}

