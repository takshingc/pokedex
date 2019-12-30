import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Pokedex from "./components/Pokedex";

const LAST_PAGE = 15;
const POKEMONS_PER_PAGE = 20;
const POKEMONS_OFFSET_BASE = 20;
const API_URL = "https://pokeapi.co/api/v2/pokemon";

class App extends Component {
  state = {
    page: 1,
    page_range: [1, 2, 3, 4, 5],
    limit: POKEMONS_PER_PAGE,
    offsetBase: POKEMONS_OFFSET_BASE,
    pokemons: []
  };

  async componentDidMount() {
    await this.setPokemons();
  }

  setPokemons = async (page = 1) => {
    const { limit, offsetBase } = this.state;
    const offset = offsetBase * (page - 1);

    // sync
    let page_range = this.state.page_range;
    let first_page = page_range[0];
    let last_page = page_range[page_range.length - 1];

    if (page > last_page) {
      last_page = Math.min(page + 4, LAST_PAGE);
      page_range = range(last_page - 4, last_page + 1);
    } else if (page < first_page) {
      first_page = Math.max(1, page - 4);
      page_range = range(first_page, first_page + 5);
    }

    // async
    let resp = await axios.get(API_URL, {
      params: { limit, offset }
    });
    let pokemons = await axios.all(
      resp.data.results.map(pokemon => getPokemonInfo(pokemon))
    );
    this.setState({ pokemons, page, page_range });
  };

  handleClick = async event => {
    const page = parseInt(event.target.id, 10);
    await this.setPokemons(page);
  };

  render() {
    const pages = this.state.page_range.map(number => {
      return (
        <li
          key={number}
          className={
            number === this.state.page ? "page-item active" : "page-item"
          }
        >
          <button
            className="page-link"
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </button>
        </li>
      );
    });

    return (
      <div className="App">
        <NavBar />
        <Pokedex pokemons={this.state.pokemons} />

        <nav aria-label="..." className="navbar">
          <ul className="pagination mx-auto">
            <li className={"page-item" + (this.state.page <= 1 && " disabled")}>
              <button
                className="page-link"
                tabIndex="-1"
                onClick={() => this.setPokemons(this.state.page - 1)}
              >
                Previous
              </button>
            </li>
            {pages}
            <li
              className={
                "page-item" + (this.state.page >= LAST_PAGE && " disabled")
              }
            >
              <button
                className="page-link"
                onClick={() => {
                  this.setPokemons(this.state.page + 1);
                }}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

async function getPokemonInfo(pokemon) {
  const { name, url } = pokemon;
  const resp = await axios.get(url);
  const info = await resp.data;
  return { name, imageUrl: info.sprites.front_default, id: info.order };
}

function range(start, end) {
  return [...Array(end).keys()].slice(start);
}

export default App;
