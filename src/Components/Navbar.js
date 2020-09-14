import React from "react";
import navStyle from "../styles/navbarStyle.module.css";
import navimg from "../assets/pokemon.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={navStyle.nav}>
      <img className={navStyle.nav_img} src={navimg} alt="Pokemon Logo" />
      <ul className={navStyle.list}>
        <Link to="/pokemons">
          <li>Pokemons</li>
        </Link>
        <Link to="/types">
          |<li>Types</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
