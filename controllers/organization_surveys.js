'use strict'

const errors    = require('./errors')
const survey      = require('./models/survey')
const userSurveys = require('./models/user_surveys')

exports.getAll = function (req, res, next) {
	return survey.findAllByOrganization(req.context.organization.id, (err, results) => {
		if (err) return next(err)

		req.context.response = {surveys: results}
		return next()
	})
}

exports.get = function (req, res, next) {
	return survey.find(req.params.survey_id, (err, results) => {
		if (err) return next(err)

		req.context.response = {surveys: results}
		return next()
	})
}

exports.post = function (req, res, next) {
	return survey.create(req.body, (err, result) => {
		if (err) return next(err)

		req.context.response = {survey: result}
		return next()
	})
}