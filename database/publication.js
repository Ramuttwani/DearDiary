const  mongoose = require("mongoose");

//publication schema
const PublicationSchema = mongoose.Schema({
    id:{type:Number,
        required:true},
    name:{type:String,
        required:true},
    books:[{type:String,
        minLength:8,
        maxLength:10,}],
});

//publication model
const PublicationModel = mongoose.model('publications',PublicationSchema);

module.exports = PublicationModel;