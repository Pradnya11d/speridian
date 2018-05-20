var config = {
  default: {
  dbhost : 'localhost',
		dbuser : 'root',
		dbpwd : '',
		dbschema : 'speridian',
   timezone: 'utc+05:30',
   dateStrings: true,
    log:{
			directory: "log",
			file: "-results.log",
			level: "debug"
		}
  }
}

exports.get = function get(env){
	return config[env] || config.default;
}
