import React, { Component } from "react";
import axios from "axios";

import Pokemon from "./Pokemon";
import packageJson from "../../package.json";

class Pokedex extends Component {
  state = { pokemons: [] };

  async componentDidMount() {
    const pokemons = await getPokemons();
    this.setState({ pokemons });
  }

  render() {
    return (
      <table>
        <tbody>
          {this.state.pokemons.map(info => (
            <tr key={info.name}>
              <Pokemon {...info} />
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

function getResourceUrl(url) {
  const pattern = new RegExp(`^${packageJson.proxy}([/a-z0-9]+)$`);
  const match = url.match(pattern);
  if (match != null) {
    return match[1];
  } else {
    return "";
  }
}

async function getPokemonInfo(pokemon) {
  const { name, url } = pokemon;
  const resp = await axios.get(getResourceUrl(url));
  const imageUrl = await resp.data.sprites.front_default;
  return { name, imageUrl };
}

async function getPokemons(path = "/pokemon") {
  const resp = await axios.get(path);
  const pokemons = await axios.all(
    resp.data.results.map(pokemon => getPokemonInfo(pokemon))
  );
  return pokemons;
}

export default Pokedex;
