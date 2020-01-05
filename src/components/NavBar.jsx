import axios from "axios";
import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";

const env = process.env;
const API_URL = env.REACT_APP_API_URL;

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <span className="navbar-brand">PokeDex</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample05"
          aria-controls="navbarsExample05"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample05">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="btn btn-link nav-link" to="/1">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link">Link</button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link disabled"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </button>
            </li>
            <li className="nav-item dropdown">
              <button
                className="btn btn-link nav-link dropdown-toggle"
                id="dropdown05"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdown05">
                <a className="dropdown-item" href="/#">
                  Action
                </a>
                <a className="dropdown-item" href="/#">
                  Another action
                </a>
                <a className="dropdown-item" href="/#">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
          <SearchBox />
        </div>
      </nav>
    );
  }
}

function SearchBox() {
  let history = useHistory();

  const handleOnSubmit = async event => {
    event.preventDefault();
    const pokemon = event.target.pokemon.value;
    try {
      const resp = await axios.get(`${API_URL}/${pokemon}`);
      const { id } = resp.data;
      history.push(`/pokemons/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form className="form-inline my-2 my-md-0" onSubmit={handleOnSubmit}>
        <input
          className="form-control"
          name="pokemon"
          type="text"
          placeholder="Search"
        />
      </form>
    </div>
  );
}

export default NavBar;
