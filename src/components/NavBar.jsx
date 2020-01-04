import React from "react";

function NavBar(props) {
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
            <button
              onClick={() => props.clickHandler(1)}
              className="btn btn-link nav-link"
            >
              Home <span className="sr-only">(current)</span>
            </button>
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
        <form className="form-inline my-2 my-md-0">
          <input className="form-control" type="text" placeholder="Search" />
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
