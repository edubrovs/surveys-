'use strict'
const errors    = require('./errors')
const _         = require('lodash')

function Instance (model, options, isCreation) {
	const self = this

	Object.defineProperty(self, 'model', {
	  	value: model,
	 	writable: false,
	 	configurable: false,
	  	enumerable: false
	})

	var values = validator.validateAndCreate(self.model, options, isCreation)

	Object.keys(self.model.attributes).forEach((name) => {
		Object.defineProperty(self, name, {
			set: function (options) {
				Object.keys(options).forEach((name) => {
					const attribute = self.model.attributes[name]
					if (!attribute || !attribute.updatable) {
						throw new error.validation()
					}
				})
				const newValues = _.assign(_.cloneDeep(values), options)
				_.assign(values, validator.validateAndCreate(self.model, newValues))
			},
			get: function () {
				return values
			}
		})
	})	
}

Instance.prototype.update = function (options) {
	_.assign(this, options)
}

function makeInstance (model, options) {
	if (options.id || options.created_at) {
		throw errors.validation()
	}
	options.created_at = new Date()
	return new Instance(model, options, true)
}
exports.make = makeInstance

function buildInstance (model, options) {
	return new Instance(model, options)
}
exports.build = buildInstance

