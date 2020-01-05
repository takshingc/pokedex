import React, { Component } from "react";
import "./App.css";
import PageBar from "./components/PageBar";
import Pokedex from "./components/Pokedex";
import { getMarginTop } from "./components/utils";

class App extends Component {
  state = {};

  componentDidMount() {
    const marginTop = getMarginTop("navbardiv", 10);
    this.setState({ marginTop });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const marginTop = getMarginTop("navbardiv", 10);
    if (prevState.marginTop !== marginTop) {
      this.setState({ marginTop });
    }
  }

  render() {
    const { params } = this.props.match;
    const page = parseInt(params.page, 10);
    const { marginTop } = this.state;
    return (
      <div className="App">
        <div className="container" style={{ marginTop }}>
          <Pokedex page={page} />
        </div>
        <PageBar page={page} />
      </div>
    );
  }
}

export default App;
