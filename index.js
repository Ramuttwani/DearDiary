require("dotenv").config();

//Framework
const express = require("express");
const mongoose = require("mongoose");
const database = require("./database/index");
///models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
//Initializing
const deardiary = express();
//Configurations
deardiary.use(express.json());

//establish database connection
mongoose.connect(process.env.MONGO_URL
).then(() => console.log("connnection established!!!")); 
/*
Route             /
Description       get all books
Access            public
Parameters        none
Method            get
*/ 
deardiary.get("/", async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json({books : getAllBooks});
});
/*
Route             /is
Description       get specific book based on isbn
Access            public
Parameters        isbn
Method            get
*/ 
deardiary.get("/is/:isbn", async (req,res) => {
   const getspecificBook = await BookModel.findOne({ISBN: req.params.isbn});
   if(!getspecificBook){
        return res.json({error:`No book found for the isbn of ${req.params.isbn}`
    });
    }
  return res.json({book : getspecificBook });
});
/*
Route             /c
Description       get specific books based on category
Access            public
Parameters        category
Method            get
*/ 
deardiary.get("/c/:category",async (req,res) => { 
  const getspecificBooks = await BookModel.findOne({category: req.params.category });
    if(!getspecificBooks){
        return res.json({error:`No book found for the category of ${req.params.category}`,
    });
    }
  return res.json({books : getspecificBooks});
});
/*
Route             /a
Description       get specific books based on authors
Access            public
Parameters        authors
Method            get
*/
deardiary.get("/a/:authors", async (req,res) => {
    const getSpecificbooks = await BookModel.findOne({authors: req.params.authors});
     if(!getSpecificbooks){
        return res.json({error: `No book found for the author ${req.params.authors}`,
    });
     }
     return res.json({books : getSpecificbooks});   
});
/*
Route             /author
Description       get all authors
Access            public
Parameters        none
Method            get
*/
deardiary.get("/author", async (req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({authors : getAllAuthors});
});
/*
Route             /author
Description       get specific authors based on ID
Access            public
Parameters        ID
Method            get
 */
deardiary.get("/author/:ID", async (req,res) => {
    const getspecificAuthor = await AuthorModel.findOne({ id: req.params.ID});
    if(!getspecificAuthor){
        return res.json({error:`No author found for the name of ${req.params.ID}`,
    });
    }
  return res.json({author : getspecificAuthor});
});
/*
Route             /author
Description       get the lists of authors based on a book
Access            public
Parameters        isbn
Method            get
*/
deardiary.get("/authors/:isbn",async (req,res) => {
    const getspecificAuthors = await AuthorModel.findOne({ISBN: req.params.isbn});
      if(!getspecificAuthors){
        return res.json({error : `No author found for the book ${req.params.isbn}`,})
    }
    return res.json({authors :getspecificAuthors});
} );
/*
Route             /publications
Description       get all publications
Access            public
Parameters        none
Method            get
*/
deardiary.get("/publications", async (req,res) => {
    const getAllPublications = await PublicationModel.find();
     return res.json({publications : getAllPublications});
});
/*
Route             /publication
Description       get specific publication
Access            public
Parameters        ID
Method            get
*/
deardiary.get("/publication/:ID", async (req,res) => {
   const getspecificPublication = await PublicationModel.findOne({id: req.params.ID});
    if(!getspecificPublication){
        return res.json({error:`No publication found for the name of ${req.params.ID}`,
    });
    }
  return res.json({publication : getspecificPublication});
});
/*
Route             /publications
Description       get specific publication based on a book
Access            public
Parameters        isbn
Method            get
*/
deardiary.get("/publications/:isbn", async (req,res) => {
   const getspecificPublications = await PublicationModel.findOne({ISBN: req.params.isbn});
   if(!getspecificPublications){
        return res.json({error : `No publication found for the book ${req.params.isbn}`,})
    }
    return res.json({publications :getspecificPublications});
} );
/*
Route             /book/new
Description       add new books
Access            public
Parameters        none
Method            post
*/
deardiary.post("/book/new",  (req,res) => {
   const {newBook} = req.body;
    BookModel.create(newBook);
    return res.json({ message: "book wass added!"});
});
/*
Route             /author/new
Description       add new author
Access            public
Parameters        none
Method            post
*/
deardiary.post("/author/new", (req,res) => {
    const {newAuthor} = req.body;
    AuthorModel.create(newAuthor);
    return res.json({ message: "author wass added!"});
 });
 /*
Route             /publication/new
Description       add new publication
Access            public
Parameters        none
Method            post
*/
deardiary.post("/publication/new", (req,res) => {
    const {newPublication} = req.body;
   PublicationModel.create(newPublication);
    return res.json({ message: "publication wass added!"});
 });
  /*
Route             /book/update/
Description       update title of a book
Access            public
Parameters        isbn
Method            put
*/
deardiary.put("/book/update/:isbn",async (req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate({ISBN: req.params.isbn},
        {title: req.body.bookTitle},{new:true});
    return res.json({books : updatedBook});
});
  /*
Route             /book/author/update
Description       update/add new author
Access            public
Parameters        isbn
Method            put
*/
deardiary.put("/book/author/update/:isbn", async(req,res) => {
    const updatedBooks = await BookModel.findOneAndUpdate({ISBN: req.params.isbn},
        {$addToSet: {authors : req.body.newAuthor}},{new:true});
    const updatedAuthor = await AuthorModel.findOneAndUpdate({id: req.body.newAuthor},
        {$addToSet: {books: req.params.isbn}},{new:true});  
    return res.json({books: updatedBooks, authors: updatedAuthor,
         message: "New author was added"});
});
/*    
Route             /author/update/
Description       update author details(name)
Access            public
Parameters        ID
Method            put
*/
deardiary.put("/author/update/:ID",async(req,res) => {
    const updatedAuthor = await AuthorModel.findOneAndUpdate({id: req.params.ID},
        {name: req.body.authorName},{new:true});
     return res.json({authors : updatedAuthor});
});
/*
Route             /publication/update/
Description       update publication details(name)
Access            public
Parameters        ID
Method            put
*/
deardiary.put("/publication/update/:ID",async(req,res) => {
   const updatedPublication = await PublicationModel.findOneAndUpdate({id:req.params.ID},
    {name: req.body.publicationName},{new:true});
   return res.json({publications : updatedPublication});
});
/*
Route             /publication/book/update/
Description       update/add new book
Access            public
Parameters        isbn
Method            put
*/
deardiary.put("/publication/book/update/:isbn", async (req,res) => {
  const updatedPublication = await PublicationModel.findOneAndUpdate(
      {id:req.body.newPublication},{$addToSet:{books:req.params.isbn}},{new:true});
  const updatedBook = await BookModel.findOneAndUpdate({ISBN: req.params.isbn},
    {publication: req.body.newPublication},{new:true});
  return res.json({publications: updatedPublication,books:updatedBook,
    message: "New book has been added"}); 
});
/*
Route             /book/delete
Description       delete a book
Access            public
Parameters        isbn
Method            delete
*/
deardiary.delete("/book/delete/:isbn",async(req,res) => {
  const updatedBookDatabase = await BookModel.findOneAndDelete({ISBN: req.params.isbn});       
return res.json({books: updatedBookDatabase});
});
/*
Route             /book/delete/author
Description       delete a author from the book
Access            public
Parameters        isbn,authorID
Method            delete
*/
deardiary.delete("/book/delete/author/:isbn/:authorID",async(req,res) => {
   const updatedBook = await BookModel.findOneAndUpdate({ISBN:req.params.isbn},
    {$pull:{authors: parseInt(req.params.authorID)}},{new:true});
    const updatedAuthor = await AuthorModel.findOneAndUpdate({id: req.params.authorID},
        {$pull:{books: req.params.isbn}},{new:true});
   return res.json({books: updatedBook, authors: updatedAuthor, 
                      message:"author was deleted"});
});
/*
Route             /author/delete
Description       delete an author
Access            public
Parameters        ID
Method            delete
*/
deardiary.delete("/author/delete/:ID",async(req,res) => {
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({id: req.params.ID});
    return res.json({authors: updatedAuthorDatabase});
});
/*
Route             /publication/delete/book
Description       delete a book from the publication
Access            public
Parameters        isbn,pubID
Method            delete
*/
deardiary.delete("/publication/delete/book/:isbn/:pubID",async(req,res) => {
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {id: parseInt(req.params.pubID)},{$pull:{books: req.params.isbn}},{new:true});
    const updatedBook = await BookModel.findOneAndUpdate({ISBN:req.params.isbn},
        {publication: 0},{new:true});
   return res.json({books: updatedBook, publications: updatedPublication});
});
/*
Route             /publication/delete
Description       delete a publication
Access            public
Parameters        ID
Method            delete
*/
deardiary.delete("/publication/delete/:ID",async(req,res) => {
 const updatedPublicationDatabase =  await PublicationModel.findOneAndDelete(
     {id: req.params.ID});   
    return res.json({publications: updatedPublicationDatabase});
});

deardiary.listen(3000, () => console.log("Server running😎!!!"));
