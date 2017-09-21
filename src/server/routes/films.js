'use strict'

const service = require('../services/films')

module.exports = (function(router) {

    router.get('/films', async (ctx) => {
        try {
            let svc = service(ctx.state.db)
            let data = await svc.getAll()
            ctx.body = data
        } catch (err) {
            ctx.throw(500, err.message)
        }
    })
    
})
