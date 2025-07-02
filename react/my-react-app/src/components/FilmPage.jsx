import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 

const FilmPage = () => {

  const [film, setFilm] = useState(null);
  const [filmCharacters, setfilmCharacters] = useState([]);
  const [filmPlanets, setFilmPlanets ] = useState([])

  const { id } = useParams();
  const navigate = useNavigate(); 


   // Handle click event to navigate to character details page
  const handleCharacterClick = (id) => {
    navigate(`/character/${id}`);  
  };

  const handlePlanetClick = (id) => {
    navigate(`/planet/${id}`);  
  };

  useEffect(() => {
    try {
      const fetchData = async () => {

        const filmRes = await fetch(
          `http://localhost:3000/api/films/${id}`
        );
        const filmData = await filmRes.json();
        setFilm(filmData);
        console.log(filmData)

        const filmsCharacterRes = await fetch(
          `http://localhost:3000/api/films/${id}/characters`
        );
        const filmsCharacterData = await filmsCharacterRes.json();
        setfilmCharacters(filmsCharacterData);
        // console.log(filmsCharacterData)

        const filmsPlanetRes = await fetch(
          `http://localhost:3000/api/films/${id}/planets`
        );
        const filmsPlanetData = await filmsPlanetRes.json();
        setFilmPlanets(filmsPlanetData);
        console.log(filmsPlanetData)
      };

      fetchData();
      
    } catch (error) {
      console.error("Failed to fetch films data : ", error);
    }
  }, []);

  return (

    <div className="filmslist">
      
      <h5 style={{margin:20, fontSize: 50 }}>{film?.title}</h5>
      
    <div>
      <h5 style={{margin:20, fontSize: 15 }} >{film?.opening_crawl}</h5>

      <div >
          <div style={{margin:20, fontSize: 20 }}>
            
            {film?.director}
          </div>
          <div>
            {film?.release_date}
          </div>
      </div>
    </div>

    <div className="flex justify-between gap-12 p-6 flex-wrap">
      
      <div className="flex-1 min-w-[250px]">
        <h5 style={{margin:20, }}>Appearing Characters: </h5>
        <div>
          {filmCharacters.map((item) => (
            <button key={item.id} onClick={() => handleCharacterClick(item.id)}> {item.name} </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-[250px]">
        <h5 style={{margin:20, }}>Planets: </h5>
        <div>
          {filmPlanets.map((item) => (
            <button key={item.id} onClick={() => handlePlanetClick(item.id)}> {item.name} </button>
          ))}
        </div>
      </div>
    </div>
   
  </div>

  )
  
 
};

export default FilmPage;