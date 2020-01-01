import React from "react";

import Pokemon from "./Pokemon";

const ROW_ITEMS = 4;

function Pokedex(props) {
  const rows = [];
  let cols = [];
  let rowElement;
  let colElement;
  for (const [index, pokemon] of props.pokemons.entries()) {
    colElement = React.createElement(
      "div",
      { className: "col p-1", key: pokemon.name },
      <Pokemon name={pokemon.name} url={pokemon.url} />
    );
    cols.push(colElement);
    if ((index + 1) % ROW_ITEMS === 0) {
      rowElement = React.createElement(
        "div",
        { className: "row", key: Math.trunc(index / ROW_ITEMS) },
        cols
      );
      rows.push(rowElement);
      cols = [];
    }
  }
  return React.createElement("div", { className: "container" }, rows);
}

export default Pokedex;
