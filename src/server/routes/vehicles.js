'use strict'

const service = require('../services/vehicles')

module.exports = (function(router) {

    router.get('/vehicles', async (ctx) => {
        await service(ctx.state.db)
            .getAll()
            .toPromise()
            .then(data => { ctx.body = data })
            .catch(err => ctx.throw(500, err.message))
    })

    router.get('/vehicles/:id', async (ctx) => {
        await service(ctx.state.db)
            .find(ctx.params.id)
            .toPromise()
            .then(data => { ctx.body = data })
            .catch(err => ctx.throw(500, err.message))
    })
    
    router.post('/vehicles', async (ctx) => {
        const data = ctx.request.body
        await service(ctx.state.db)
            .save(data)
            .toPromise()
            .then(key => { 
                ctx.body = (key == data.id) ? { message: 'Vehicle updated' } : { message:'Vehicle created', key }
            })
            .catch(err => ctx.throw(500, err.message))
    })

    router.del('/vehicles/:id', async (ctx) => {
        await service(ctx.state.db)
            .remove(ctx.params.id)
            .toPromise()
            .then(() => { 
                ctx.body = { message: 'Vehicle removed' }
            })
            .catch(err => ctx.throw(500, err.message))
    })

})
