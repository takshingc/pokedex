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
    pokemons: []
  };

  componentDidMount() {
    let page = getPage(this.state.page);
    this.setPageContent(page);
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Pokedex pokemons={this.state.pokemons} />
        <PageBar
          page={this.state.page}
          upperPageBound={this.state.upperPageBound}
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

function getPage(page) {
  let cookies = document.cookie.split(";").map(j => j.trim().split("="));
  cookies = new Map(cookies);
  return cookies.has("page") ? parseInt(cookies.get("page"), 10) : page;
}

export default App;
