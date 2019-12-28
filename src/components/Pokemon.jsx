import React, { Component } from "react";

function Pokemon(props) {
  const { name, imageUrl } = props;
  return (
    <React.Fragment>
      <td>{name}</td>
      <td>
        <img src={imageUrl} alt={name} />
      </td>
    </React.Fragment>
  );
}

export default Pokemon;
