import React from 'react';
import PokemonListItem from './PokemonListItem';

const PokemonList = ({ pokemons }) => {
    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon, index) => {
                const { name, url } = pokemon.url
                    ? pokemon
                    : { name: pokemon.name, url: pokemon.species.url };

                return (
                    <PokemonListItem
                        key={index}
                        name={name}
                        url={url}
                        spriteUrl={pokemon.sprites?.front_default}
                        types={pokemon.types}
                    />
                );
            })}
        </div>
    );
};

export default PokemonList;



