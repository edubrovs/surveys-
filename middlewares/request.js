'use strict'

exports.requestHandler = function requestHandler (req, res, next) {
	console.log('Received request', req.url)
	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin', '*')
	req.context = {}
	return next()
}

exports.returnResponse = function requestHandler (req, res, next) {
	return res.status(200).send(req.context.response)
}

exports.errorHandler = function errorHandler (err, req, res, next) {
	if (err) {
		console.log('Returning error', err)
		return res.status(err.statusCode).send(err)
	}
}

exports.unhandledRequestHandler = function unhandledRequestHandler (req, res, next) {
	console.log('Unhandled request')
	return res.status(404).send({error: 'unhandled route'})
}