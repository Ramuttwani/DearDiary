//initializing Express Router
const Router = require("express").Router();
//Database Models
const BookModel = require("../../database/book");
/*
Route             /
Description       get all books
Access            public
Parameters        none
Method            get
*/ 
Router.get("/", async (req,res) => {
  try{  const getAllBooks = await BookModel.find();
    return res.json({books : getAllBooks});}
    catch(error){return res.json({error:error.message});}
});
/*
Route             /is
Description       get specific book based on isbn
Access            public
Parameters        isbn
Method            get
*/ 
Router.get("/is/:isbn", async (req,res) => {
  try{ const getspecificBook = await BookModel.findOne({ISBN: req.params.isbn});
   if(!getspecificBook){
        return res.json({error:`No book found for the isbn of ${req.params.isbn}`
    });
    }
  return res.json({book : getspecificBook });}
  catch(error){return res.json({error:error.message});}
});
/*
Route             /c
Description       get specific books based on category
Access            public
Parameters        category
Method            get
*/ 
Router.get("/c/:category",async (req,res) => { 
  try{const getspecificBooks = await BookModel.findOne({category: req.params.category });
    if(!getspecificBooks){
        return res.json({error:`No book found for the category of ${req.params.category}`,
    });
    }
  return res.json({books : getspecificBooks});}
  catch(error){return res.json({error:error.message});}
});
/*
Route             /a
Description       get specific books based on authors
Access            public
Parameters        authors
Method            get
*/
Router.get("/a/:authors", async (req,res) => {
   try{ const getSpecificbooks = await BookModel.findOne({authors: req.params.authors});
     if(!getSpecificbooks){
        return res.json({error: `No book found for the author ${req.params.authors}`,
    });
     }
     return res.json({books : getSpecificbooks});  }
     catch(error){return res.json({error:error.message});} 
});
/*
Route             /book/new
Description       add new books
Access            public
Parameters        none
Method            post
*/
Router.post("/new",  async (req,res) => {
  try{
    const {newBook} = req.body;
    await BookModel.create(newBook);
    return res.json({ message: "book wass added!"});
  }catch(error){
    return res.json({error:error.message});
  }
   });
   /*
Route             /book/update/
Description       update title of a book
Access            public
Parameters        isbn
Method            put
*/
Router.put("/update/:isbn",async (req,res) => {
   try{ const updatedBook = await BookModel.findOneAndUpdate({ISBN: req.params.isbn},
        {title: req.body.bookTitle},{new:true});
    return res.json({books : updatedBook});}
    catch(error){return res.json({error:error.message});}
});
  /*
Route             /book/author/update
Description       update/add new author
Access            public
Parameters        isbn
Method            put
*/
Router.put("/author/update/:isbn", async(req,res) => {
   try{ const updatedBooks = await BookModel.findOneAndUpdate({ISBN: req.params.isbn},
        {$addToSet: {authors : req.body.newAuthor}},{new:true});
    const updatedAuthor = await AuthorModel.findOneAndUpdate({id: req.body.newAuthor},
        {$addToSet: {books: req.params.isbn}},{new:true});  
    return res.json({books: updatedBooks, authors: updatedAuthor,
         message: "New author was added"});}
         catch(error){return res.json({error:error.message});}
});
/*
Route             /book/delete
Description       delete a book
Access            public
Parameters        isbn
Method            delete
*/
Router.delete("/delete/:isbn",async(req,res) => {
   try{ const updatedBookDatabase = await BookModel.findOneAndDelete({ISBN: req.params.isbn});       
  return res.json({books: updatedBookDatabase});}
  catch(error){return res.json({error:error.message});}
  });
  /*
  Route             /book/delete/author
  Description       delete a author from the book
  Access            public
  Parameters        isbn,authorID
  Method            delete
  */
  Router.delete("/delete/author/:isbn/:authorID",async(req,res) => {
    try{ const updatedBook = await BookModel.findOneAndUpdate({ISBN:req.params.isbn},
      {$pull:{authors: parseInt(req.params.authorID)}},{new:true});
      const updatedAuthor = await AuthorModel.findOneAndUpdate({id: req.params.authorID},
          {$pull:{books: req.params.isbn}},{new:true});
     return res.json({books: updatedBook, authors: updatedAuthor, 
                        message:"author was deleted"});}
                        catch(error){return res.json({error:error.message});}
  });

  module.exports = Router; 