'use strict'
const errors    = require('./errors')
const mysql     = require('./databases/mysql')
const Model     = require('./orm/model').Model
const Instance  = require('./orm/instance')

/*
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

*/

User = new Model('user', attributes)
module.exports = User

User.prototype.findByToken (token, callback) {
	return mysql.getConnection.guery(`SELECT * from ${this.table} WHERE `token` = ? LIMIT 1`, [token], (err, results) {
		if (err) return callback(errors.db())

		if (results.length === 0) return callback(errors.notFound())

		try {
			const user = Instance.build(this, results[0])
		} catch (err) {
			return callback(err)
		}

		return callback(null, user)
	})
}

const attributes = {
	id: {
		type: 'string',
		required: true,
		creation: true
	},
	organization_id: {
		type: 'string',
		required: true
	},
	role_id : {
		type: 'integer',
		required: true,
		updatable: true,
	},
	name: {
		type: 'string',
		required: true,
		updatable: true,
	},
	token: {
		type: 'string',
		required: true
	},
	email: {
		type: 'string',
		required: true,
		updatable: true
	},
	created_at: {
		type: 'date',
		required: true
	}
}