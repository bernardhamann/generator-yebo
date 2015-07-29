var mongoose = require('mongoose');

// Create the schema
var usersSchema = new mongoose.Schema({
    name: String
});

// create the collection
var Users = mongoose.model('users', usersSchema);
