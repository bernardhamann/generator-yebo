var mongoose = require('mongoose');

// Create the schema
var postsSchema = new mongoose.Schema({
    content: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    }
});

// create the collection
var Posts = mongoose.model('posts', postsSchema);
