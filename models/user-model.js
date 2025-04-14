const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/joi");

const userSchema = mongoose.Schema({
    username: String,
    name : String,
    age: Number,
    contact: Number,
    email: String
})

module.exports = mongoose.model("User",userSchema);