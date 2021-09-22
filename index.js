//Framework
const express = require("express");

const database = require("./database/index");
//Initializing
const deardiary = express();
//Configurations
deardiary.use(express.json());
/*
Route             /
Description       get all books
Access            public
Parameters        none
Method            get
*/ 
deardiary.get("/",(req,res) => {
    return res.json({books : database.books});
} );
/*
Route             /is
Description       get specific book based on isbn
Access            public
Parameters        isbn
Method            get
*/ 
deardiary.get("/is/:isbn", (req,res) => {
    const getspecificBook = database.books.filter((book) => book.ISBN ===req.params.isbn );
    if(getspecificBook.length === 0){
        return res.json({error:`No book found for the isbn of ${req.params.isbn}`,
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
deardiary.get("/c/:category", (req,res) => {
    const getspecificBooks = database.books.filter((book) =>
     book.category.includes(req.params.category));
    if(getspecificBooks.length === 0){
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
     book.authors.includes(req.params.authors));
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
deardiary.get("/author", (req,res) => {
    return res.json({authors : database.authors});
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
     author.id == req.params.ID );
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
     publication.id == req.params.ID);
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
deardiary.post("/book/new", (req,res) => {
   const {newBook} = req.body;

   database.books.push(newBook);
   return res.json({books: database.books, message: "book wass added!"});
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
 
    database.authors.push(newAuthor);
    return res.json({authors: database.authors, message: "author wass added!"});
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
 
    database.publications.push(newPublication);
    return res.json({publications: database.publications, message: "publication was added!"});
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

deardiary.listen(3000, () => console.log("Server running😎!!!"));