import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import PageBar from "./components/PageBar";
import Pokedex from "./components/Pokedex";

const env = process.env;
const COOKIE_DURATION = env.REACT_APP_COOKIE_DURATION;

class App extends Component {
  state = {
    page: 1,
    marginTop: 50
  };

  componentDidMount() {
    let page = getPage(this.state.page);
    const marginTop = getMarginTop(10);
    this.setState({ page, marginTop });
  }

  render() {
    const { page, marginTop } = this.state;
    return (
      <div className="App">
        <div id="navbardiv">
          <NavBar clickHandler={this.setPage} />
        </div>
        <div className="container" style={{ marginTop }}>
          <Pokedex page={page} />
        </div>
        <PageBar page={page} clickHandler={this.setPage} />
      </div>
    );
  }

  setPage = page => {
    this.setState({ page });
    document.cookie = `page=${page};max-age=${COOKIE_DURATION}`;
  };
}

function getPage(page) {
  let cookies = document.cookie.split(";").map(c => c.trim().split("="));
  cookies = new Map(cookies);
  return cookies.has("page") ? parseInt(cookies.get("page"), 10) : page;
}

function getMarginTop(buffer) {
  return document.getElementById("navbardiv").firstChild.clientHeight + buffer;
}

export default App;
