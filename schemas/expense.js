var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema ({
  cost: {type: Number, required: true},
  category: {type: String, required: true}
});
module.exports = mongoose.model('expense', expenseSchema);
