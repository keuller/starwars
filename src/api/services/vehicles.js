'use strict'

const util = require('./util')

module.exports = (function(db) {

    return {
        
        getAll() {
            return new Promise((resolve, reject) => {
                db.all('SELECT id, name, model, class, created FROM vehicles ORDER BY id', [], (err, rows) => {
                    if (err) return reject(err)
                    resolve(rows)
                })
            })
        },

        find(id) {
            return new Promise((resolve, reject) => {
                db.get('SELECT * FROM vehicles WHERE id = ?', [id], (err, row) => {
                    if (err) return reject(err)
                    resolve(row)
                })
            })
        },

        save(data) {
            let now = (new Date().toISOString())
            let isNew = (data.id == 0)
            let key = (isNew ? util.genId() : data.id)

            return new Promise((resolve, reject) => {
                if (isNew) {
                    db.run('INSERT INTO vehicles VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                        key, data.name, data.model, data.manufacturer,
                        data.credits, data.length, data.crew, data.speed, data.passengers,
                        data.capacity, data.consumables, data.class, now
                    ], (err, ret) => {
                        if (err) return reject(err)
                        resolve({ status: 'Created' })
                    })
                    return
                }

                db.run('UPDATE vehicles SET name=?, model=?, manufacturer=?, class=?, credits=?, length=?, crew=?, speed=?, passengers=?, capacity=?, consumables=? WHERE id=?', [
                    data.name, data.model, data.manufacturer, data.class,
                    data.credits, data.length, data.crew, data.speed, data.passengers,
                    data.capacity, data.consumables, key
                ], (err, ret) => {
                    if (err) return reject(err)
                    resolve({ status: 'Updated' })
                })
            })
        },

        remove(id) {
            return new Promise((resolve, reject) => {
                db.run('DELETE FROM vehicles WHERE id=?', [id], (err) => {
                    if (err) return reject(err)
                    resolve({ status: 'Removed' })
                })
            })
        }

    }
})
