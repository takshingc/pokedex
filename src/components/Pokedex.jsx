import axios from "axios";
import React, { Component } from "react";

import PokemonCard from "./PokemonCard";

const env = process.env;
const API_URL = env.REACT_APP_API_URL;
const LIMIT = env.REACT_APP_POKEMONS_PER_PAGE;
const OFFSET_BASE = env.REACT_APP_POKEMONS_OFFSET_BASE;

const NUM_COL = 4;

class Pokedex extends Component {
  state = { pokemons: [] };

  async componentDidMount() {
    const { page } = this.props;
    await this.setContent(page);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { page } = this.props;
    if (prevProps.page !== page) {
      await this.setContent(page);
    }
  }

  render() {
    const { pokemons } = this.state;

    const rows = [];
    let row = [];

    for (const [index, pokemon] of pokemons.entries()) {
      row.push(
        <div className="col p-1" key={index}>
          <PokemonCard url={pokemon.url} />
        </div>
      );

      if (index % NUM_COL === NUM_COL - 1) {
        rows.push(
          <div className="row" key={(index + 1) / NUM_COL}>
            {row}
          </div>
        );
        row = [];
      }
    }

    return <div className="container">{rows}</div>;
  }

  setContent = async page => {
    const offset = OFFSET_BASE * (page - 1);
    const resp = await axios.get(API_URL, { params: { LIMIT, offset } });
    const pokemons = resp.data.results;
    this.setState({ pokemons });
  };
}

export default Pokedex;
