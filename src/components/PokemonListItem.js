import React from 'react';

const PokemonListItem = ({ name, url, spriteUrl, types }) => {
  return (
    <div className="pokemon-list-item">
      <h3>{name}</h3>
      {spriteUrl && <img src={spriteUrl} alt={`${name} sprite`} />}
      {types && (
        <ul>
          {types.map((type, index) => (
            <li key={index}>{type.type.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokemonListItem;
