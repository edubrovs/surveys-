'use strict'

exports.request = require('request').defaults({
    timeout: 10000,
    forever: true
})

const http    	  			= require('http')
const express     			= require('express')
const requestMiddlewares 	= require('./middlewares/request')
const routes      			= require('./routes')
const mysql      			= require('./databases/mysql')
const redis                 = require('./databases/redis')

const app = express()

app.use(requestMiddlewares.requestHandler)
app.use('/', routes.public)
app.use('/', routes.mixed)
app.use('/', routes.authorized)
app.use([
	requestMiddlewares.returnResponse,
	requestMiddlewares.errorHandler,
	requestMiddlewares.unhandledRequestHandler
])

return async.parallel([
	mysql.makeConnection,
	redis.makeConnection
], (err) => {
	if (err) {
		console.log('Failed to make database connection', err)
		process.exit(1)
	}

	const server = http.createServer(app)
	server.listen(3000)

	console.log('Starting server')

	server.on('error', function (err) {
	    console.log('Failed to start server', err)
	    process.exit(1)
	})
})