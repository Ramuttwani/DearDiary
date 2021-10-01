const Router = require("express").Router();

const PublicationModel = require("../../database/publication");

/*
Route             /publication
Description       get all publications
Access            public
Parameters        none
Method            get
*/
Router.get("/", async (req,res) => {
  try{  const getAllPublications = await PublicationModel.find();
     return res.json({publications : getAllPublications});}
     catch(error){return res.json({error:error.message});}
});
/*
Route             /publication
Description       get specific publication
Access            public
Parameters        ID
Method            get
*/
Router.get("/:ID", async (req,res) => {
 try{  const getspecificPublication = await PublicationModel.findOne({id: req.params.ID});
    if(!getspecificPublication){
        return res.json({error:`No publication found for the name of ${req.params.ID}`,
    }); }
  return res.json({publication : getspecificPublication});}
  catch(error){return res.json({error:error.message});}
});
/*
Route             /publication/is
Description       get specific publication based on a book
Access            public
Parameters        isbn
Method            get
*/
Router.get("/is/:isbn", async (req,res) => {
  try{ const getspecificPublications = await PublicationModel.findOne({books: req.params.isbn});
   if(!getspecificPublications){
        return res.json({error : `No publication found for the book ${req.params.isbn}`,})
    }
    return res.json({publications :getspecificPublications});}
    catch(error){return res.json({error:error.message});}
});
 /*
Route             /publication/new
Description       add new publication
Access            public
Parameters        none
Method            post
*/
Router.post("/new",async (req,res) => {
   try{ const {newPublication} = req.body;
  await PublicationModel.create(newPublication);
    return res.json({ message: "publication wass added!"});}
    catch(error){return res.json({error:error.message});}
 });
/*
Route             /publication/update/
Description       update publication details(name)
Access            public
Parameters        ID
Method            put
*/
Router.put("/update/:ID",async(req,res) => {
  try{ const updatedPublication = await PublicationModel.findOneAndUpdate({id:req.params.ID},
    {name: req.body.publicationName},{new:true});
   return res.json({publications : updatedPublication});}
   catch(error){return res.json({error:error.message});}
});
/*
Route             /publication/book/update/
Description       update/add new book
Access            public
Parameters        isbn
Method            put
*/
Router.put("/book/update/:isbn", async (req,res) => {
 try{ const updatedPublication = await PublicationModel.findOneAndUpdate(
      {id:req.body.newPublication},{$addToSet:{books:req.params.isbn}},{new:true});
  const updatedBook = await BookModel.findOneAndUpdate({ISBN: req.params.isbn},
    {publication: req.body.newPublication},{new:true});
  return res.json({publications: updatedPublication,books:updatedBook,
    message: "New book has been added"});}
    catch(error){return res.json({error:error.message});} 
});
/*
Route             /publication/delete/book
Description       delete a book from the publication
Access            public
Parameters        isbn,pubID
Method            delete
*/
Router.delete("/delete/book/:isbn/:pubID",async(req,res) => {
   try{ const updatedPublication = await PublicationModel.findOneAndUpdate(
        {id: parseInt(req.params.pubID)},{$pull:{books: req.params.isbn}},{new:true});
    const updatedBook = await BookModel.findOneAndUpdate({ISBN:req.params.isbn},
        {publication: 0},{new:true});
   return res.json({books: updatedBook, publications: updatedPublication});}
   catch(error){return res.json({error:error.message});}
});
/*
Route             /publication/delete
Description       delete a publication
Access            public
Parameters        ID
Method            delete
*/
Router.delete("/delete/:ID",async(req,res) => {
try{ const updatedPublicationDatabase =  await PublicationModel.findOneAndDelete(
     {id: req.params.ID});   
    return res.json({publications: updatedPublicationDatabase});}
    catch(error){return res.json({error:error.message});}
});

module.exports = Router;