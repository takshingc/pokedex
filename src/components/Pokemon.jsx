import axios from "axios";
import React, { Component } from "react";

import { getMarginTop } from "./utils";

const env = process.env;
const API_URL = env.REACT_APP_API_URL;
const CRY_URL = env.REACT_APP_POKEMON_CRY_URL;

const VOLUME = 0.3;

class Pokemon extends Component {
  state = {};

  async componentDidMount() {
    const marginTop = getMarginTop("navbardiv", 10);
    const { params } = this.props.match;
    const id = parseInt(params.id, 10);
    await this.setState({ marginTop, id });
    this.setInfo(id);
  }

  render() {
    const { marginTop } = this.state;
    return (
      <div className="container" style={{ marginTop }}>
        <audio
          ref={a => (this.cry = a)}
          src={`${CRY_URL}/${this.state.id}.mp3`}
          volume={0.1}
        />
        <div className="row bg-light">
          <div className="col">
            <img
              className="d-block m-auto"
              src={this.state.imageFrontUrl}
              alt="Front"
            />
          </div>
          <div className="col">
            <img
              className="d-block m-auto"
              src={this.state.imageBackUrl}
              alt="Back"
            />
          </div>
        </div>
      </div>
    );
  }

  setInfo = async id => {
    if (id === null) {
      return;
    }
    const resp = await axios.get(`${API_URL}/${id}`);
    const info = resp.data;
    this.cry.volume = VOLUME;
    await this.cry.play();
    this.setState({
      name: info.name,
      types: info.types.map(item => item.type.name),
      imageFrontUrl: info.sprites.front_default,
      imageBackUrl: info.sprites.back_default,
      imageShinyFrontUrl: info.sprites.front_shiny,
      imageShinyBackUrl: info.sprites.back_shiny
    });
  };
}

export default Pokemon;
