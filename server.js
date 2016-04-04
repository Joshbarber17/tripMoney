
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var port = 2317;
var tripCtrl = require('./controllers/tripCtrl.js');
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
app.post('/api/trips', tripCtrl.makeNewTrip);
//end of new trip post

//current trip page
app.get('/api/getCurrentTrip', tripCtrl.getCurrentTrip);
app.post('/api/expense', tripCtrl.postNewExpense);
app.get('/api/expenses', tripCtrl.getExpenses);
app.delete('/api/expenses/:id', tripCtrl.deleteExpense);
app.put('/api/endCurrentTrip', tripCtrl.endCurrentTrip);
//END OF CURRENT TRIPS page


//PAST TRIPS page
app.get('/api/getAllTrips', tripCtrl.getPastTrips); //get all past trips
app.delete('/api/deleteExpenses/:expenses', tripCtrl.deleteAllExpenses);
app.delete('/api/deleteTrip/:id', tripCtrl.deleteTrip);
//END OF PAST TRIPS page

//START OF PAST TRIP SUMMARY PAGE
app.get('/api/showTripSummary/:id', tripCtrl.showTripSummary);
app.get('/api/getTripExpenses/:id', tripCtrl.showPastTripExpenses);
