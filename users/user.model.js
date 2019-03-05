const mongoose = require('mongoose');

const user = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   email: {type: String, required: true},
   password: {type: String, required: true},
   firstName: {type: String, required: false},
   lastName: {type: String, required: false},
   image: {type: String, required: false},
});

module.exports = mongoose.model('User', user);