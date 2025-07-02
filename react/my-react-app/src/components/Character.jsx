<<<<<<< HEAD
import React, { useEffect, useState } from 'react';

const baseUrl = `http://localhost:3000`;

function Character() {

  const id = useParams()
  const [character, setCharacter] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    


    async function getCharacter(id) {
      let char;
      try {
        char = await fetchCharacter(id);
        char.homeworld = await fetchHomeworld(char);
        char.films = await fetchFilms(char);
        setCharacter(char);
      } catch (ex) {
        console.error(`Error reading character ${id} data.`, ex.message);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCharacter(id) {
      let characterUrl = `${baseUrl}/api/characters/${id}`;
      console.log({id})
      return await fetch(characterUrl).then((res) => res.json());
    }

    async function fetchHomeworld(character) {
      const url = `/api/planets/:id/characters`;
      const planet = await fetch(url).then((res) => res.json());
      return planet;
    }

    async function fetchFilms(character) {
      const url = `/api/characters/:id/films`;
      const films = await fetch(url).then((res) => res.json());
      return films;
    }

    getCharacter(id);
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

export default Character;