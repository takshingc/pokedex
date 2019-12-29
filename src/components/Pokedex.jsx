import React, { Component } from "react";
import axios from "axios";

import Pokemon from "./Pokemon";

class Pokedex extends Component {
  state = { pokemons: [] };

  async componentDidMount() {
    const pokemons = await getPokemons();
    this.setState({ pokemons });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col alert alert-info" style={{ width: "100%" }}>
            Pokemon
          </div>
        </div>
        <div className="row">
          {this.state.pokemons.map(info => (
            <div key={info.name} className="col-3">
              <Pokemon {...info} />
            </div>
          ))}
        </div>
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

async function getPokemons(path = "https://pokeapi.co/api/v2/pokemon") {
  const resp = await axios.get(path);
  const pokemons = await axios.all(
    resp.data.results.map(pokemon => getPokemonInfo(pokemon))
  );
  return pokemons;
}

export default Pokedex;
