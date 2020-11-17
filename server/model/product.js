const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const ProductSchema = new Schema({
  event: { type: String, required: true },
  schedule: String,
  place: String,
  start: String,
  end: String
});

module.exports = mongoose.model('Product', ProductSchema);