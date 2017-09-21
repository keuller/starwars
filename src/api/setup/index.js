/**
 * This function just run once, at first time to setup database, if 
 * it does not exists or is empty
 */
'use strict'

const request = require('request')
    , Rx = require('rxjs')
    , database = require('./database')
    , baseUrl = 'https://swapi.co/api'

const { Observable } = Rx

function fetch(url) {
    return Observable.create(obs => {
        request(`${url}`, (err, resp, body) => {
            if (err) return obs.error(err)
            if (resp.statusCode != 200) {
                return obs.error(new Error(resp.responseText))
            }
            obs.next(JSON.parse(body))
            obs.complete()
        })
    })
}

function loadData(url) {
    return fetch(`${url}`).flatMap(data => {
        let stream = Observable.of(data.results)
        if (data.next != null) {
            return Observable.merge(stream, loadData(data.next))
        }
        return stream
    })
}

module.exports = (async function(db) {
    if (db == null || db == undefined) return

    let dbo = database(db)
    dbo.createTables()

    dbo.isEmpty('vehicles')
    .flatMap(isEmpty => isEmpty ? loadData(`${baseUrl}/vehicles`) : Observable.of([]))
    .subscribe(
        data => { if (data.length > 0) dbo.fillVehicles(data) },
        (err) => console.error('[ERROR] Cannot fill Vehicles table.', err),
        () => console.log('[INFO] Vehicles table done.')
    )

    dbo.isEmpty('starships')
    .flatMap(isEmpty => isEmpty ? loadData(`${baseUrl}/starships`) : Observable.of([]))
    .subscribe(
        data => { if (data.length > 0) dbo.fillStarships(data) }, 
        (err) => console.error('[ERROR] Cannot fill Starships table.', err), 
        () => console.log('[INFO] Starships table done.')
    )

    dbo.isEmpty('films')
    .flatMap(isEmpty => isEmpty ? loadData(`${baseUrl}/films`) : Observable.of([]))
    .subscribe(
        data => { if (data.length > 0) dbo.fillFilms(data) },
        (err) => console.error('[ERROR] Cannot fill Films table.', err),
        () => console.log('[INFO] Films table done.')
    )
})
