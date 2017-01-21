'use strict'

const errors = require('./error')
const user   = require('./models/user')

exports.checkUser = function checkUser (req, res, next) {
	const token = req.headers.authorization

	if (!token) {
		return next()
	}

	return user.findByToken(token, function foundUser (err, user) {
		if (err) return next(err)

		req.context.user = user
		return next()
	})
}

exports.forceAuth = function forceAuth (req, res, next) {
	if (!req.context.user) {
		return next(errors.unauthorized())
	}
	return next()
}

exports.forceAdmin = function forceAdmin (req, res, next) {
	userSurveys.permissions.forEach((type, id) {
		if (type === 'edit' &&
	}
	if (_.values(userSurveys.permissions).indexOf(req.context.role_id) === -1) {
		return next(errors.unauthorized())
	}
	return next()
}

exports.checkUserOrganization = function checkUserOrganization (req, res, next) {
	if (req.context.user.organization_id !== req.params.organization_id) {
		return next(errors.unauthorized())
	}
	return next()
}