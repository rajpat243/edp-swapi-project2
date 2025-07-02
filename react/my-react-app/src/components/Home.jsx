import React, { useEffect, useState } from 'react';

const baseUrl = `mongodb://localhost:27017`;
const CHARACTERS_API = '/api/characters';

export default function CharactersList() {
  const [characters, setCharacters] = useState([]);
  const [searchString, setSearchString] = useState('');
  
  useEffect(() => {
    async function getCharacters() {
      try {
        const response = await fetch(CHARACTERS_API);
        const fetchedCharacters = await response.json();
        setCharacters(fetchedCharacters);
        console.log("All the characters are ", fetchedCharacters);
      } catch (ex) {
        console.error("Error reading characters.", ex.message);
      }
    }
    getCharacters();
  }, []);
  
  const handleSearch = (event) => {
    setSearchString(event.target.value);
  };
  
  const filteredCharacters = characters.filter(character =>
    new RegExp(searchString, "i").test(character.name)
  );
  
  const goToCharacterPage = (id) => {
    window.location = `/character.html?id=${id}`;
  };
  
  return (
    <div>
      <input
        id="searchString"
        type="text"
        value={searchString}
        onChange={handleSearch}
        placeholder="Search characters..."
      />
      <div id="charactersList">
        {filteredCharacters.map(character => (
          <div
            key={character.id}
            onClick={() => goToCharacterPage(character.id)}
            style={{ cursor: 'pointer' }}
          >
            {character.name}
          </div>
        ))}
      </div>
    </div>
  );
}