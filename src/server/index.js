'use strict'

const http = require('http')
    , app = require('./app')
    , PORT = process.env.APP_PORT || "5000"
    , HOST = process.env.APP_HOST || "0.0.0.0"

const server = http.createServer(app.callback()).listen(PORT, HOST, () => {
    console.log('Application is up and running at http://%s:%s', HOST, PORT)
})
