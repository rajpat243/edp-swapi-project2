import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "./components/Characters";
import Character from "./components/Character";
import Film from "./components/Film";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page: list all characters */}
        <Route path="/" element={<Characters />} />
        {/* Character detail page, :id is the character id */}
        <Route path="/characters/:id" element={<Character />} />
        {/* Film detail page, :id is the film id */}
        <Route path="/films/:id" element={<Film />} />
      </Routes>
    </Router>
  );
}

export default App;