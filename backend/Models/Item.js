const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String
  },
  duedate: {
    type: String
  }
}, {
  collection: 'items'
})

module.exports = mongoose.model('Item', itemSchema)