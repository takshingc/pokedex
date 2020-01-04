import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const pokeballUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

// const pokeballCategoryUrl = "https://pokeapi.co/api/v2/item-category/34/"

class PokemonCard extends Component {
  state = { isLoading: true };

  async componentDidMount() {
    const data = await getInfo(this.props.url);
    this.setState(data);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.url !== prevProps.url) {
      this.setState({ isLoading: true });
      const data = await getInfo(this.props.url);
      this.setState(data);
    }
  }

  render() {
    const { id, name, imageUrl, isLoading } = this.state;
    return (
      <Link to={`/pokemons/${id}`} style={{ textDecoration: "none" }}>
        <div className="card h-100">
          <img
            className="card-img-top mx-auto"
            src={isLoading ? pokeballUrl : imageUrl}
            alt={name}
            style={{ maxWidth: 140 }}
          />
          <div className="card-body">
            <h5 className="card-title badge badge-primary">{`No. ${id}`}</h5>
            <p className="card-text" style={{ textTransform: "capitalize" }}>
              {name}
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

async function getInfo(url) {
  if (url === null) {
    return;
  }
  const resp = await axios.get(url);
  const pokemon = resp.data;
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.front_default,
    isLoading: false
  };
}

export default PokemonCard;
