
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var port = 2020;
app.use(bodyParser.json());
app.listen(port, function(){
  console.log('listening on port ' + port);
});
mongoose.connect('mongodb://localhost/trip-money'); //connect to DB via mongoose
mongoose.connection.once('open', function(){ //once the connection is open, call this callback function to let you know its connected
  console.log('connected to MongoDB');
});
app.use(express.static(__dirname+'/public'));
//end of the server portion

//newTripSchema and new trip post

var trip = require('./schemas/newTrip.js'); //new trip schema
app.post('/api/trips', function(req, res, next){ //post a new trip
  var newTrip = new trip(req.body);
  newTrip.save(function(err, response){
    if (err) {
      return res.status(400).send(err);
    }
    else {
      return res.send(response);
    }
  });
});
//end of new trip post


//current trip page
app.get('/api/getCurrentTrip', function(req, res, next){
  trip.findOne({status: 'current'}, function(err, response) {
      if (err) {
        return res.status(400).send(err);
      }
      else {
        return res.send(response);
      }
  });
});
