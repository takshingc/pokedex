import React from "react";

import Pokemon from "./Pokemon";

function Pokedex(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col alert alert-info" style={{ width: "100%" }}>
          Pokemon
        </div>
      </div>
      <div className="row">
        {props.pokemons.map(pokemon => (
          <div key={pokemon.name} className="col-3">
            <Pokemon {...pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokedex;
