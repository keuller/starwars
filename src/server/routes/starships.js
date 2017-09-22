'use strict'

const service = require('../services/starships')

module.exports = (function(router) {

    router.get('/starships', async (ctx) => {
        await service(ctx.state.db)
            .getAll()
            .toPromise()
            .then(data => { ctx.body = data })
            .catch(err => ctx.throw(500, err.message))
    })

    router.get('/starships/:id', async (ctx) => {
        await service(ctx.state.db)
            .find(ctx.params.id)
            .toPromise()
            .then(data => { ctx.body = data })
            .catch(err => ctx.throw(500, err.message))
    })
    
    router.post('/starships', async (ctx) => {
        await service(ctx.state.db)
            .save(ctx.request.body)
            .toPromise()
            .then(data => { ctx.body = data })
            .catch(err => ctx.throw(500, err.message))
    })

    router.del('/starships/:id', async (ctx) => {
        await service(ctx.state.db)
            .remove(ctx.params.id)
            .toPromise()
            .then(data => { ctx.body = data })
            .catch(err => ctx.throw(500, err.message))
    })

})
