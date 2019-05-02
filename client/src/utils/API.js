import axios from "axios";

//creating/ naming functions to hit the api routes in routes folder
export default {

  //getBooks
  //when activated, this will go inside the routes folder, then go inside the api folder and will read the index.js file
  // inside the index.js file, it will read the "/google" route
  //then it will go to the google.js file and read the googleController.findAll method that we created
  //the googleController findAll method is located inside googleController.js file inside the controllers folder
  //this method then activates the findAll method and requires axios to hit the google API /url 
  //then this returns data which we filtered so we can get what data we just want/ need
  getBooks: function(q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },

//getSaveBooks
//on pageload of the /saved link, this will be activated... 
//when activated, this will go inside the routes folder, then go inside the api folder and will read the index.js file
//inside the index.js file, it will read the "/books" route
//then it will read the book.js file and read the bookController.js and activates the functions that finds all the books stored in the database
  getSavedBooks: function() {
    return axios.get("/api/books");
  },

  
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
