import React, { useState, useEffect } from "react";
import PokemonList from "./Components/PokemonList";
import axios from "axios";
import Page from "./Components/Page";
import "./styles/App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TypeList from "./Components/TypeList";

const App = () => {
  //hook for the pokemons which we rendered
  const [pokemons, setPokemon] = useState([]);
  //hook for the current page url so we can render more pokemons
  const [currentPokemonPageUrl, setcurrentPokemonPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?"
  );
  const [nextPokemonPageUrl, setnextPokemonPageUrl] = useState();
  const [prevPokemonPageUrl, setPreviousPokemonPageUrl] = useState();
  //loading screen until data is fetched
  const [loading, setloading] = useState(true);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    setloading(true);
    axios.get("https://pokeapi.co/api/v2/type").then((res) => {
      setloading(false);
      setTypes(res.data.results.map((t) => t.name));
    });
  }, []);

  //every time current page url changes rerender the site, if it doesnt change no rerender
  useEffect(() => {
    setloading(true);
    let cancel;
    axios
      .get(currentPokemonPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setloading(false);
        setnextPokemonPageUrl(res.data.next);
        setPreviousPokemonPageUrl(res.data.previous);
        setPokemon(res.data.results);
      });

    //useEffect allows to return a function and it is called every time useEffect is called
    return () => cancel();
  }, [currentPokemonPageUrl]);

  const goToNextPage = () => {
    setcurrentPokemonPageUrl(nextPokemonPageUrl);
  };

  const goToPrevPage = () => {
    setcurrentPokemonPageUrl(prevPokemonPageUrl);
  };

  if (loading) return "Page is Loading";
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route
          path="/pokemons"
          render={(props) => (
            <React.Fragment>
              <PokemonList pokemon={pokemons} />
              <Page
                goToNextPage={nextPokemonPageUrl ? goToNextPage : null}
                goToPrevPage={prevPokemonPageUrl ? goToPrevPage : null}
              />
            </React.Fragment>
          )}
        />
        <Route
          path="/types"
          render={(props) => (
            <React.Fragment>
              <TypeList types={types} />
            </React.Fragment>
          )}
        />
      </div>
    </Router>
  );
};
export default App;
