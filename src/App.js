import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

import AddNewLiterature from "./Components/AddNewLiteraure";
import LinesOfAuthor from "./Components/LinesOfAuthor";
import Literature from "./Components/Literature";
import About from "./Components/About";
import Favorites from "./Components/Favorites";
import HomePage from "./Components/Home";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: [],
      faves: [],
      checkes: false
    };
  }
  toRemoveItem = newItemArra => {
    let temp = this.state.faves.slice();
    const itemID = temp.find(newItemArra);
    //   const titleIndex = faves.indexOf(e)
    console.log(temp);
    console.log(itemID);

    temp.splice(itemID, 1);

    this.setState({
      faves: temp
    });
  };

  toFiltervalue = newFilterArra => {
    this.setState({
      author: newFilterArra
    });
  };
  // add title to fave page
  handleFaveToggle = title => {
    let faves = this.state.faves.slice();
    let titleIndex = faves.indexOf(title);

    if (titleIndex === -1) {
      this.setState({
        faves: [...this.state.faves, title]
      });
      console.log(`Adding To Favors`);
    }
  };
  // to add new title and object
  addNewItem = (newTitleTerm, newObjectTerm) => {
    this.setState({
      author: [
        ...this.state.author,
        { title: newTitleTerm, lines: newObjectTerm }
      ]
    });
  };
  //to Clear all fave
  clickToRemoveAll = () => {
    console.log("remove");

    this.setState({
      faves: []
    });
  };

  //to Remove select item

  // to Remove select item

  // clickToRemoveOne = (e, Removeone) => {
  //   console.log(e.target.checkes);
  //   //this.state.checkes
  //   console.log(e);
  //   const faves = this.state.faves.slice();
  //   const titleIndex = faves.indexOf(Removeone);

  //   console.log(faves);
  //   console.log(titleIndex);
  //   if (titleIndex !== -1) {
  //     faves.splice(titleIndex, 1);

  //   this.setState({
  //     faves: this.state.faves.filter(vlau => {
  //       return vlau !== Removeone;
  //     })
  //   });
  // };}

  deletedbook = book => {
    const faves = [...this.state.faves];
    const titleIndex = faves.indexOf(book);
    if (titleIndex !== -1) {
      faves.splice(titleIndex, 1);
    } else {
      console.log("not work");
    }
    this.setState({ faves });
  };

  // use  axios to get title and liens
  componentDidMount() {
    axios({
      method: "get",
      url: "http://poetrydb.org/author/William%20Shakespeare"
    })
      .then(succ => {
        console.log(succ, "succ");
        console.log(succ.data, "succ.data");

        this.setState({
          author: succ.data
        });
        console.log(this.state.author, "author");
      })
      .catch(error => {
        console.log(error, "error");
      });
  }

  render() {
    return (
      <div>
        <div>
          <header>William Shakespeare</header>
        </div>

        <Router>
          <div>
            <nav className="navbar navbar-dark bg-dark">
              <Link to="/Home">Home</Link>
              <Link to="/Literature">Literature</Link>

              {/* <Link to='/LinesOfAuthor'>LinesOfAuthor</Link> */}

              <Link to="/About">About</Link>

              <Link to="/Favorites"> My Favorites</Link>
            </nav>
            <Route exact path="/Home" component={HomePage} />

            <Route
              path="/AddNewLiterature"
              component={() => (
                <AddNewLiterature addNewItem={this.addNewItem} />
              )}
            />

            <Route
              path="/Literature"
              component={() => (
                <Literature
                  literatureBook={this.state.author}
                  handleFaveToggle={this.handleFaveToggle}
                  addToFav={this.addToFav}
                  clickToRemoveAll={this.clickToRemoveAll}
                  toFiltervalue={this.toFiltervalue}
                />
              )}
            />

            <Route
              path="/LinesOfAuthor"
              component={() => (
                <LinesOfAuthor literaturelines={this.state.author} />
              )}
            />
            <Route
              path="/Favorites"
              component={() => (
                <Favorites
                  faves={this.state.faves}
                  handleFaveToggle={this.handleFaveToggle}
                  clickToRemoveAll={this.clickToRemoveAll}
                  clickToRemoveOne={this.clickToRemoveOne}
                  checkes={this.state.checkes}
                  toRemoveItem={this.toRemoveItem}
                  deletedbook={this.deletedbook}
                />
              )}
            />

            <Route path="/About" component={About} />
          </div>
        </Router>
      </div>
    );
  }
}