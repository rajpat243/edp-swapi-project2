const express = require('express');
const app = express();
const port = 3000; 


app.get('/api/planets', (req, res) => {

  const fakePlanet = {
    name: "Test Planet",
    climate: "temperate",
    terrain: "mountains",
    population: "unknown"
  };

  res.json(fakePlanet);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
