'use strict'

const service = require('../services/vehicles')

module.exports = (function(router) {

    router.get('/vehicles', async (ctx) => {
        try {
            let svc = service(ctx.state.db)
            let data = await svc.getAll()
            ctx.body = data
        } catch (err) {
            ctx.throw(500, err.message)
        }
    })

    router.get('/vehicles/:id', async (ctx) => {
        try {
            let svc = service(ctx.state.db)
            let data = await svc.find(ctx.params.id)
            ctx.body = data
        } catch (err) {
            ctx.throw(500, err.message)
        }
    })
    
    router.post('/vehicles', async (ctx) => {
        try {
            let svc = service(ctx.state.db)
            let data = await svc.save(ctx.request.body)
            ctx.body = data
        } catch (err) {
            ctx.throw(500, err.message)
        }
    })

    router.del('/vehicles/:id', async (ctx) => {
        try {
            let svc = service(ctx.state.db)
            let data = await svc.remove(ctx.params.id)
            ctx.body = data
        } catch (err) {
            ctx.throw(500, err.message)
        }
    })

})
