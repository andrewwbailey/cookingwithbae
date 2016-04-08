var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var awbAuth = require('./auth-info.json');

// MongoDB Server Connect
var dbConnString = "mongodb://" + awbAuth["cwb"]["db"].username + ":" + awbAuth["cwb"]["db"].password + "@" + awbAuth["cwb"]["db"].connloc;

mongoose.connect(dbConnString);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log("Connected to mLab");
});

// Express Configuration
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(compression());

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
