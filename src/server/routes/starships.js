'use strict'

const service = require('../services/starships')

module.exports = (function(router) {

    router.get('/starships', async (ctx) => {
        await service(ctx.state.db)
            .findAll()
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
        let data = ctx.request.body

        await service(ctx.state.db)
            .save(data)
            .toPromise()
            .then(data => { 
                ctx.body = (data.key == data.id) ? { message: 'Starship updated' } : { message:'Starship created', key: data.key }
            })
            .catch(err => ctx.throw(500, err.message))
    })

    router.del('/starships/:id', async (ctx) => {
        await service(ctx.state.db)
            .remove(ctx.params.id)
            .toPromise()
            .then(() => { ctx.body = {message:'Starship removed'} })
            .catch(err => ctx.throw(500, err.message))
    })

})
