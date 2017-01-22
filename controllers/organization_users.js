'use strict'

const errors      = require('./errors')
const user        = require('./models/user')

exports.getAll = function (req, res, next) {
	return user.findAllByOrganization(req.context.organization.id, (err, results) => {
		if (err) return next(err)

		req.context.response = {users: results}
		return next()
	})
}

exports.get = function (req, res, next) {
	return user.findByOrganization({
		userId: req.params.user_id,
		organizationId: req.context.organization.id
	}, (err, result) => {
		if (err) return next(err)

		req.context.response = {user: result}
		return next()
	})
}

exports.post = function (req, res, next) {
	return user.create({
		organizationId: req.context.organization.id,
		reqBody: req.body
	}, (err, result) => {
		if (err) return next(err)

		req.context.response = {user: result}
		return next()
	})
}

exports.put = function (req, res, next) {
	return user.update({
		userId: req.params.user_id,
		organizationId: req.context.organization.id,
		reqBody: req.body
	}, (err, result) => {
		if (err) return next(err)

		req.context.response = {user: result}
		return next()
	})
}

exports.delete = function (req, res, next) {
	return user.delete({
		userId: req.params.user_id,
		organizationId: req.context.organization.id
	}, (err, result) => {
		return next(err)
	})
}