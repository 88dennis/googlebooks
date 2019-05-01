const router = require("express").Router();
const googleController = require("../../controllers/googleController");

router
  .route("/")
  // search all
  .get(googleController.findAll);

module.exports = router;
