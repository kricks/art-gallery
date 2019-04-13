// import * as galleryRoutes from './server/routes/gallery';

// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... 
const galleryRoutes = require('./server/routes/gallery');

// establish a connection to the mongo database
// *** Important *** change yourPort and yourDatabase
//     to those used by your database
mongoose.connect("mongodb+srv://kricks41:94U39wabthLfhBX4@cluster0-hfir1.mongodb.net/final?retryWrites=true",
  { useNewUrlParser: true }, (err, res) => {
    if (err) {
      ////console.log("Connection failed");
    }
    else if (res) {
      ////console.log('Connected to database');
    }
    else {
      ////console.log("FAIL");
    }
  }
)

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// CORS support
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/final')));

// Tell express to map the default route ("/") to the index route
app.use('/', index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use('/', index);
app.use('/arts', galleryRoutes); 
app.use("/images", express.static(path.join('server/images')));

// Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/final/index.html'));
});

// Define the port address and tell express to use this port  
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () { ////console.log("API running on localhost: " + port) 
});
