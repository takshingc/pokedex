import React from "react";

function Pokemon(props) {
  const { name, imageUrl, id } = props;
  return (
    <div className="card" style={{ width: 140 }}>
      <img className="card-img-top" src={imageUrl} alt={name} />
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
