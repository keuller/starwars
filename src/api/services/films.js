'use strict'

module.exports = (function(db) {

    return {
        
        getAll() {
            return new Promise((resolve, reject) => {
                db.all('SELECT id, title, director, producer, release, created FROM films ORDER BY id', [], (err, rows) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve(rows)
                })
            })
        }

    }
})
