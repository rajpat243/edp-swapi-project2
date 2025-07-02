import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InfoCard from './InfoCard';

const CharacterPage = () => {
  const [character, setCharacter] = useState(null);
  const [characterFilms, setCharacterFilms] = useState([]);
  const [homeworld, setHomeworld] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterRes = await fetch(`http://localhost:3000/api/characters/${id}`);
        const characterData = await characterRes.json();
        setCharacter(characterData);

        const characterFilmsRes = await fetch(`http://localhost:3000/api/characters/${id}/films`);
        const characterFilmsData = await characterFilmsRes.json();
        setCharacterFilms(characterFilmsData);

        const homeworldRes = await fetch(`http://localhost:3000/api/planets/${characterData.homeworld}`);
        const homeworldData = await homeworldRes.json();
        setHomeworld(homeworldData);
      } catch (error) {
        console.error('Failed to fetch character data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!character) return <div>Loading character...</div>;

  return (
    <div className='characters'>
      <InfoCard info={character} />

      <div className='characters'>
        {homeworld && (
          <div>
            <strong>Homeworld: </strong>{' '}
            <Link to={`/planet/${character.homeworld}`}>
              {homeworld.name}
            </Link>
          </div>
        )}

        {characterFilms.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <strong>Appears in Films:</strong>
            <ul>
              {characterFilms.map((film) => (
                <li key={film.id}>
                  <Link to={`/film/${film.id}`}>{film.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterPage;