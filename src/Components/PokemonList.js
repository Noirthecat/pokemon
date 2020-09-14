import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/Card.css";
// destructuring the property
//11.line we check if there is a prev page tricky if statement: if we got a goToPrevPage then render everything after the &&
//In js if you have an and statement and the first section is false it will never run the second section
function PokemonList({ pokemon }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true);
    axios.all(pokemon.map((p) => axios.get(p.url))).then(
      axios.spread(function (...res) {
        setPokemonData(res);
        setloading(false);
      })
    );
  }, [pokemon]);
  if (loading) return "Page is Loading";
  return (
    <div>
      <div className="container">
        {pokemonData.map((pokemon, i) => {
          return <Card key={i} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
}
export default PokemonList;
