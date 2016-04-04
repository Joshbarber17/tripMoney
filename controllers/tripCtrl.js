var trip = require('../schemas/newTrip.js'); //new trip schema
var expense = require('../schemas/expense.js'); //expense schema
module.exports = {
  //start of new trips
  makeNewTrip: function (req, res, next){ //post a new trip
    var newTrip = new trip(req.body);
    newTrip.save(function(err, response){
      if (err) {
        return res.status(400).send(err);
      }
      else {
        return res.send(response);
      }
    });
  },
  //end of new trips
  //start of current trips
  getCurrentTrip: function(req, res, next){ //get current trip to populate picture in nave bar
    trip.findOne({status: 'current'}, function(err, response) {
        if (err) {
          return res.status(500).send(err);
        }
        else {
          return res.status(200).send(response);
        }
      });
    },
  postNewExpense:  function(req, res, next){ //post expenses to the current trip
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
    },
  getExpenses: function(req, res, next) { //get/show all expenses for the current trip
    trip.findOne({status: 'current'}).populate('expenses')
    .exec(function(err, trip) {
        if (err) {
          return res.status(500).send(err);
        }
        else {
          return res.send(trip.expenses);
        }
    });
  },
  deleteExpense: function(req, res, next) { //delete specific expense from current trip from the collection
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
  },
  endCurrentTrip: function(req, res, next) { //ends the current trip and changes it to a 'past' trip
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
  },
  //end of current trips
  //start of past trips
  getPastTrips: function(req, res, next) { //get all the past trips to list them
    trip.find({status: 'past'}, function(err, trips) {
      if (err) {
        return res.status(500).send(err);
      }
      else if (trips) {
        return res.status(200).send(trips);
      }
    });
  },
  //the next two are both for deleting the trip all together. First it has to delete the expenses from the expense collection..then delete the trip from the trips collection
  deleteAllExpenses: function(req, res, next) { //deleting all the expenses in the expense collection first before deleting entire trip
    var expenseArray = req.params.expenses.split(',');
    for (var i = 0; i < expenseArray.length; i++) {
      expense.findByIdAndRemove(expenseArray[i], function(){
      });
    }
  },
  deleteTrip: function(req, res, next) { //delete the entire trip
    trip.findByIdAndRemove(req.params.id, function(err, response){
      if (err) {
        return res.status(500).send(err);
      }
      else {
        return res.status(200).send(response);
      }
    });
  },
  //end of past trips
  //start of past trips summary
  showTripSummary: function(req, res, next){ //used to populate picture at the top depending on trip type
    trip.findOne({_id: req.params.id}, function(err, trip) {
        if (err) {
          return res.status(500).send(err);
        }
        else {
          return res.status(200).send(trip);
        }
    });
  },
  showPastTripExpenses: function(req, res, next) { //shows all the expenses 
    trip.findOne({_id: req.params.id}).populate('expenses').exec(function(err, trip) {
        if (err) {
          return res.status(500).send(err);
        }
        else {
          return res.status(200).send(trip.expenses);
        }
    });
  },
  //end of past trips summary
};
