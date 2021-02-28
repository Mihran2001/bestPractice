const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objectSchema = new Schema({
  obj: {
    name: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    },
    value: {
      type: {},
      required: true
    },
    tags: [{
      type: String
    }]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'userSchema',
    required: true
  }
})

module.exports = mongoose.model('objects', objectSchema)