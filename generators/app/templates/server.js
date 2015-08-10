#!/usr/bin/env node

var http = require('http');
var path = require('path');
var express = require('express');
var debug = require('debug')('express:server');
var config = require('./config.js');
// var fs = require('fs');
// var glob = require('glob');

var server = express();


// Setup the sitewide variables
server.locals.siteName = config.SITENAME;


/* setup the app.js to load all the js files in the models folder maybe reuse this code
fs.readdirSync(__dirname + '/models' ).forEach(function(filename){
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});
*/

// view engine setup
server.set('views', path.join(__dirname, '/build/views'));
server.set('view engine', 'hbs');

// Setup the static assets
// server.use(express.static('static'));
// server.use(express.static(path.resolve('./build/static'));
server.use(express.static(path.join(__dirname, '/build/static')));


// Setup the controllers and routes
var routesserver = require('./build/server/routesserver');
server.use('/', routesserver);


// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || config.PORT || '3000');
server.set('port', port);

//Normalize a port into a number, string, or false.
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        console.log("Port: " + port);
        return port;
    }

    return false;
}

// Create HTTP server.
var server = http.createServer(server);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
