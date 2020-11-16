const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
 
const ProductSchema = new Schema({
//   author: ObjectId,
  event: { type: String, required: true },
  schedule: String,
  place: String,
  start: String,
  end: String
});

module.exports = mongoose.model('Product', ProductSchema);