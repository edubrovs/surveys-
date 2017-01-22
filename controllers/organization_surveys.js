'use strict'

const errors      = require('./errors')
const survey      = require('./models/survey').Survey
const _           = require('lodash')

exports.getAll = function (req, res, next) {
	return survey.findAllByOrganization(req.context.organization.id, (err, results) => {
		if (err) return next(err)

		req.context.response = {surveys: results}
		return next()
	})
}

exports.get = function (req, res, next) {
	return survey.findByOrganization({
		id:req.params.survey_id, 
		organizationId: req.context.organization.id
	}, (err, result) => {
		if (err) return next(err)

		req.context.response = {survey: result}
		return next()
	})
}

exports.post = function (req, res, next) {
	return survey.create(_.assign(req.body, {
		organization_id: req.context.organization.id,
		user_id: req.context.user.id,
	}), (err, result) => {
		if (err) return next(err)

		req.context.response = {survey: result}
		return next()
	})
}

exports.put = function (req, res, next) {
	return survey.update({
		id:req.params.survey_id, 
		organizationId: req.context.organization.id,
	}, reqBody, (err, result) => {
		if (err) return next(err)

		req.context.response = {survey: result}
		return next()
	})
}

exports.delete = function (req, res, next) {
	return survey.delete({
		id:req.params.survey_id, 
		organizationId: req.context.organization.id
	}, (err, result) => {
		return next(err)
	})
}