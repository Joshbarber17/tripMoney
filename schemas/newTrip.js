var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newTripSchema = new Schema ({
  departDate: {type: String, required: true},
  returnDate: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  description: {type: String, required: true},
  // budget: {type: Number}, will add if I have trip-money
  status: {type: String},
  tripType: {type: String, required: true}
});
module.exports = mongoose.model('trip', newTripSchema);
