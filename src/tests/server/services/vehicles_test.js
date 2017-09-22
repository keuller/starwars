'use strict'

const test = require('tape')
    , sqlite3 = require('sqlite3')
    , service = require('../../../server/services/vehicles')
    , db = new sqlite3.Database('starwars.db')

let key = null

test('Get All Vehicles', (t) => {
    let source = service(db).getAll()
    t.timeoutAfter(2000)

    t.assert(source !== null)
    source.subscribe(list => {
        t.assert(list.length > 0)
        t.end()
    })
})

test('Find Vehicle', (t) => {
    let source = service(db).find(20)
    t.notEqual(source, null)

    source.subscribe(record => {
        t.notEqual(record, undefined)
        t.assert(record.id > 0)
        t.end()
    })
})

test('Not found vehicle', (t) => {
    let source = service(db).find(2)
    t.notEqual(source, null)
    source.subscribe(record => {
        t.equal(record, undefined)
        t.end()
    })
})

test('Create vehicle', (t) => {
    const vehicle = {
        id: 0, name: 'Test Vehicle', model: 'Test Model', manufacturer: 'Test', 
        class: 'test', credits: 100, crew: 100, speed: 500, capacity: 100, length: 10
    }

    let source = service(db).save(vehicle)
    t.notEqual(source, null)
    source.subscribe(result => {
        t.notEqual(result, undefined)
        t.assert(result.key > 100, `Vehicle created with ID ${result.key}`)
        key = result.key
        t.end()
    })
})

test('Update vehicle', (t) => {
    const vehicle = {
        id: 55, name: 'Flitknot speeder', model: 'Flitknot speeder', manufacturer: 'Huppla Pasa Tisc Shipwrights',
        credits: 7000, length: 3, crew: 2, speed:635, passengers:1, capacity:0, class:'speeder'
    }

    let source = service(db).save(vehicle)
    t.notEqual(source, null)
    source.subscribe(result => {
        t.notEqual(result, undefined)
        t.end()
    })
})

test('Remove vehicle', t => {
    t.notEqual(key, null)

    service(db).remove(key).subscribe(result => {
        t.equal(result, undefined)
        t.end()
    })
})
