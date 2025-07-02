import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Index() {
  const [characters, setCharacters] = useState([]);
  const [searchString, setSearchString] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getCharacters() {
      let url = 'http://localhost:5175/api/characters';
      try {
        const res = await fetch(url);
        const fetchedCharacters = await res.json();
        setCharacters(fetchedCharacters);
      } catch (ex) {
        console.error("Error reading characters.", ex.message);
      }
    }
    getCharacters();
  }, []);

  // Use RegExp for search if possible, fallback to includes if RegExp fails
  let filteredCharacters = characters;
  if (searchString) {
    try {
      const re = new RegExp(searchString, "i");
      filteredCharacters = characters.filter(character => re.test(character.name));
    } catch {
      filteredCharacters = characters.filter(character =>
        character.name?.toLowerCase().includes(searchString.toLowerCase())
      );
    }
  }

  const handleCharacterClick = id => {
    navigate(`/api/characters`);
  };

  return (
    <div style={{
      backgroundImage: 'url("paper.gif")',
      backgroundColor: '#cccccc',
      minHeight: '100vh',
      padding: '2em'
    }}>
      <div>
        <h1>Star Wars Universe Lookup</h1>
        <label htmlFor="searchString">
          Who you looking for? <span className="small">(Regular expressions are cool here)</span>
        </label>
        <input
          id="searchString"
          type="text"
          autoComplete="off"
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
          style={{ marginLeft: 10, marginBottom: 20 }}
        />
      </div>
      <section id="charactersList">
        {filteredCharacters.map(character => (
          <div
            key={character.id}
            onClick={() => handleCharacterClick(character.id)}
            style={{
              cursor: 'pointer',
              margin: '0.5em 0',
              padding: '0.5em',
              border: '1px solid #eee',
              borderRadius: '4px',
              background: '#fafafa',
              maxWidth: 350
            }}
          >
            {character.name}
          </div>
        ))}
      </section>
    </div>
  );
}