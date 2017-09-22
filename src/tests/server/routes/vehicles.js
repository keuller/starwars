'use strict'

const test = require('tape')
    , request = require('supertest')
    , http = require('http')
    , app = require('../../../server/app')

const server = http.createServer(app.callback())

let key = null

test('GET: /vehicles', t => {
    request(server)
        .get('/vehicles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, resp) => {
            t.error(err, 'no errors')
            t.notEqual(resp.body, null)
            t.assert(resp.body.length > 1)
            t.end()
        })
})

test('GET: /vehicles/55', t => {
    request(server)
        .get('/vehicles/55')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, resp) => {
            t.error(err, 'no errors')
            t.notEqual(resp.body, null)
            t.equal(resp.body.id, 55)
            t.end()
        })
})

test('POST: /vehicles', t => {
    const vehicle = {
        id: 0, name: 'Route test', model: 'Route test', manufacturer: 'Route test', class: '',
        credits: 100, capacity: 100, crew:1, length: 1.1, speed: 100
    }

    request(server)
        .post('/vehicles')
        .send(vehicle)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, resp) => {
            t.error(err, 'no errors')
            t.notEqual(resp.body, null)
            t.equal(resp.body.message, 'Vehicle created')
            t.end()
            key = resp.body.key
        })
})

test('DELETE: /vehicles', t => {
    request(server)
        .delete(`/vehicles/${key}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, resp) => {
            t.error(err, 'no errors')
            t.notEqual(resp.body, null)
            t.equal(resp.body.message, 'Vehicle removed')
            t.end()
            key = resp.body.key
        })
})
