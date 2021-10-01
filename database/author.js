const mongoose = require("mongoose");

//author schema
const AuthorSchema = mongoose.Schema({
    id: {type:Number,
    required:true},
    name: {type:String,
    required:true},
    books:[{type: String,required:true}],
});

//Auhtor model
const AuthorModel = mongoose.model('authors',AuthorSchema);

module.exports = AuthorModel;