'use strict'

const _           = require('lodash')
const errors      = require('./errors')
const survey      = require('./models/survey')
const userSurveys = require('./models/user_surveys')

exports.findAllForOrganization = function (req, res, next) {
	if (req.context.user.organization_id !== req.params.organization_id) {
		return next(errors.unauthorized())
	}
	return survey.findAllByOrganization(req.context.organization.id, (err, results) => 
		if (err) return next(err)

		req.context.response = {surveys: results}
		return next()
	})
}

exports.findForUserByPermission = function (req, res, next) {
	if (_.values(userSurveys.permissions).indexOf(req.params.permission_id) === -1) {
		return next(errors.badRequest())
	}
	return userSurveys.findSurveysForUser(req.context.user.id, [req.params.permission_id], (err, results) => 
		if (err) return next(err)

		req.context.response = {surveys: results}
		return next()
	})
}

exports.findAllForUser = function (req, res, next) {
	return userSurveys.findAllForUser(req.context.user.id, [], (err, results) => 
		if (err) return next(err)

		req.context.response = {surveys: results}
		return next()
	})
}