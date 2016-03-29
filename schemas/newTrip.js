var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newTripSchema = new Schema ({
  departDate: {type: String, required: true},
  returnDate: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  description: {type: String, required: true},
  // budget: {type: Number}, will add if I have time
  status: {type: String},
  tripType: {type: String, required: true},
  expenses: [{type: Schema.Types.ObjectId, ref: 'expense'}]
});
module.exports = mongoose.model('trip', newTripSchema);
