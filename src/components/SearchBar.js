import React, { useState } from 'react';

const SearchBar = ({ onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;

