const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

//accessing the folder api (books.js, google.js)
router.use("/api", apiRoutes);

//accessing the client folder (index.html)
router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

module.exports = router;
