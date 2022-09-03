const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Username : String,
    Email : String,
    Password : String
});

const UserCollection = mongoose.model('User' , userSchema)
module.exports = UserCollection;