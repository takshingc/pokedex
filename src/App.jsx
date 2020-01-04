import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import PageBar from "./components/PageBar";
import Pokedex from "./components/Pokedex";

class App extends Component {
  state = {
    marginTop: 50
  };

  componentDidMount() {
    const marginTop = getMarginTop(10);
    this.setState({ marginTop });
  }

  render() {
    const { params } = this.props.match;
    const page = parseInt(params.page, 10);
    const { marginTop } = this.state;
    return (
      <div className="App">
        <div id="navbardiv">
          <NavBar />
        </div>
        <div className="container" style={{ marginTop }}>
          <Pokedex page={page} />
        </div>
        <PageBar page={page} />
      </div>
    );
  }
}

function getMarginTop(buffer) {
  return document.getElementById("navbardiv").firstChild.clientHeight + buffer;
}

export default App;
