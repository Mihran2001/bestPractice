const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    username: {
        type: String,
        require: true,
        unique: true
      },
      password: {
        type: String,
        require: true,
        minlength: 6
      }
})

module.exports = mongoose.model('User', UserSchema);