'use strict'

module.exports = (function() {
    return {
        genId() {
            let min = 200, max = 999
            return Math.floor(Math.random() * (max - min)) + min
        }
    }
})()
