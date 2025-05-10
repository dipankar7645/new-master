import React from "react";
import "./Card.css";

function Card({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="card-image" />
      <div className="card-body">
        <h2 className="card-title">{product.name} · {product.price}</h2>
        <p className="card-sub">{product.time} · {product.distance}</p>
        <p className="card-rating">⭐ {product.rating}</p>
        <p className="card-offer">{product.offer}</p>
        <h3 className="card-shop">{product.shop}</h3>
      </div>
    </div>
  );
}

export default Card;
