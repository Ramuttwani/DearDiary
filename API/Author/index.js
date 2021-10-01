const Router= require("express").Router();

const AuthorModel = require("../../database/author");

/*
Route             /author
Description       get all authors
Access            public
Parameters        none
Method            get
*/
Router.get("/", async (req,res) => {
   try{ const getAllAuthors = await AuthorModel.find();
    return res.json({authors : getAllAuthors});}
    catch(error){return res.json({error:error.message});}
});
/*
Route             /author
Description       get specific authors based on ID
Access            public
Parameters        ID
Method            get
 */
Router.get("/:ID", async (req,res) => {
    try{const getspecificAuthor = await AuthorModel.findOne({ id: req.params.ID});
    if(!getspecificAuthor){
        return res.json({error:`No author found for the name of ${req.params.ID}`,
    });
    }
  return res.json({author : getspecificAuthor});}
  catch(error){return res.json({error:error.message});}
});
/*
Route             /author/is
Description       get the lists of authors based on a book
Access            public
Parameters        isbn
Method            get
*/
Router.get("/is/:isbn",async (req,res) => {
   try{ const getspecificAuthors = await AuthorModel.findOne({books: req.params.isbn});
      if(!getspecificAuthors){
        return res.json({error : `No author found for the book ${req.params.isbn}`,})
    }
    return res.json({authors :getspecificAuthors});}
    catch(error){return res.json({error:error.message});}
});
/*
Route             /author/new
Description       add new author
Access            public
Parameters        none
Method            post
*/
Router.post("/new", async(req,res) => {
    try{const {newAuthor} = req.body;
   await AuthorModel.create(newAuthor);
    return res.json({ message: "author wass added!"});}
    catch(error){return res.json({error:error.message});}
 });
 /*    
Route             /author/update/
Description       update author details(name)
Access            public
Parameters        ID
Method            put
*/
Router.put("/update/:ID",async(req,res) => {
   try{ const updatedAuthor = await AuthorModel.findOneAndUpdate({id: req.params.ID},
        {name: req.body.authorName},{new:true});
     return res.json({authors : updatedAuthor});}
     catch(error){return res.json({error:error.message});}
});
/*
Route             /author/delete
Description       delete an author
Access            public
Parameters        ID
Method            delete
*/
Router.delete("/delete/:ID",async(req,res) => {
   try{ const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({id: req.params.ID});
    return res.json({authors: updatedAuthorDatabase});}
    catch(error){return res.json({error:error.message});}
});

module.exports = Router ;