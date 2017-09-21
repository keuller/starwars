'use strict'

const { Observable } = require('rxjs')

function extractId(record) {
    let url = record.url.substr(0, record.url.length - 1)
    return url.substr(url.lastIndexOf('/') + 1)
}

module.exports = (function(db) {
    let key = null

    return {
        createTables() {
            db.serialize(() => {
                db.run(`
                    CREATE TABLE IF NOT EXISTS vehicles (
                    id INT NOT NULL PRIMARY KEY, name VARCHAR(50), model VARCHAR(35), 
                    manufacturer VARCHAR(50), credits INT, length DECIMAL(10,2), crew INT,
                    speed INT, passengers INT, capacity INT, consumables VARCHAR(30),
                    class VARCHAR(30), created VARCHAR(30))
                `)
        
                db.run(`
                    CREATE TABLE IF NOT EXISTS starships (
                    id INT NOT NULL PRIMARY KEY, name VARCHAR(50), model VARCHAR(35), 
                    manufacturer VARCHAR(50), credits INT, length NUMERIC(10,2), crew INT,
                    speed INT, passengers INT, capacity INT, CONSUMABLES VARCHAR(30),
                    class VARCHAR(30), created VARCHAR(30))
                `)
        
                db.run(`
                    CREATE TABLE IF NOT EXISTS films (
                    id INT NOT NULL PRIMARY KEY, title VARCHAR(50), episode INT, 
                    description TEXT, director VARCHAR(35), producer VARCHAR(35), 
                    release VARCHAR(10), created VARCHAR(30))
                `)

                db.run(`
                    CREATE TABLE IF NOT EXISTS vehicles_films (VEHICLE_ID INT NOT NULL, FILM_ID INT NOT NULL)
                `)

                db.run(`
                    CREATE TABLE IF NOT EXISTS starships_films (STARSHIP_ID INT NOT NULL, FILM_ID INT NOT NULL)
                `)
            })
        },

        isEmpty(tableName) {
            return Observable.create(observer => {
                db.serialize(() => {
                    db.get(`SELECT COUNT(*) as total FROM ${tableName};`, [], (err, row) => {
                        if (err) {
                            observer.error(err)
                            return
                        }
                        observer.next(row.total == 0)
                        observer.complete()
                    })
                })
            })
        },

        fillVehicles(vehicles) {
            db.serialize(() => {
                let stmt = db.prepare("INSERT INTO vehicles VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
                vehicles.forEach(item => {
                    key = extractId(item)
                    stmt.run(key, item.name, item.model, item.manufacturer, 
                        item.cost_in_credits, item.length, item.crew, 
                        item.max_atmosphering_speed, item.passengers,
                        item.cargo_capacity, item.consumables, item.vehicle_class, item.created)
                })
                stmt.finalize()
            })
        },

        fillStarships(starships) {
            db.serialize(() => {
                let stmt = db.prepare("INSERT INTO starships VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
                starships.forEach(record => {
                    key = extractId(record)
                        stmt.run(key, record.name, record.model, record.manufacturer, 
                        record.cost_in_credits, record.length, record.crew, 
                        record.max_atmosphering_speed, record.passengers,
                        record.cargo_capacity, record.consumables, record.vehicle_class, record.created)
                })
                stmt.finalize()
            })
        },

        fillFilms(list) {
            db.serialize(() => {
                let stmt = db.prepare("INSERT INTO films VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
                list.forEach(record => {
                    key = extractId(record)
                    stmt.run(key, record.title, record.episode_id, 
                        record.opening_crawl, record.director, record.producer, 
                        record.release_date, record.created)
                })
                stmt.finalize()
            })
        }
    }

})
