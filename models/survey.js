'use strict'
const errors    = require('./errors')
const lodash    = require('lodash')
const Model   = require('./orm/model').Model

const Survey = new Model('Survey', attributes)
module.exports = Survey

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
	name: {
		type: 'string',
		required: true,
		updatable: true
	},
	content: {
		type: json,
		required: true,
		updatable: true
	}
	creator_id: {
		type: 'string',
		required: true
	},
	created_at: {
		type: 'date',
		required: true
	}
}
