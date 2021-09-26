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
   // const getspecificBook = database.books.findOne((book) => book.ISBN === req.params.isbn );
    if(!getspecificBook){
        return res.json({error:`No book found for the isbn of ${req.params.isbn}`
    });
    }
  return res.json({book : getspecificBook});
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
    // const getspecificBooks = database.books.filter((book) =>
     //book.category.includes(req.params.category));
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
deardiary.get("/a/:authors", (req,res) => {
     const getSpecificbooks = database.books.filter((book) => 
     book.authors.includes(parseInt(req.params.authors)));
     if(getSpecificbooks.length === 0){
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
deardiary.get("/author/:ID", (req,res) => {
    const getspecificAuthor = database.authors.filter((author) =>
     author.id === parseInt(req.params.ID) );
    if(getspecificAuthor.length === 0){
        return res.json({error:`No author found for the name of ${req.params.ID}`,
    });
    }
  return res.json({book : getspecificAuthor});
});
/*
Route             /author
Description       get the lists of authors based on a book
Access            public
Parameters        isbn
Method            get
*/
deardiary.get("/authors/:isbn",(req,res) => {
    const getspecificAuthors = database.authors.filter((author) => 
    author.books.includes(req.params.isbn));
    if(getspecificAuthors.length === 0){
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
deardiary.get("/publications", (req,res) => {
     return res.json({publications : database.publications});
});
/*
Route             /publication
Description       get specific publication
Access            public
Parameters        ID
Method            get
*/
deardiary.get("/publication/:ID", (req,res) => {
    const getspecificPublication = database.publications.filter((publication) =>
     publication.id === parseInt(req.params.ID));
     if(getspecificPublication.length === 0){
        return res.json({error:`No publication found for the name of ${req.params.ID}`,
    });
    }
  return res.json({book : getspecificPublication});
});
/*
Route             /publications
Description       get specific publication based on a book
Access            public
Parameters        isbn
Method            get
*/
deardiary.get("/publications/:isbn",(req,res) => {
    const getspecificPublications = database.publications.filter((publication) => 
    publication.books.includes(req.params.isbn));
    if(getspecificPublications.length === 0){
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
deardiary.post("/book/new", async (req,res) => {
   const {newBook} = req.body;
    BookModel.create(newBook);
  // database.books.push(newBook);
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
   // database.authors.push(newAuthor);
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
   // database.publications.push(newPublication);
    return res.json({ message: "publication wass added!"});
 });
  /*
Route             /book/update/
Description       update title of a book
Access            public
Parameters        isbn
Method            put
*/
deardiary.put("/book/update/:isbn",(req,res) => {
   database.books.forEach((book) => {
       if(book.ISBN ===req.params.isbn){
           book.title = req.body.bookTitle;
           return;
       }
   });
   return res.json({books : database.books});
});
  /*
Route             /book/author/update
Description       update/add new author
Access            public
Parameters        isbn
Method            put
*/
deardiary.put("/book/author/update/:isbn", (req,res) => {
     database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
          return book.authors.push(req.body.newAuthor)};
        });
    database.authors.forEach((author) =>{
        if(author.id === req.body.newAuthor)
        return author.books.push(req.params.isbn); 
    });    
    return res.json({books: database.books, authors: database.authors,
         message: "New author was added"});
});
/*
Route             /author/update/
Description       update author details(name)
Access            public
Parameters        ID
Method            put
*/
deardiary.put("/author/update/:ID",(req,res) => {
     database.authors.forEach((author) => {
       if(author.id == req.params.ID)  {
           author.name = req.body.authorName;
           return;
       } 
     });
     return res.json({authors : database.authors});
});
/*
Route             /publication/update/
Description       update publication details(name)
Access            public
Parameters        ID
Method            put
*/
deardiary.put("/publication/update/:ID",(req,res) => {
     database.publications.forEach((publication) => {
       if(publication.id == req.params.ID)  {
        publication.name = req.body.publicationName;
           return;
       } 
     });
     return res.json({publications : database.publications});
});
/*
Route             /publication/book/update/
Description       update/add new book
Access            public
Parameters        isbn
Method            put
*/
deardiary.put("/publication/book/update/:isbn",(req,res) => {
    database.publications.forEach((publication) =>{
     if(publication.id === req.body.pubID){
         return publication.books.push(req.params.isbn)};
    }); 
    
    database.books.forEach((book) => {
     if(book.ISBN === req.params.isbn){
         book.publication = req.body.pubID;
     return ;}
    });  
    return res.json({publications: database.publications,books: database.books,
    message: "New book has been added"}); 
});
/*
Route             /book/delete
Description       delete a book
Access            public
Parameters        isbn
Method            delete
*/
deardiary.delete("/book/delete/:isbn",(req,res) => {
        const updatedBookDatabase = database.books.filter((book) => 
          book.ISBN !== req.params.isbn
        );
        database.books = updatedBookDatabase;
        return res.json({books: database.books});
});
/*
Route             /book/delete/author
Description       delete a author from the book
Access            public
Parameters        isbn,authorID
Method            delete
*/
deardiary.delete("/book/delete/author/:isbn/:authorID",(req,res) => {
   database.books.forEach((book) =>{
       if(book.ISBN === req.params.isbn){
           const newAuthorList = book.authors.filter((author) => 
           author !== parseInt(req.params.authorID));
           book.authors = newAuthorList;
           return;
       }
   });
   database.authors.forEach((author) => {
       if(author.id === parseInt(req.params.authorID)){
           const newBooksList = author.books.filter((book) =>
           book !== req.params.isbn);
           author.books = newBooksList;
           return;
       }
   });
   return res.json({books: database.books, authors: database.authors, 
                      message:"author was deleted"});
});
/*
Route             /author/delete
Description       delete an author
Access            public
Parameters        ID
Method            delete
*/
deardiary.delete("/author/delete/:ID",(req,res) => {
    const updatedAuthorDatabase = database.authors.filter((author) => 
    author.id !== parseInt(req.params.ID)
    );
    database.authors = updatedAuthorDatabase;
    return res.json({authors: database.authors});
});
/*
Route             /publication/delete/book
Description       delete a book from the publication
Access            public
Parameters        isbn,pubID
Method            delete
*/
deardiary.delete("/publication/delete/book/:isbn/:pubID",(req,res) => {
    database.publications.forEach((publication) =>{
       if(publication.id === parseInt(req.params.pubID)){
           const newBooksList = publication.books.filter((book) =>
           book !== req.params.isbn);
           publication.books = newBooksList;
           return;
       }
    });
    database.books.forEach((book) => {
      if(book.ISBN === req.params.isbn){
          book.publication = 0;
          return;
      }  
    });
   return res.json({books: database.books, publications: database.publications});
});
/*
Route             /publication/delete
Description       delete a publication
Access            public
Parameters        ID
Method            delete
*/
deardiary.delete("/publication/delete/:ID",(req,res) => {
    const updatedPublicationDatabase = database.publications.filter((publication) => 
    publication.id !== parseInt(req.params.ID)
    );
    database.publications = updatedPublicationDatabase;
    return res.json({publications: database.publications});
});

deardiary.listen(3000, () => console.log("Server running😎!!!"));
