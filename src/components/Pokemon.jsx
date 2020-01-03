import axios from "axios";
import React, { Component } from "react";

class Pokemon extends Component {
  state = { id: null, name: "", imageUrl: "" };

  async componentDidMount() {
    const data = await getInfo(this.props.url);
    this.setState(data);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.url !== prevProps.url) {
      const data = await getInfo(this.props.url);
      this.setState(data);
    }
  }

  render() {
    const { id, name, imageUrl } = this.state;
    return (
      <div className="card h-100">
        <img
          className="card-img-top mx-auto"
          src={imageUrl}
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
    );
  }
}

async function getInfo(url) {
  const resp = await axios.get(url);
  const pokemon = resp.data;
  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUrl: pokemon.sprites.front_default
  };
}

export default Pokemon;
