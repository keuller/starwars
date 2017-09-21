'use strict'

module.exports = (function(db) {

    return {
        
        getAll() {
            return new Promise((resolve, reject) => {
                db.all('SELECT id, name, model, class, created FROM starships ORDER BY id', [], (err, rows) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve(rows)
                })
            })
        }

    }
})
