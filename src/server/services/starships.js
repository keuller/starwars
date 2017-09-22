'use strict'

const util = require('./util')
    , { Observable } = require('rxjs')

module.exports = (function(db) {

    return {
        
        findAll() {
            const get = Observable.bindNodeCallback(db.all)
            return get.call(db, 'SELECT id, name, model, class, created FROM starships ORDER BY id')
        },

        find(id) {
            const get = Observable.bindNodeCallback(db.all)
            return get.call(db, 'SELECT * FROM starships WHERE id=?', [id])
        },

        save(data) {
            const run = Observable.bindNodeCallback(db.run)

            let now = (new Date().toISOString())
            let isNewVehicle = (data.id == 0)
            let key = (isNewVehicle ? util.genId() : data.id)
            let params = []

            if (isNewVehicle) {
                params = [key, data.name, data.model, data.manufacturer, data.credits, 
                    data.length, data.crew, data.speed, data.passengers,
                    data.capacity, data.consumables, data.class, now]
                return run.call(db, 'INSERT INTO starships VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params).mapTo({ key })
            }

            params = [data.name, data.model, data.manufacturer, data.class, data.credits, 
                data.length, data.crew, data.speed, data.passengers, data.capacity, data.consumables, data.id]
            return run.call(db, 'UPDATE starships SET name=?, model=?, manufacturer=?, class=?, credits=?, length=?, crew=?, speed=?, passengers=?, capacity=?, consumables=? WHERE id=?', params).mapTo({ key })
        },

        remove(id) {
            const run = Observable.bindNodeCallback(db.run)
            return run.call(db, 'DELETE FROM starships WHERE id=?', [id])
        }
    }
})
