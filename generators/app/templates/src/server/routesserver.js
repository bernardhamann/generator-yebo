var express = require('express');
var router = express.Router();

// experiment
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/page', function(req, res, next) {
    res.render('index', { title: 'Page server rendered' });
});

router.get('/contact', function(req, res, next) {
    // res.render('index', { title: 'About server rendered' });
    res.send('Contact Route from Router Server');
});

// experiment
router.get('/build', function(req, res, next) {

    res.sendFile(path.join(__dirname + '/build.html'));
    //res.sendFile('/build/static/build.html');

    //RENDER THE NEW page on a timer
	var myVar = setInterval(function(){ myTimer() }, 3000);
    function myTimer() {
        var html = fs.readFileSync('./build/static/build.html', 'utf8');
        console.log('html')
        fs.writeFileSync('./build/server/build.html', html)
        // res.render('index', { title: 'About server rendered' });
        clearInterval(myVar);
    }

});

router.get('/', function(req, res, next) {
    res.send('Index from server');
    //res.render('pages/index', {
    //  title: 'Welcome To the pagedd ff',
    //description: 'This is the description'
    //});
});

module.exports = router;

