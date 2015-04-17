var express = require('express');
var router = express.Router();

router.get('/all', function(req, res) {
	var db = req.db;
	var options = {
		"sort": ['_id', '-1']
	};
	db.collection('links').find({}, options).toArray(function(err, ele){
		if (err){
			res.send(err);
		}
		res.json(ele);
	});
});

router.get('/lastTen', function(req, res) {
//	var numOfMessages = req.body;
	var db = req.db;
	var options = {
		"limit": 10,
		"sort": [["_id", -1]]
	};
	db.collection('links').find({}, options).toArray(function(err , ele){
		if (err){
			res.send(err);
		}
		res.json(ele);
	});
});

module.exports = router;
