'use strict'

const Router = require('koa-router')
    , films = require('./films')
    , vehicles = require('./vehicles')
    , starships = require('./starships')

const router = new Router()

films(router)
vehicles(router)
starships(router)

router.get('/health', (ctx) => {
    let dbOk = (ctx.state.db && ctx.state.db.open) ? true : false
    ctx.body = { status: 'OK', database: (dbOk ? 'OK' : 'Fail') }
})

module.exports = router
