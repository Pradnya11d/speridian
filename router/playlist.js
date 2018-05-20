var express = require('express');
var router = express.Router();
var config = require('../config/serverconfig').get(process.env.NODE_ENV);
var pool = require('../lib/mysqllib');

router.route('/getPlaylist').get(function(req, res, next){

  pool.getConnection(function (err, conn) {
      if (err) {
        console.log(err);
        return next(err);
      }
      conn.query('select * from playlist', function (err, result) {
        conn.release();
        if (err) {
          return next(err);
        }
        else {
					console.log(result);
					res.send(result);
          return next();
        }
      })
  })
});

router.route('/addPlaylist').post(function(req, res, next){

	var input = {
		video: req.body.video,
		category: req.body.category,
		type: req.body.type,
		amount: req.body.amount,
	}
	console.log(input);

  pool.getConnection(function (err, conn) {
      if (err) {
        console.log(err);
        return next(err);
      }
      conn.query('INSERT INTO `playlist` (`playlist`) VALUES (?)',
				[input.video],
			 		function (err, result) {
		        conn.release();
		        if (err) {
		          return next(err);
		        }
		        else {
							console.log(result);
							res.send(result);
		          return next();
		        }
      })
  })
});

router.route('/deletevideo').get(function(req, res, next){

	var input = {
		id: req.query.id
	}

	console.log(input);

  pool.getConnection(function (err, conn) {
      if (err) {
        console.log(err);
        return next(err);
      }
      conn.query('DELETE FROM `playlist` WHERE id= ?',
				[input.id],
			 		function (err, result) {
		        conn.release();
		        if (err) {
		          return next(err);
		        }
		        else {
							console.log(result);
							res.send(result);
		          return next();
		        }
      })
  })
});


module.exports = router;
