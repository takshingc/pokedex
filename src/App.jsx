import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import PageBar from "./components/PageBar";
import Pokedex from "./components/Pokedex";

const COOKIE_DURATION = 60 * 60;
const POKEMONS_PER_PAGE = 20;
const POKEMONS_OFFSET_BASE = 20;
const UPPER_PAGE_BOUND = 15;
const API_URL = "https://pokeapi.co/api/v2/pokemon";

class App extends Component {
  state = {
    page: 1,
    limit: POKEMONS_PER_PAGE,
    offsetBase: POKEMONS_OFFSET_BASE,
    upperPageBound: UPPER_PAGE_BOUND,
    marginTop: 50,
    pokemons: []
  };

  componentDidMount() {
    let page = getPage(document.cookie);
    this.setPageContent(page);
    const marginTop =
      document.getElementById("navbardiv").firstChild.clientHeight + 10;
    this.setState({ marginTop });
  }

  render() {
    const { pokemons, page, upperPageBound, marginTop } = this.state;
    return (
      <div className="App">
        <div id="navbardiv">
          <NavBar clickHandler={this.setPageContent} />
        </div>
        <div className="container" style={{ marginTop }}>
          <Pokedex pokemons={pokemons} />
        </div>

        <PageBar
          page={page}
          upperPageBound={upperPageBound}
          clickHandler={this.setPageContent}
        />
      </div>
    );
  }

  setPageContent = page => {
    let { limit, offsetBase } = this.state;
    const offset = offsetBase * (page - 1);

    axios
      .get(API_URL, {
        params: { limit, offset }
      })
      .then(resp => {
        const pokemons = resp.data.results;
        this.setState({ page, pokemons });
      });
    document.cookie = `page=${page};max-age=${COOKIE_DURATION}`;
  };
}

const getPage = cookieStr => {
  let cookies = cookieStr.split(";").map(c => c.trim().split("="));
  cookies = new Map(cookies);
  return cookies.has("page") ? parseInt(cookies.get("page"), 10) : 1;
};

export default App;
