// ./db/mysqllib.js

var config = require('../config/serverconfig').get(process.env.NODE_ENV);
var mysql = require('mysql');

//create dabase pool and export it to be used by other programs
var pool  = mysql.createPool({
  host     : config.dbhost,
  user     : config.dbuser,
  password : config.dbpwd,
  database : config.dbschema,
  timezone: config.timezone,
  dateStrings: config.dateStrings,
  multipleStatements: true
});

exports.getConnection = function(callback){
	pool.getConnection(function(err, conn){
		if(err)
			return callback(err);
		return callback(err, conn);
	});
};
