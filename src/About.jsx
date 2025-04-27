import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./About.css";

export default function About() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      }
    }

    fetchPokemon();
  }, [name]);

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
    return (
      pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated
        ?.front_default || pokemon.sprites.front_default
    );
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="about-container">
      <div
        className="about-header"
        style={{ backgroundColor: getBackgroundColor(pokemon.types) }}
      >
        <h1>
          {pokemon.name} (#{pokemon.id})
        </h1>
      </div>

      <div className="about-image">
        <img src={getPokemonImage(pokemon)} alt={pokemon.name} />
      </div>

      <div className="about-info">
        <div className="about-section">
          <h2>Types</h2>
          <ul>
            {pokemon.types.map((t) => (
              <li key={t.type.name}>{t.type.name}</li>
            ))}
          </ul>
        </div>

        <div className="about-section">
          <h2>Abilities</h2>
          <ul>
            {pokemon.abilities.map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>
        </div>

        <div className="about-section">
          <h2>Stats</h2>
          <ul>
            {pokemon.stats.map((s) => (
              <li key={s.stat.name}>
                {s.stat.name}: {s.base_stat}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-section">
          <h2>Height & Weight</h2>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>

        <Link to="/" className="back-link">
          ← Back to list
        </Link>
      </div>
    </div>
  );
}
