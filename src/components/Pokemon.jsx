import axios from "axios";
import React, { Component } from "react";

import { getMarginTop } from "./utils";

const env = process.env;
const API_URL = env.REACT_APP_API_URL;

class Pokemon extends Component {
  state = {};

  async componentDidMount() {
    const marginTop = getMarginTop("navbardiv", 10);
    this.setState({ marginTop });
    const { params } = this.props.match;
    const id = parseInt(params.id, 10);
    const data = await getInfo(id);
    this.setState(data);
  }

  render() {
    const { marginTop } = this.state;
    return (
      <div className="container" style={{ marginTop }}>
        {/* <h1>{this.state.id}</h1> */}
        <div className="row bg-light">
          <div className="col">
            <img className="d-block m-auto" src={this.state.imageFrontUrl} />
          </div>
          <div className="col">
            <img className="d-block m-auto" src={this.state.imageBackUrl} />
          </div>
        </div>
      </div>
    );
  }
}

async function getInfo(id) {
  if (id === null) {
    return;
  }
  const resp = await axios.get(`${API_URL}/${id}`);
  const pokemon = resp.data;
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map(item => item.type.name),
    imageFrontUrl: pokemon.sprites.front_default,
    imageBackUrl: pokemon.sprites.back_default,
    imageShinyFrontUrl: pokemon.sprites.front_shiny,
    imageShinyBackUrl: pokemon.sprites.back_shiny
  };
}

export default Pokemon;
