'use strict'
const errors    = require('./errors')
const lodash    = require('lodash')
const mysql     = require('./databases/mysql')

function find (id, callback) {
	return mysql.getConnection.guery(`SELECT * from ${Survey.prototype.table} WHERE `id` = ? LIMIT 1`, [id], (err, results) {
		if (err) return callback(errors.db())

		if (results.length === 0) return callback(errors.notFound())

		try {
			const survey = new Survey(results[0])
		} catch (err) {
			return callback(err)
		}

		return callback(null, survey)
	})
}
exports.find = find

function findAllByOrganization (organization_id, callback) {
	return mysql.getConnection.guery(`SELECT * from ${Survey.prototype.table} WHERE `organization_id` = ? LIMIT 1`, [organization_id], (err, results) {
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
exports.findAllByOrganization = findAllByOrganization

function findAllByCreator (creator_id, callback) {
	return mysql.getConnection.guery(`SELECT * from ${Survey.prototype.table} WHERE `creator_id` = ? LIMIT 1`, [creator_id], (err, results) {
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
exports.findAllByCreator = findAllByCreator

function Survey (options) {
	_.assign(this, validator.validateAndCreate(Survey, options))
}
exports.Survey = Survey

Survey.prototype.table = 'Survey'

Survey.prototype.attributes = {
	id: {
		type: 'string',
		required: true
	},
	organization_id: {
		type: 'string',
		required: true
	},
	name: {
		type: 'string',
		required: true
	},
	content: {
		type: json,
		required: true
	}
	organization_id: {
		type: 'string',
		required: true
	},
	creator_id: {
		type: 'string',
		required: true
	},
	created_at: {
		type: 'date',
		required: true
	}
}
