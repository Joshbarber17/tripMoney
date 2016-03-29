var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema ({
  cost: {type: Number, required: true},
  category: {type: String, required: true},
  businessName: {type: String, required: true},
  businessCity: {type: String, required: true},
  businessState: {type: String, required: true}
});
module.exports = mongoose.model('expense', expenseSchema);
