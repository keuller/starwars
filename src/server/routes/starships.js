'use strict'

const service = require('../services/starships')

module.exports = (function(router) {

    router.get('/starships', async (ctx) => {
        try {
            let svc = service(ctx.state.db)
            let data = await svc.getAll()
            ctx.body = data
        } catch (err) {
            ctx.throw(500, err.message)
        }
    })
    
})
