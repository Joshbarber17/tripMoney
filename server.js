
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var port = 2317;
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
var expense = require('./schemas/expense.js');
app.get('/api/getCurrentTrip', function(req, res, next){ //get current trip to populate picture in nave bar
  trip.findOne({status: 'current'}, function(err, response) {
      if (err) {
        return res.status(500).send(err);
      }
      else {
        return res.status(200).send(response);
      }
  });
});
app.post('/api/expense', function(req, res, next){ //post expenses to the current trip
  var newExpense = new expense(req.body);
  newExpense.save(function(err, expense){
    if (err) {
      return res.status(400).send(err);
    }
    else {
      trip.findOne({status: 'current'}, function(err, trip) {
        if (err) {
          return res.status(500).send(err);
        }
        else {
          trip.expenses.push(expense._id);
          trip.save(function(err, updatedTrip) {
            if (err) {
              return res.status(500).send(err);
            }
            else {
              return res.send(updatedTrip);
            }
          });
        }
      });
    }
  });
});
app.get('/api/expenses', function(req, res, next) { //get expenses spec
  trip.findOne({status: 'current'}).populate('expenses')
  .exec(function(err, trip) {
      if (err) {
        return res.status(500).send(err);
      }
      else {
        return res.send(trip.expenses);
      }
  });
});
app.delete('/api/expenses/:id', function(req, res, next) { //delete specific expense from the collection
    expense.remove({_id: req.params.id}, function(err, response) {
      if (err) {
        return res.status(500).send(err);
      }
      else {
        trip.findOne({status: 'current'}, function(err, trip) { //after expense is deleted..we must update the trip and take out the expense. this finds the current trip again
          if (err) {
            return res.status(500).send(err);
          }
          else {
            trip.expenses.splice(trip.expenses.indexOf(req.params.id), 1); //this takes the expense out
            trip.save(function(err, updatedTrip) { //this saves and updates the trip
              if (err) {
                res.status(500).send(err);
              }
              else{
                return res.status(200).send(updatedTrip);
              }
            });
          }
        });
      }
    });
});
app.put('/api/endCurrentTrip', function(req, res, next) {
  trip.findOne({status: 'current'}, function(err, trip) {
    if (err) {
      return res.status(500).send(err);
    }
    else {
      trip.status = 'past';
      trip.save(function(err, updatedTrip) {
        if (err) {
          return res.status(500).send(err);
        }
        else {
          return res.status(200).send(updatedTrip);
        }
      });
    }
  });
});
//END OF CURRENT TRIPS page


//PAST TRIPS page
app.get('/api/getAllTrips', function(req, res, next) {
  trip.find({status: 'past'}, function(err, trips) {
    if (err) {
      res.status(500).send(err);
    }
    else if (trips) {
      res.status(200).send(trips);
    }
  });
});
//END OF PAST TRIPS page

//START OF PAST TRIP SUMMARY PAGE
app.get('/api/showTripSummary/:id', function(req, res, next){
  trip.findOne({_id: req.params.id}, function(err, trip) {
      if (err) {
        return res.status(500).send(err);
      }
      else {
        return res.status(200).send(trip);
      }
  });
});
app.get('/api/getTripExpenses/:id', function(req, res, next){
  trip.findOne({_id: req.params.id}).populate('expenses').exec(function(err, trip) {
      if (err) {
        return res.status(500).send(err);
      }
      else {
        return res.status(200).send(trip.expenses);
      }
  });
});
