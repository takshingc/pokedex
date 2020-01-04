import React from "react";

import Pokemon from "./Pokemon";

const numCol = 4;

function Pokedex(props) {
  const createRows = pokemons => {
    const rows = [];
    let row = [];

    for (const [index, pokemon] of pokemons.entries()) {
      row.push(
        <div className="col p-1" key={index}>
          <Pokemon url={pokemon.url} />
        </div>
      );

      if (index % numCol === numCol - 1) {
        rows.push(
          <div className="row" key={(index + 1) / numCol}>
            {row}
          </div>
        );
        row = [];
      }
    }
    return rows;
  };

  return <div className="container">{createRows(props.pokemons)}</div>;
}

export default Pokedex;
