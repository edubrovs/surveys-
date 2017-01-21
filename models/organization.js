'use strict'

const validator = require('./validator')
const _         = require('lodash')
const mysql     = require('./databases/mysql')

function find (id, callback) {
	return mysql.getConnection.guery(`SELECT * from ${Organization.prototype.table} WHERE `id` = ? LIMIT 1`, [id], (err, results) {
		if (err) return callback(errors.db())

		if (results.length === 0) return callback(errors.notFound())

		try {
			const organization = new Organization(results[0])
		} catch (err) {
			return callback(err)
		}

		return callback(null, organization)
	})
}
exports.find = find

function Organization (options) {
	_.assign(this, validator.validateAndCreate(Organization, options))
}
exports.Organization = Organization

Organization.prototype.table = 'organization'

Organization.prototype.attributes = {
	id: {
		type: 'string',
		required: true
	},
	name: {
		type: 'string',
		required: true
	},
	creator_id: {
		type: 'string',
		required: true
	}
	email: {
		type: 'string',
		required: true
	},
	created_at: {
		type: 'date',
		required: true
	},
	plan_type: 'string'
}