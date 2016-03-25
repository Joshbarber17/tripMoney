
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

//newTripSchema

var newTrip = require('./schemas/newTrip.js');
app.post('/api/newTrip', function(req, res, next){
  var trip = new newTrip(req.body);
  trip.save(function(err, response){
    if (err) {
      return res.status(400).send(err);
    }
    else {
      return res.send(response);
    }
  });
});
