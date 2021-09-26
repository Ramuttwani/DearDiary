const mongoose = require("mongoose");

//author schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books:[String],
});

//Auhtor model
const AuthorModel = mongoose.model('authors',AuthorSchema);

module.exports = AuthorModel;