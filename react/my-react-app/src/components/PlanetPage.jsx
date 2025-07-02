import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PlanetPage = () => {

    const [ planet, setPlanet ] = useState(null)
    const { id } = useParams()

    useEffect(()=>{
        try{
            fetch(`http://localhost:3000/api/planets/${id}`)
            .then((response) => response.json())
            .then((data) => setPlanet(data))
            console.log(planet)


        }catch(error){
            console.error("Failed to fetch planet by ID: ", error)
        }

    },[])

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-100 border-gray-200/50">
    <h1 className="text-3xl font-bold " id="name">{planet?.name}</h1>
    {console.log(planet)}
    <svg width="400" height="60" viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg">
      
      <rect x="10" y="25" width="50" height="10" fill="#333" />
      <circle cx="15" cy="30" r="3" fill="#999" />
      <circle cx="25" cy="30" r="2" fill="#999" />
      
      
      <rect x="60" y="27" width="300" height="6" fill="#00f" />
      
      
      <rect x="60" y="22" width="300" height="16" fill="#00f" opacity="0.25" rx="8" />
    </svg>
    
    
    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Planetary data...</p>
    
    <ul className="my-4 space-y-3">
      <li>
        <a href="#" className="flex items-center p-3 font-bold ">
          <p className='text-black'>climate: {planet?.climate}</p>
        </a>
      </li>
      <li>
        <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg ">
          <p className='text-black'>Surface:  {planet?.surface_water}</p>
        </a>
      </li>
      <li>
        <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg ">
          <p className='text-black'>Diameter: {planet?.diameter}m</p>
        </a>
      </li>
      <li>
        <a href="#" className="flex items-center p-3 font-bold text-gray-900 rounded-lg ">
          <p className='text-black'>Terrain: {planet?.terrain}</p>
        </a>
      </li>
      <li>
        <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg ">
          <p className='text-black'>Orbital Period: {planet?.orbital_period}</p>
        </a>
      </li>
      <li>
        <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg ">
          <p className='text-black'>Rotation Period: {planet?.rotation_period}</p>
        </a>
      </li>
      <li>
        <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg ">
          <p className='text-black'>Population: {planet?.population}</p>
        </a>
      </li>
    </ul>
    
    </div>
  )
}

export default PlanetPage