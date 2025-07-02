import React, { useEffect, useState } from 'react';

const baseUrl = `mongodb://localhost:27017`;

function useQuery() {
  return new URLSearchParams(window.location.search);
}

export default function FilmDetail() {
  const [film, setFilm] = useState(null);
  const [error, setError] = useState(null);
  const query = useQuery();
  const id = query.get('id');

  useEffect(() => {
    async function getFilm(id) {
      try {
        let film = await fetchFilm(id);
        film.characters = await fetchCharacters(film);
        film.planets = await fetchPlanets(film);
        setFilm(film);
        document.title = `SWAPI - ${film.title}`;
      } catch (ex) {
        setError(`Error reading film ${id} data: ${ex.message}`);
      }
    }
    if (id) getFilm(id);
  }, [id]);

  async function fetchFilm(id) {
    let filmUrl = `/api/films/:id`;
    const res = await fetch(filmUrl);
    return await res.json();
  }

  async function fetchPlanets(film) {
    const url = `/api/films/:id/planets`;
    const res = await fetch(url);
    return await res.json();
  }

  async function fetchCharacters(film) {
    const url = `/api/films/:id/characters`;
    const res = await fetch(url);
    return await res.json();
  }

  if (error) return <div>Error: {error}</div>;
  if (!film) return <div>Loading...</div>;

  return (
    <div>
      <h1 id="film">{film.title}</h1>
      <div>
        <span id="released">{film.release_date}</span> |{' '}
        <span id="director">{film.director}</span> |{' '}
        <span id="episode">{film.episode_id}</span>
      </div>
      <section id="characters">
        <h2>Characters</h2>
        <ul>
          {film.characters.map(character => (
            <li key={character.id}>
              <a href={`/character.html?id=${character.id}`}>{character.name}</a>
            </li>
          ))}
        </ul>
      </section>
      <section id="planets">
        <h2>Planets</h2>
        <ul>
          {film.planets.map(planet => (
            <li key={planet.id}>
              <a href={`/planet.html?id=${planet.id}`}>{planet.name}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}