import React from "react";

import Pokemon from "./Pokemon";

function Pokedex(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">Pokemon</div>
      </div>
      <div className="row">
        {props.pokemons.map(pokemon => (
          <div key={pokemon.name} className="col-3">
            <Pokemon name={pokemon.name} url={pokemon.url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokedex;
