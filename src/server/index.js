'use strict'

const os = require('os')
    , path = require('path')
    , http = require('http')
    , koa = require('koa')
    , sqlite3 = require('sqlite3')
    , bodyParser = require('koa-bodyparser')
    , serve = require('koa-static')
    , router = require('./routes')

const PORT = process.env.APP_PORT || "5000"
    , HOST = process.env.APP_HOST || "0.0.0.0"

const app = new koa()
    , setup = require('./setup')

const db = new sqlite3.Database('starwars.db')

app.use(bodyParser())
app.use(serve(path.join('public')), { defer: true })

// handle general errors
app.on('error', (err) => console.error('[ERROR]', err))

// add database reference into app's context
app.use(async (ctx, next) => {
    ctx.state.db = db
    await next()
})

// set up database, if it necessary
setup(db)

// register all routers
app.use(router.routes())

const server = http.createServer(app.callback()).listen(PORT, HOST, () => {
    console.log('Application is up and running at http://%s:%s', HOST, PORT)
})
