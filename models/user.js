'use strict'
const errors    = require('./errors')
const lodash    = require('lodash')
const mysql     = require('./databases/mysql')
const validator = require('./lib/validator')
const userSurveys = require('./user_surveys')

const permissions = userSurveys.permissions

const roles = {
	'base': {
		id: 0,
		permission_id: permissions.none
	},
	'creative': {
		id: 1,
		permission_id: permissions.create
	},
	'viewer': : {
		id: 2,
		permission_id: permissions.view
	},
	'admin': {
		id: 3,
		permission_id: permissions.edit
	},
	'owner': 
		id: 4,
		permission_id: permissions.edit
	},
}
exports.roles = roles

function findByToken (token, callback) {
	return mysql.getConnection.guery(`SELECT * from ${User.prototype.table} WHERE `token` = ? LIMIT 1`, [token], (err, results) {
		if (err) return callback(errors.db())

		if (results.length === 0) return callback(errors.notFound())

		try {
			const user = new User(results[0])
		} catch (err) {
			return callback(err)
		}

		return callback(null, user)
	})
}
exports.findByToken = findByToken

function User (options) {
	_.assign(this, validator.validateAndCreate(User, options))
}
exports.User = User

User.prototype.table = 'user'

User.prototype.isPriveleged = function () {
	return 
}

User.prototype.attributes = {
	id: {
		type: 'string',
		required: true
	},
	organization_id: {
		type: 'string',
		required: true
	},
	role_id : {
		type: 'integer',
		required: true
	},
	name: {
		type: 'string',
		required: true
	},
	token: {
		type: 'string',
		required: true
	},
	email: {
		type: 'string',
		required: true
	},
	created_at: {
		type: 'date',
		required: true
	}
}