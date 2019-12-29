import React, { Component } from "react";

function Pokemon(props) {
  const { name, imageUrl, id } = props;
  return (
    <div className="card">
      <img
        className="card-img-top mx-auto d-block"
        src={imageUrl}
        alt={name}
        style={{ maxWidth: 140 }}
      />
      <div className="card-body">
        <h5 class="card-title badge badge-primary">{`No. ${id}`}</h5>
        <p className="card-text" style={{ textTransform: "capitalize" }}>
          {name}
        </p>
      </div>
    </div>
  );
}

export default Pokemon;
