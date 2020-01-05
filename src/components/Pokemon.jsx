import axios from "axios";
import React, { Component } from "react";

import "./Pokemon.css";
import { getMarginTop } from "./utils";

const env = process.env;
const API_URL = env.REACT_APP_API_URL;
const CRY_URL = env.REACT_APP_POKEMON_CRY_URL;

const VOLUME = 0.3;

class Pokemon extends Component {
  state = { types: [], sprites: {}, stats: [] };

  async componentDidMount() {
    const marginTop = getMarginTop("navbardiv", 10);
    this.setState({ marginTop });

    const { params } = this.props.match;
    const id = parseInt(params.id, 10);
    this.cry.volume = VOLUME;
    this.setInfo(id);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { params } = this.props.match;
    const marginTop = getMarginTop("navbardiv", 10);
    if (prevState.marginTop !== marginTop) {
      this.setState({ marginTop });
    }
    if (prevProps.match.params.id !== params.id) {
      const id = parseInt(params.id, 10);
      this.cry.volume = VOLUME;
      this.setInfo(id);
    }
  }

  render() {
    const { params } = this.props.match;
    const id = parseInt(params.id, 10);
    const { marginTop, name, types, stats, sprites } = this.state;
    return (
      <div className="container" style={{ marginTop, maxWidth: 800 }}>
        <audio ref={a => (this.cry = a)} src={`${CRY_URL}/${id}.mp3`} />
        <div className="d-flex align-items-end">
          <h1 className="mb-0 mr-2" style={{ textTransform: "capitalize" }}>
            {name}
          </h1>
          <div>
            {types.map(type => (
              <Type key={type} type={type} />
            ))}
          </div>
        </div>
        <div className="row bg-light my-3 p-2" onClick={() => this.cry.play()}>
          <div className="col">
            <div style={{ display: "flex" }}>
              <Image src={sprites.front_default} />
              <Image src={sprites.back_default} />
            </div>
            <div className="text-center">
              <span className="badge badge-success">Normal</span>
            </div>
          </div>
          <div className="col">
            <div style={{ display: "flex" }}>
              <Image src={sprites.front_shiny} />
              <Image src={sprites.back_shiny} />
            </div>
            <div className="text-center">
              <span className="badge badge-warning">Special</span>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th scope="col">Attr</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(([name, value]) => (
              <tr key={name}>
                <td style={{ textTransform: "capitalize" }}>{name}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  setInfo = async id => {
    if (id === null) {
      return;
    }
    const resp = await axios.get(`${API_URL}/${id}`);
    const info = resp.data;
    this.setState({
      name: info.name,
      types: info.types.map(item => item.type.name),
      stats: info.stats.map(({ stat, base_stat }) => [stat.name, base_stat]),
      sprites: info.sprites
    });
  };
}

function Type(props) {
  const { type } = props;
  return <div className={`badge type m-1 ${type}`}>{type}</div>;
}

function Image(props) {
  const { src } = props;
  return <img className="d-block m-auto" src={src} alt="Back" />;
}

export default Pokemon;
