import React from "react";

export const Card = ({ img, name }: { img: string; name: string }) => (
  <div className="card">
    <div style={{ display: "flex" }}>
      <img src={img} alt={`picture-of-${name}`} />
      <h1>{name}</h1>
    </div>
  </div>
);
