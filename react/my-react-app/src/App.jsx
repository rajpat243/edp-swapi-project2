import { useEffect, useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Characters} from './components/Characters.jsx';


// Inline CSS for background
const bodyStyle = {
  backgroundImage: 'url("paper.gif")',
  backgroundColor: "#cccccc",
  minHeight: "100vh",
  padding: "2rem",
};

function App() {
  const [view, setView] = useState("list"); // "list" or "detail"
  const [characters, setCharacters] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [error, setError] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all characters on mount or when going back to list
  useEffect(() => {
    if (view === "list") {
      setLoading(true);
      fetch("/api/characters")
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch characters.");
          return res.json();
        })
        .then(data => {
          setCharacters(data);
          setError("");
        })
        .catch(err => setError("Error reading characters. " + err.message))
        .finally(() => setLoading(false));
    }
  }, [view]);

  // Filter logic using regex
  let matchingCharacters = characters;
  try {
    const re = new RegExp(searchString, "i");
    matchingCharacters = characters.filter((c) => re.test(c.name));
  } catch {
    matchingCharacters = [];
  }

  // Fetch one character for details
  const showCharacter = (id) => {
    setLoading(true);
    fetch(`/api/characters/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch character.");
        return res.json();
      })
      .then(data => {
        setSelectedCharacter(data);
        setView("detail");
        setError("");
      })
      .catch(err => setError("Error reading character. " + err.message))
      .finally(() => setLoading(false));
  };

  // List View
  const renderList = () => (
    <>
      <h1>Star Wars Universe Lookup</h1>
      <div style={{ marginBottom: "1.5rem" }}>
        <label htmlFor="searchString">
          Who you looking for?{" "}
          <span style={{ fontSize: "small" }}>(Regular expressions are cool here)</span>
        </label>
        <input
          id="searchString"
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
          autoComplete="off"
          style={{
            maxWidth: 400,
            display: "block",
            marginTop: "0.5rem",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #aaa",
          }}
        />
      </div>
      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
      {loading && <div>Loading...</div>}
      <section id="charactersList">
        {matchingCharacters.map(character => (
          <div
            key={character.id}
            onClick={() => showCharacter(character.id)}
            style={{
              cursor: "pointer",
              padding: "0.75rem 1rem",
              margin: "0.5rem 0",
              background: "#fff",
              borderRadius: "4px",
              boxShadow: "0 2px 8px #0001",
              fontSize: "1.25rem",
              transition: "background 0.2s",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#f2f2f2")}
            onMouseOut={e => (e.currentTarget.style.background = "#fff")}
          >
            {character.name}
          </div>
        ))}
        {matchingCharacters.length === 0 && !error && !loading && (
          <div style={{ color: "#666" }}>No characters found.</div>
        )}
      </section>
    </>
  );

  // Detail View
  const renderDetail = () => (
    <>
      <button
        style={{
          marginBottom: "1.5rem",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          border: "1px solid #888",
          background: "#eee",
          cursor: "pointer",
        }}
        onClick={() => {
          setView("list");
          setSelectedCharacter(null);
        }}
      >
        &larr; Back to list
      </button>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
      {selectedCharacter && (
        <div style={{
          background: "#fff",
          borderRadius: "6px",
          boxShadow: "0 2px 8px #0002",
          padding: "2rem",
          maxWidth: 500
        }}>
          <h2>{selectedCharacter.name}</h2>
          <pre style={{
            background: "#f6f6f6",
            padding: "1rem",
            borderRadius: "4px",
            overflowX: "auto"
          }}>
            {JSON.stringify(selectedCharacter, null, 2)}
          </pre>
        </div>
      )}
    </>
  );

  return (
    <div style={bodyStyle}>
      {view === "list" ? renderList() : renderDetail()}
    </div>
  );
}

export default App;