'use strict'
const errors    = require('./errors')
const lodash    = require('lodash')
const mysql     = require('./databases/mysql')

const permissions = {
	none: 0,
	create: 1,
	view: 2,
	edit: 3
}
exports.permissions = permissions

function findSurveysForUser (user_id, permissions, callback) {
	const query = `SELECT *
		from ${SurveyPermissions.prototype.table} 
		WHERE user_id = ?`

	const params = [user_id]

	if (permissions.length > 0) {
		const permissionIds = permissions.join(',')
		query += ` AND permissions_id IN (${permissionIds}) `
		permissions.forEach((permission) => {
			params.push(permission)
		})
	}

	return mysql.getConnection.guery(query, params, (err, results) {
		if (err) return callback(errors.db())

		if (results.length === 0) return callback(errors.notFound())

		try {
			const surveys = results.map((result) => {new Survey(result)})
		} catch (err) {
			return callback(err)
		}

		return callback(null, surveys)
	})
}
exports.findSurveysForUser = findSurveysForUser

function findUsersForSurvey (survey_id, permissions, callback) {
	const query = `SELECT *
		from ${SurveyPermissions.prototype.table} 
		WHERE survey_id = ?`

	const params = [survey_id]

	if (permissions.length > 0) {
		const permissionIds = permissions.join(',')
		query += ` AND permissions_id IN (${permissionIds}) `
		permissions.forEach((permission) => {
			params.push(permission)
		})
	}

	return mysql.getConnection.guery(query, params, (err, results) {
		if (err) return callback(errors.db())

		if (results.length === 0) return callback(errors.notFound())

		try {
			const surveys = results.map((result) => {new Survey(result)})
		} catch (err) {
			return callback(err)
		}

		return callback(null, surveys)
	})
}
exports.findUsersForSurvey = findUsersForSurvey

function UserSurveys (options) {
	_.assign(this, validator.validateAndCreate(UserSurveys, options))
}
exports.UserSurveys = UserSurveys

UserSurveys.prototype.table = 'UserSurveys'

UserSurveys.prototype.attributes = {
	survey_id: {
		type: 'string',
		required: true
	},
	user_id: {
		type: 'string',
		required: true
	},
	permission_id: {
		type: 'integer',
		required: true
	}
}
