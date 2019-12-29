import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Pokedex from "./components/Pokedex";

const POKEMONS_PER_PAGE = 20;
const POKEMONS_OFFSET_BASE = 20;
const API_URL = "https://pokeapi.co/api/v2/pokemon";

class App extends Component {
  state = {
    page: 1,
    page_range: [1, 2, 3, 4, 5],
    apiUrl: API_URL,
    limit: POKEMONS_PER_PAGE,
    offsetBase: POKEMONS_OFFSET_BASE,
    pokemons: []
  };

  componentDidMount() {
    this.setPokemons();
  }

  setPokemons = (page = 1) => {
    const { apiUrl, limit, offsetBase } = this.state;
    const offset = offsetBase * (page - 1);

    axios
      .get(apiUrl, {
        params: { limit, offset }
      })
      .then(resp => {
        const pokemons_resp = resp.data.results;
        axios
          .all(pokemons_resp.map(pokemon => getPokemonInfo(pokemon)))
          .then(pokemons => {
            const range = this.state.page_range;
            const first_page = range[0];
            let last_page = range[range.length - 1];

            let page_range = range;
            if (page >= last_page && last_page <= 13) {
              last_page = page + 5 >= 15 ? 16 : page + 5;
              page_range = [...Array(last_page).keys()].slice(
                last_page - 5,
                last_page
              );
            }
            // else if (page <= first_page && page >= 1) {
            //   page_range = [...Array(page).keys()].slice(page - 5, page);
            // }
            this.setState({ pokemons, page, page_range });
          });
      });
  };

  handleClick = event => {
    const page = parseInt(event.target.id, 10);
    this.setPokemons(page);
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
        <Pokedex {...this.state} />

        <nav aria-label="..." className="navbar">
          <ul className="pagination mx-auto">
            <li
              className={
                this.state.page === 1 ? "page-item disabled" : "page-item"
              }
            >
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
                this.state.page === 15 ? "page-item disabled" : "page-item"
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

export default App;
