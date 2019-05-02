const path = require("path");
const router = require("express").Router();
const bookRoutes = require("./books");
const googleRoutes = require("./google");

//naming the routes; using the books.js and google.js routes file

//the API.js will hit these routes once activitated by client/ user

router.use("/books", bookRoutes);

router.use("/google", googleRoutes);

module.exports = router;
