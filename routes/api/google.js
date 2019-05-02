const router = require("express").Router();
const googleController = require("../../controllers/googleController");

//using the  methods/ functions we made inside the googleController.js

router
  .route("/")
  // search all method
  .get(googleController.findAll);

module.exports = router;
