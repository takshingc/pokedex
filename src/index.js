import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import NavBar from "./components/NavBar";
import Pokemon from "./components/Pokemon";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <div id="navbardiv">
        <NavBar />
      </div>
      <Switch>
        <Route path="/pokemons/:id" component={Pokemon} />
        <Route exact path="/pokemons">
          <Redirect to="/1" />
        </Route>
        <Route path="/:page" component={App} />
        <Route exact path="/">
          <Redirect to="/1" />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
