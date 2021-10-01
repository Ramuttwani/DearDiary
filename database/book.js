const mongoose = require("mongoose");
//creating book schema
const BookSchema = mongoose.Schema({    
        ISBN : {
            type: String,
            required:true,
            minLength:8,
            maxLength:10,
        },
        title :{type: String,
        required:true,
        minLength:3,
        maxLength:50,}
        ,
        authors: [Number] ,
        language: String,
        pubDate: String,
        numofPage:Number,
        category: [String] ,
        publication: Number,
    });

//creating book model
const BookModel = mongoose.model('books',BookSchema);

module.exports = BookModel;
