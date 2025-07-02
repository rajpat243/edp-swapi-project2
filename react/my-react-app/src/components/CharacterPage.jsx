import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InfoCard from './InfoCard';

const CharacterPage = () => {
  const [character, setCharacter] = useState(null);
  const [characterFilms, setCharacterFilms] = useState([]);
  const [homeworld, setHomeworld] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const buttonStyle = {
    cursor: 'pointer',
    backgroundColor: '#FFD700', // Yellow background
    color: '#000000', // Black text color for contrast
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    margin: '5px',
    textAlign: 'center',
    display: 'inline-block',
  };

  return (
    <div className='characters'>
      <InfoCard info={character} />

      <div className='characters'>
        {homeworld && (
          <div style={{ marginTop: '20px' }}>
            <strong>Homeworld:</strong>
            <div>
              <span
                style={buttonStyle}
                onClick={() => navigate(`/planet/${character.homeworld}`)}
              >
                {homeworld?.name}
              </span>
            </div>
          </div>
        )}

        {characterFilms.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <strong>Appears in Films:</strong>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {characterFilms.map((film) => (
                <li key={film.id}>
                  <span
                    style={buttonStyle}
                    onClick={() => navigate(`/film/${film.id}`)}
                  >
                    {film.title}
                  </span>
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
