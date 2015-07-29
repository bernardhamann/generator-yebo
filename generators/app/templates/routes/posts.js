var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
    mongoose.model('posts').find(function(err, posts){
    });
});

module.exports = router;
