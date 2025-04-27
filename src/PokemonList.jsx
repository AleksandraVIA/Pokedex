import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=12"
  );
  const [prevUrl, setPrevUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch(currentUrl);
        const data = await res.json();
        setPrevUrl(data.previous);
        setNextUrl(data.next);

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonRes = await fetch(pokemon.url);
            return await pokemonRes.json();
          })
        );
        setPokemonData(detailedPokemon);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      }
    }

    fetchPokemon();
  }, [currentUrl]);

  const getBackgroundColor = (types) => {
    const type = types[0].type.name;
    const colors = {
      fire: "#f08030",
      water: "#6890f0",
      grass: "#78c850",
      electric: "#f8d030",
      ice: "#98d8d8",
      fighting: "#c03028",
      poison: "#a040a0",
      ground: "#e0c068",
      flying: "#a890f0",
      psychic: "#f85888",
      bug: "#a8b820",
      rock: "#b8a038",
      ghost: "#705898",
      dragon: "#7038f8",
      dark: "#705848",
      steel: "#b8b8d0",
      fairy: "#ee99ac",
      normal: "#a8a878",
    };
    return colors[type] || "#fff";
  };

  const getPokemonImage = (pokemon) => {
    const animated =
      pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated
        ?.front_default;

    return animated || pokemon.sprites.front_default;
  };

  return (
    <div className="container">
      <h1>Pokémon List</h1>
      <div className="pokemon-grid">
        {pokemonData.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            style={{ backgroundColor: getBackgroundColor(pokemon.types) }}
          >
            <Link to={`/about/${pokemon.name}`}>
              <img src={getPokemonImage(pokemon)} alt={pokemon.name} />
              <p>
                #{pokemon.id} {pokemon.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={() => setCurrentUrl(prevUrl)} disabled={!prevUrl}>
          Previous
        </button>
        <button onClick={() => setCurrentUrl(nextUrl)} disabled={!nextUrl}>
          Next
        </button>
      </div>
    </div>
  );
}
