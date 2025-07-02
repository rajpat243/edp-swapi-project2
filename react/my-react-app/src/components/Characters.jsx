<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);  // State to store characters
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('http://localhost:3000/api/characters')  
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data); 
      })
      .catch((error) => {
        setError('Error fetching characters');
      });
  }, []); 

  // Handle click event to navigate to character details page
  const handleCharacterClick = (id) => {
    navigate(`/character/${id}`);  
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1><strong>Star Wars Universe Lookup</strong></h1>
      <h2><strong>Who are you looking for?</strong></h2>
      <h2>(Regular Expressions are cool here)</h2>
  
      <div>
        {characters.length === 0 ? (
          <div>No characters available</div>
        ) : (
          characters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleCharacterClick(character.id)}  
              style={{ cursor: 'pointer', margin: '10px', border: '1px solid black', padding: '10px' }}
            >
              {character.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}  

export default CharactersList;
>>>>>>> cf9a2ad1b8be7210cbf8587bb54d78dfe13e2f6f
