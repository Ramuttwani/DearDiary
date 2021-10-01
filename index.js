require("dotenv").config();

//Framework
const express = require("express");
const mongoose = require("mongoose");


//microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

//Initializing
const deardiary = express();
//Configurations
deardiary.use(express.json());

//establish database connection
mongoose.connect(process.env.MONGO_URL
).then(() => console.log("connnection established!!!")); 
//Initializing microservices
deardiary.use("/book",Books);
deardiary.use("/author",Authors);
deardiary.use("/publication",Publications)


deardiary.listen(3000, () => console.log("Server running😎!!!"));
