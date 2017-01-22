'use strict'

const Model     = require('./orm/model').Model

const Organization = new Model('organization', attributes)
module.exports = Organization

const attributes = {
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