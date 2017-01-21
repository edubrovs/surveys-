'use strict'

exports.api = function (errorMessage, statusCode) {
	return {
		statusCode: statusCode || 500,
		error: new Error(errorMessage)
	}
}

exports.db = function () {
	return {
		statusCode: 503,
		error: new Error('back-end error')
	}
}

exports.badRequest = function () {
	return {
		statusCode: 400,
		error: new Error('invalid request')
	}
}

exports.validation = function () {
	return {
		statusCode: 400,
		error: new Error('invalid content')
	}
}

exports.unauthorized = function () {
	return {
		statusCode: 401,
		error: new Error('unauthorized')
	}
}

exports.nonAdmin = function () {
	return {
		statusCode: 401,
		error: new Error('non admin')
	}
}

exports.nonFound = function () {
	return {
		statusCode: 404,
		error: new Error('not found')
	}
}