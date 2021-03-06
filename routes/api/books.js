const router = require("express").Router();

//REQUIRING the bookController
const bookController = require("../../controllers/bookController");

//using the  methods/ functions we made inside the bookController.js

//setting methods to hit the database
router.route("/")
//get method to capture all in the database

  .get(bookController.findAll)
  //post method to create a book in the database
  .post(bookController.create);

router
  .route("/:id")
//get method to capture  a data by id in the database
  .get(bookController.findById)
  
  //update database
  .put(bookController.update)

  //remove a book
  .delete(bookController.remove);

module.exports = router;
