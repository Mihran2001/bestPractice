const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String,
       unique:true},
    username: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        require: true,
        minlength: 6
      }
})

module.exports = mongoose.model('User', UserSchema);