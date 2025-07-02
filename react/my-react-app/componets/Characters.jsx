import { useEffect, useState } from "react";

function Characters() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to get id from URL query params
  function getIdFromSearch() {
    const sp = new URLSearchParams(window.location.search);
    return sp.get("id");
  }

  const baseUrl = "http://localhost:3000"

  useEffect(() => {
    const id = getIdFromSearch();
    if (!id) {
      setLoading(false);
      return;
    }

    fetchCharacter(id)
      .then((data) => {
        console.log("Character data:", data);
        setCharacter(data);
      })
      .catch((error) => {
        console.error("Error fetching character:", error.message);
        setCharacter(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

    async function fetchCharacter(id) {
      try {
        const response = await fetch(`${baseUrl}/api/characters/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log("Character data:", data);
        setCharacter(data);
      } catch (error) {
        console.error("Error fetching character:", error.message);
        setCharacter(null);
      } finally {
        setLoading(false);
      }
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

export default Characters;