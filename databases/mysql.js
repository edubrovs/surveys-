'use strict'
const mysql      = require('mysql2')
const config     = require('./config.json')

let mySqlConnection

exports.getConnection = function getConnection () {
	if (mySqlConnection) return mySqlConnection
	throw new Error('Mysql not ready')
}

exports.makeConnection = function makeConnection (callback) {
	return function make (callback) {
		const connection = mysql.createConnection({
		  host     :  config.mysql.host,
		  user     :  config.mysql.username,
		  password :  config.mysql.password,
		  database :  config.mysql.database
		});

		return connection.connect(function(err) {
		  	if (err) {
		  		console.log('error on mysql')
		    	return callback(err)
		    }

		    console.log('connected to mysql')
		    mySqlConnection = connection
		    return callback()
		})
	}()
}