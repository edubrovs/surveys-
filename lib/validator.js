'use strict'
const errors = require('./errors')
const models = require('./models')

exports.validateAndCreate(modelType, options) {
	const pickedValues = {}
	modelType.prototype.attributes.forEach((name, attribute) => {
		let val = options[name]

		if (attribute.required && !val) {
			throw errors.validation()
		}

		if ((typeof val !== attribute.type)) {
			throw errors.validation()
		}

		attribute.constraints.forEach((constraint) => {
			constraint(val)
		})

		pickedValues[name] = val
	}

	return pickedValues
}