import { useEffect, useState } from "react";

const baseUrl = `mongodb://localhost:27017`;

function CharacterDetails() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to get id from URL query params
  function getIdFromSearch() {
    const sp = new URLSearchParams(window.location.search);
    return sp.get("id");
  }

  useEffect(() => {
    const id = getIdFromSearch();
    async function getCharacter(id) {
      let char;
      try {
        char = await fetchCharacter(id);
        char.homeworld = await fetchHomeworld(char);
        char.films = await fetchFilms(char);
        char.species = await fetchSpecies(char);
        setCharacter(char);
      } catch (ex) {
        console.error(`Error reading character ${id} data.`, ex.message);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCharacter(id) {
      let characterUrl = `/api/characters/:id`;
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

   // async function fetchSpecies(character) {
   //   const url = `${baseUrl}/films/${character?.id}/species`;
   //   const species = await fetch(url).then((res) => res.json());
   //   return species;
 //   }

    getCharacter(id);
  }, []);

  useEffect(() => {
    if (character?.name) {
      document.title = `SWAPI - ${character.name}`;
    }
  }, [character]);

  if (loading) return <div>Loading...</div>;
  if (!character) return <div>Character not found.</div>;

  return (
    <div className="character-details">
      <h1 id="name">{character?.name}</h1>
      <p>
        <strong>Birth Year:</strong>{" "}
        <span id="birth_year">{character?.birth_year}</span>
      </p>
      <p>
        <strong>Height:</strong>{" "}
        <span id="height">{character?.height}</span>
      </p>
      <p>
        <strong>Mass:</strong>{" "}
        <span id="mass">{character?.mass}</span>
      </p>
      <p>
        <strong>Homeworld:</strong>{" "}
        <span id="homeworld">
          {character?.homeworld && (
            <a href={`/planet.html?id=${character.homeworld.id}`}>
              {character.homeworld.name}
            </a>
          )}
        </span>
      </p>
      <p>
        <strong>Species:</strong>{" "}
        <span id="species">
          {character?.species && (
            <a href={`/species.html?id=${character.species.id}`}>
              {character.species.name}
            </a>
          )}
        </span>
      </p>
      <div id="films">
        <strong>Films:</strong>
        <ul>
          {character?.films?.map((film) => (
            <li key={film.id}>
              <a href={`/film.html?id=${film.id}`}>{film.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetails;