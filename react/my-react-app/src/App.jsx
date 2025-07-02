import { useState } from 'react'
import './App.css'

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Characters from './components/Characters';
import CharacterPage from './components/CharacterPage';
import PlanetPage from './components/PlanetPage';
import FilmPage from './components/FilmPage';


function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/film/:id" element={<FilmPage />} />
        <Route path="/planet/:id" element={<PlanetPage />} />
      </Routes>
    </Router>
  );
}


export default App;