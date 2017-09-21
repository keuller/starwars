'use strict'

const util = require('./util')
    , { Observable } = require('rxjs')

module.exports = (function(db) {

    return {
        getAll() {
            return Observable.create(observer => {
                db.all('SELECT id, name, model, class, created FROM vehicles ORDER BY id', [], (err, rows) => {
                    if (err) return observer.error(err)
                    observer.next(rows)
                    observer.complete()
                })
            })
        },

        find(id) {
            return Observable.create(observer => {
                db.get('SELECT * FROM vehicles WHERE id = ?', [id], (err, row) => {
                    if (err) return observer.error(err)
                    observer.next(row)
                    observer.complete()
                })
            })
        },

        save(data) {
            let now = (new Date().toISOString())
            let isNew = (data.id == 0)
            let key = (isNew ? util.genId() : data.id)

            if (isNew) {
                return Observable.create(observer => {
                    db.run('INSERT INTO vehicles VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                        key, data.name, data.model, data.manufacturer,
                        data.credits, data.length, data.crew, data.speed, data.passengers,
                        data.capacity, data.consumables, data.class, now
                    ], (err, ret) => {
                        if (err) return observer.error(err)
                        observer.next({ status: 'Created' })
                        observer.complete()
                    })
                })
            }

            return this.update(data)
        },

        update(data) {
            return Observable.create(observer => {
                db.run('UPDATE vehicles SET name=?, model=?, manufacturer=?, class=?, credits=?, length=?, crew=?, speed=?, passengers=?, capacity=?, consumables=? WHERE id=?', [
                    data.name, data.model, data.manufacturer, data.class,
                    data.credits, data.length, data.crew, data.speed, data.passengers,
                    data.capacity, data.consumables, key
                ], (err, ret) => {
                    if (err) return observer.error(err)
                    observer.next({ status: 'Updated' })
                    observer.complete()
                })
            })
        },

        remove(id) {
            return Observable.create(observer => {
                db.run('DELETE FROM vehicles WHERE id=?', [id], (err) => {
                    if (err) return observer.error(err)
                    observer.next({ status: `Vehicle ${id} removed` })
                    observer.complete()
                })
            })
        }

    }
})