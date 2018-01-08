
let mongoDBURL = 'mongodb://localhost/ResizePhotosdb';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  PhotoData = require('./api/models/photoDataModel'),
  Photo = require('./api/models/photoModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDBURL);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/photoRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('ResizePhoto server started on: ' + port);
