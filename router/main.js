
var config = require('../config/serverconfig');

module.exports = function (app){
	app.use('/api/playlist', require('./playlist'));
};
