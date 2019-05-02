const express = require("express");

const mongoose = require("mongoose");

//Getting all the routes; index.js, api folder (books.js, google.js)
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//accessing the index.html
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//accessing the routes folder and referencing the index.js inside of it
app.use(routes);

//creating the database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/googlebooks",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
