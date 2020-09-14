/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "../styles/Card.css";
import { Link } from "react-router-dom";

export default function Card({ pokemon }) {
  console.log(pokemon);
  return (
    <div className="item">
      <div>
        <Link to={`/pokemon/${pokemon.data.id}`}>
          <img
            src={pokemon.data.sprites.front_default}
            onMouseOver={(e) =>
              (e.currentTarget.src = pokemon.data.sprites.front_shiny)
            }
            onMouseOut={(e) =>
              (e.currentTarget.src = pokemon.data.sprites.front_default)
            }
          />
        </Link>
        <h2>{pokemon.data.name}</h2>
      </div>
    </div>
  );
}
