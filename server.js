var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config/serverconfig').get(process.env.NODE_ENV);
var logger = require('./lib/log');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

app.use(express.static(__dirname + "/build/public"));

//test url
app.get('/test', function(req, res){
	res.json({says:'Hello!!!'});
});

app.use(morgan('combined', {stream: logger.stream}));


// Get the port and host information from first env variable in OS
// else from config file or else default to 3001 port and localhost
var port =  3001;

var hostname = 'localhost';


var router = require('./router/main')(app);


// Error Handler
app.use('/',function(err, req, res, next){
	if(err){
		logger.debug('Error: server.js : req url=' + req.path + ' : error=' + err);
		res.send({status: 500, message: 'server internal error.', type: 'internal'});
	}
});


module.exports = app;
app.listen(port);
logger.debug(' api started on port ' + port);
