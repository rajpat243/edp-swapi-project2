import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/characters';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch characters:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading characters...</div>;

  return (
    <div>
      <h2>Characters</h2>
      <ul>
        {characters.map((char) => (
          <li key={char._id}>
            {char.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;