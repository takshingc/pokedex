import axios from "axios";
import React, { Component } from "react";

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = { id: null, name: this.props.name, imageUrl: "" };
  }

  async componentDidMount() {
    const data = await getInfo(this.props.url);
    this.setState(data);
  }

  render() {
    const { id, name, imageUrl } = this.state;
    return (
      <div className="card">
        <img
          className="card-img-top mx-auto d-block"
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
  return { id: pokemon.order, imageUrl: pokemon.sprites.front_default };
}

export default Pokemon;
