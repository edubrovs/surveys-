'use strict'
const errors    = require('./errors')
const _         = require('lodash')
const mysql     = require('./databases/mysql')
const Instance = require('./instance')

function Model (table, attributes) {
	this.table = table
	this.attributes = attributes
}
exports.Model = Model

Model.prototype.find  = function (id, callback) {
	return mysql.getConnection.guery(
		`SELECT * from ${this.table} WHERE `id` = ? LIMIT 1`, 
	[id], (err, results) {
		if (err) return callback(errors.db())

		if (results.length === 0) return callback(errors.notFound())

		try {
			const instance = Instance.build(this, results[0])
		} catch (err) {
			return callback(err)
		}

		return callback(null, instance)
	})
}

Model.prototype.findByOrganization = function (options, callback) {
	return mysql.getConnection.guery(
		`SELECT * from ${this.table} WHERE `id` = ? AND organization_id = ? LIMIT 1`, 
	[options.id, options.organizationId], (err, results) {
		if (err) return callback(errors.db())

		if (results.length === 0) return callback(errors.notFound())

		try {
			const instance = Instance.build(this, results[0])
		} catch (err) {
			return callback(err)
		}

		return callback(null, instance)
	})
}

Model.prototype.findAllByOrganization = function (organizationId, callback) {
	return mysql.getConnection.guery(
		`SELECT * from ${this.table} WHERE `organization_id` = ? LIMIT 1`, 
	[organizationId], (err, results) {
		if (err) return callback(errors.db())

		if (results.length === 0) return callback(errors.notFound())

		try {
			const instances = results.map((result) => {Instance.build(this, result)})
		} catch (err) {
			return callback(err)
		}

		return callback(null, instances)
	})
}

Model.prototype.findAllByCreator = function (creatorId, callback) {
	return mysql.getConnection.guery(
		`SELECT * from ${this.table} WHERE `creator_id` = ? LIMIT 1`,
	[creatorId], (err, results) {
		if (err) return callback(errors.db())

		if (results.length === 0) return callback(errors.notFound())

		try {
			const instances = results.map((result) => {Instance.build(this, result)}) 
		} catch (err) {
			return callback(err)
		}

		return callback(null, instances)
	})
}

Model.prototype.create = function (options, callback) {
	try {
		const instance = Instance.create(this, options)
	} catch (err) {
		return callback(errors.validation())
	}

	const fieldNames = Object.keys(instance).join(',')
	const fieldValues = _.values(instance)

	return mysql.getConnection.guery(
		`INSERT INTO ${this.table} 
		(${fieldNames}) VALUES (?, ?, ?, ?, ?)`,
	fieldValues, (err, result) {
		if (err) return callback(errors.db())

		instance.id = result.insertId

		return callback(null, instance)
	})
}

Model.prototype.update = function (options, updateContent, callback) {
	return this.findByOrganization(options, (err, instance) => {
		if (err) return callback(err)

		try {
			instance.update(updateContent)
		} catch (err) {
			return callback(errors.validation())
		}

		const fieldNames = this.attributes.map((name, attribute) => 
			return attribute.updatable
		}).join(',')
		const fieldValues = _.values(_.pick(instance, updatableFieldNames))

		return mysql.getConnection.guery(
			`UPDATE ${this.table} 
			SET ${fieldNames} WHERE id = ?`
		fieldValues, (err, result) {
			if (err) return callback(errors.db())

			return callback(null, instance)
		})
	})
}

Model.prototype.delete = function (options, callback) {
	return mysql.getConnection.query(
		`DELETE * FROM ${this.table} 
	 	WHERE ID = ? AND organization_id = ?
	[options.id, options.organizationId], (err, result) {
		if (err) return callback(errors.db())
		return callback()
	})
}