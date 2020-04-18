import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const env = process.env;
const API_URL = env.REACT_APP_API_URL;

function NavBar() {
  function Bar() {
    function NavItem(props) {
      return (
        <li className="nav-item active">
          <Link className="btn btn-link nav-link" to={props.target}>
            {props.name}
          </Link>
        </li>
      );
    }

    return (
      <ul className="navbar-nav mr-auto">
        <NavItem name="Home" target="/1/" />
        <NavItem name="Link" />

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
    );
  }

  return (
    <div
      id="navbar"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 1 }}
    >
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
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
          <Bar />
          <SearchBox />
        </div>
      </nav>
    </div>
  );
}

function SearchBox() {
  let history = useHistory();

  const handleOnSubmit = async event => {
    event.preventDefault();
    const pokemon = event.target.pokemon.value;
    try {
      const resp = await axios.get(`${API_URL}/${pokemon}`);
      const { id } = resp.data;
      history.push(`/pokemons/${id}/`);
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
