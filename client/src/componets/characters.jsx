import React, { useEffect, useState } from 'react';

const baseUrl = `http://localhost:9001/api`;

function useQuery() {
  return new URLSearchParams(window.location.search);
}

const CharacterDetails = () => {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState('');
  const query = useQuery();
  const id = query.get('id');

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        let char = await fetchCharacter(id);
        char.homeworld = await fetchHomeworld(char);
        char.films = await fetchFilms(char);
        char.species = await fetchSpecies(char);
        setCharacter(char);
        document.title = `SWAPI - ${char?.name}`;
      } catch (ex) {
        setError(`Error reading character ${id} data: ${ex.message}`);
      }
    };
    if (id) fetchCharacterData();
  }, [id]);

  async function fetchCharacter(id) {
    let characterUrl = `${baseUrl}/characters/${id}`;
    const res = await fetch(characterUrl);
    return await res.json();
  }

  async function fetchHomeworld(character) {
    const url = `${baseUrl}/planets/${character?.homeworld}`;
    const planet = await fetch(url).then(res => res.json());
    return planet;
  }

  async function fetchFilms(character) {
    const url = `${baseUrl}/characters/${character?.id}/films`;
    const films = await fetch(url).then(res => res.json());
    return films;
  }

  async function fetchSpecies(character) {
    const url = `${baseUrl}/films/${character?.id}/species`;
    const species = await fetch(url).then(res => res.json());
    return species;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }
  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 id="name">{character.name}</h1>
      <p>
        <strong>Birth Year:</strong>{' '}
        <span id="birth_year">{character.birth_year}</span>
      </p>
      <p>
        <strong>Height:</strong>{' '}
        <span id="height">{character.height}</span>
      </p>
      <p>
        <strong>Mass:</strong>{' '}
        <span id="mass">{character.mass}</span>
      </p>
      <p>
        <strong>Species:</strong>{' '}
        {character.species && character.species.id && character.species.name ? (
          <span id="species">
            <a href={`/species.html?id=${character.species.id}`}>
              {character.species.name}
            </a>
          </span>
        ) : (
          <span id="species">Unknown</span>
        )}
      </p>
      <p>
        <strong>Homeworld:</strong>{' '}
        {character.homeworld && character.homeworld.id && character.homeworld.name ? (
          <span id="homeworld">
            <a href={`/planet.html?id=${character.homeworld.id}`}>
              {character.homeworld.name}
            </a>
          </span>
        ) : (
          <span id="homeworld">Unknown</span>
        )}
      </p>
      <div id="films">
        <strong>Films:</strong>
        <ul>
          {character.films && Array.isArray(character.films) && character.films.length > 0 ? (
            character.films.map(film => (
              <li key={film.id}>
                <a href={`/film.html?id=${film.id}`}>{film.title}</a>
              </li>
            ))
          ) : (
            <li>No films found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetails;