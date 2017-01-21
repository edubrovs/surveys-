'use strict'
const redis        = require('redis')
const config       = require('./config.json')
const _            = require('lodash')

let redisConnection

exports.getConnection = function getConnection () {
	if (redisConnection) return redisConnection
	throw new Error('Redis not ready')
}

exports.makeConnection = function makeConnection (callback) {
    const client = new redis.createClient(config.redis.url)
    const cb = _.once(callback)

    client.auth(config.redis.password)

    client.on('connect', function () {
    	console.log('connected to redis')
    	redisConnection = client
    	return cb()
    })

    client.on('error', function (err) {
    	redisConnection = null
    	console.log('error on redis')
    	return cb(err)
    })
}