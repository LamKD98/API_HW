import React, { useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';

const PokemonContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonList();
      setPokemonData(data.results);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearchedPokemon = async () => {
      if (searchQuery) {
        const searchedPokemonData = await getPokemonData(searchQuery);
        setSearchResult(searchedPokemonData);
      } else {
        setSearchResult(null);
      }
    };

    fetchSearchedPokemon();
  }, [searchQuery]);

  const fetchPokemonList = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      if (response.ok) {
        const data = await response.json();
        const detailedPokemonRequests = data.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        );
        const detailedPokemons = await Promise.all(detailedPokemonRequests);
        return { results: detailedPokemons };
      } else {
        console.error('Error fetching data:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const getPokemonData = async (nameOrId) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
      if (response.ok) {
        const pokemonData = await response.json();
        return pokemonData;
      } else {
        console.error('Error fetching data:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const displayPokemons = () => {
    if (searchQuery && searchResult) {
      return [searchResult];
    } else {
      return pokemonData;
    }
  };

  return (
    <>
      <h1>Pokédex</h1>
      <SearchBar onChange={setSearchQuery} />
      <PokemonList pokemons={displayPokemons()} />
    </>
  );
};

export default PokemonContainer;
