
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
      const url = `${baseUrl}/api/planets/${id}/characters`;
      const planet = await fetch(url).then((res) => res.json());
      return planet;
    }

    async function fetchFilms(character) {
      const url = `${baseUrl}/api/characters/${id}/films`;
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

export default Character;
