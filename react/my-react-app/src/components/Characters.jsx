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
    <div style={{ textAlign: 'center', padding: '20px', color: '#FFD700' }}>
      <h1 style={{ fontFamily: "'Star Jedi', sans-serif" }}><strong>Star Wars Universe Lookup</strong></h1>
      <h2 style={{ fontFamily: "'Star Jedi', sans-serif" }}><strong>Who are you looking for?</strong></h2>

  
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
        {characters.length === 0 ? (
          <div>No characters available</div>
        ) : (
          characters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleCharacterClick(character.id)}  
              style={{ cursor: 'pointer', margin: '10px', border: '1px solid black', padding: '10px' , backgroundColor: 'grey'}}
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