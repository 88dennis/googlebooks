import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

//setting the state of the Home page
//books is an array where you populate data in upon input in the search bar using the getBooks method during an onClick
class Home extends Component {
  state = {
    books: [],
    q: "",
    message: "Search For A Book To Begin!"
  };

  //this handles the text you type inside the search input field in the form component
  //you pass this property also into the form component
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

//this method is getting the data from the google API via the input field and what you query
//this will be called by the handleFormSubmit to search the google API and check if the query you typed exists in there; if it exists, it will send data back and updates our books array and displays it accordingly using the List component below in the render; if it does not exist in the google API, it will throw an error and just set the state again to an empty array
  getBooks = () => {
    API.getBooks(this.state.q)
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      .catch(() =>
        this.setState({
          books: [],
          message: "No New Books Found, Try a Different Query"
        })
      );
  };
//this is the the property you pass in to the onClick function in the form component to execute your query; this triggers your getBooks method
//this gets the value of what you typed in the input field
  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  };

  //this handleBookSave is the property you pass in to the save button
  //this will do a post method as defined in the API.js in utils folder
  //this will post the data with this specific id you clicked on and save it in the database
  //onClick -> utils/API.js (feeds saveBook post method)->  routes/ api/ .post(bookController.create) -> controllers/ bookController.js (create: function)
  //then will do a getBook method again to update the page and filters it if the database includes that book, dont show it in the page anymore
  handleBookSave = id => {
    const book = this.state.books.find(book => book.id === id);
// this is the data structure we feed in to the database based on its id. this saved book is not being rendered in this page
    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getBooks());
  };
//renders the home page
  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Books of Interest.</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Book Search" icon="far fa-book">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      authors={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Home;
