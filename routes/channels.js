var express = require('express');
var router = express.Router();

router.get('/channels', function(req, res) {
	var db = req.db;
	db.collection('channels').find().toArray(function(err, ele){
		if (err){
			res.send(err);
		}
		res.json(ele);
	});
});

router.post('/add', function(req, res) {
	var db = req.db;
	db.collection('channels').insert(req.body, function(err , result){
		if (err){
			res.send(err);
		} else {
			res.send('');
		}
	});
});

router.post('/remove', function (req, res) {
	var db = req.db;
	db.collection('channels').remove(req.body, function(err, result){
		if (err){
			res.send(err);
		} else {
			res.send('');
		}	
	});
});

module.exports = router;
