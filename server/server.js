
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const router = express.Router();
const port = 3000;

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;


app.get('/api/characters', async (req, res) => {

  try {
    const client = await MongoClient.connect(url)
    const db = client.db(dbName)
    const collection = db.collection("characters")
    const characters = await collection.find({}).toArray()
    res.json(characters)
  } catch (error) {
    console.log("Error", error)
    res.status(500).send("Error in api.")
  }

});

app.get('/api/planets', async (req, res) => {
    try {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection("planets");
      const planets = await collection.find({}).toArray();
      res.json(planets);
    } catch (error) {
      console.log("Error", error);
      res.status(500).send("Error in api.");
    }
  });

  app.get('/api/starships', async (req, res) => {
    try {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection("starships");
      const starships = await collection.find({}).toArray();
      res.json(starships);
    } catch (error) {
      console.log("Error", error);
      res.status(500).send("Error in api.");
    }
  });

  app.get('/api/films', async (req, res) => {
    try {
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection("films");
      const films = await collection.find({}).toArray();
      res.json(films);
    } catch (error) {
      console.log("Error", error);
      res.status(500).send("Error in api.");
    }
  });

  app.get('/api/characters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("characters");
        const character = await collection.findOne({ id: parseInt(id) });

        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        res.json(character);  
    } catch (error) {
        console.log("Error fetching character by ID:", error);
        res.status(500).send("Error in api.");
    }
});

app.get('/api/planets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("planets");
        const planet = await collection.findOne({ id: parseInt(id) });

        if (!planet) {
            return res.status(404).json({ message: 'Planet not found' });
        }

        res.json(planet);  
    } catch (error) {
        console.log("Error fetching planet by ID:", error);
        res.status(500).send("Error in api.");
    }
});

app.get('/api/starships/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("starships");
        const starship = await collection.findOne({ id: parseInt(id) });

        if (!starship) {
            return res.status(404).json({ message: 'Starship not found' });
        }

        res.json(starship);  
    } catch (error) {
        console.log("Error fetching starship by ID:", error);
        res.status(500).send("Error in api.");
    }
});

    
    app.get('/api/films/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const collection = db.collection("films");
            const film = await collection.findOne({ id: parseInt(id) });
    
            if (!film) {
                return res.status(404).json({ message: 'Film not found' });
            }
    
            res.json(film); 
        } catch (error) {
            console.log("Error fetching film by ID:", error);
            res.status(500).send("Error in api.");
        }
    });
    
    app.get('/api/films/:id/characters', async (req, res) => {
        const { id } = req.params;
        try {
            const client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const filmCharacters = db.collection('films_characters');
            const characters = db.collection('characters');
    
            const characterMappings = await filmCharacters.find({ film_id: parseInt(id) }).toArray();
    
            if (characterMappings.length === 0) {
                return res.status(404).json({ message: 'No characters found for this film' });
            }
    
            const characterIds = characterMappings.map(mapping => mapping.character_id);
    
            const charactersData = [];
            for (const characterId of characterIds) {
                const character = await characters.findOne({ id: characterId });
                if (character) {
                    charactersData.push(character);
                }
            }
    
            res.json(charactersData);
        } catch (error) {
            console.log('Error fetching characters for film:', error);
            res.status(500).send("Error in api.");
        }
    });

    app.get('/api/characters/:id/films', async (req, res) => {
        const { id } = req.params;
        try {
            const client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const filmCharacters = db.collection('films_characters');
            const films = db.collection('films');
    
            const filmMappings = await filmCharacters.find({ character_id: parseInt(id) }).toArray();
    
            if (filmMappings.length === 0) {
                return res.status(404).json({ message: 'No films found for this character' });
            }
    
            const filmIds = filmMappings.map(mapping => mapping.film_id);
    
            const filmsData = [];
            for (const filmId of filmIds) {
                const film = await films.findOne({ id: filmId });
                if (film) {
                    filmsData.push(film);
                }
            }
    
            res.json(filmsData);
        } catch (error) {
            console.log('Error fetching films for character:', error);
            res.status(500).send("Error in api.");
        }
    });

    app.get('/api/planets/:id/films', async (req, res) => {
        const { id } = req.params;
        try {
            const client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const planetFilms = db.collection('films_planets');
            const films = db.collection('films');
    
            const filmMappings = await planetFilms.find({ planet_id: parseInt(id) }).toArray();
    
            if (filmMappings.length === 0) {
                return res.status(404).json({ message: 'No films found for this planet' });
            }
    
            const filmIds = filmMappings.map(mapping => mapping.film_id);
    
            const filmsData = [];
            for (const filmId of filmIds) {
                const film = await films.findOne({ id: filmId });
                if (film) {
                    filmsData.push(film);
                }
            }
    
            res.json(filmsData);
        } catch (error) {
            console.log('Error fetching films for planet:', error);
            res.status(500).send("Error in api.");
        }
    });
    
    app.get('/api/planets/:id/characters', async (req, res) => {
        const { id } = req.params;
        try {
            const client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const planetCharacters = db.collection('planets_characters');
            const characters = db.collection('characters');
    
            const characterMappings = await planetCharacters.find({ planet_id: parseInt(id) }).toArray();
    
            if (characterMappings.length === 0) {
                return res.status(404).json({ message: 'No characters found for this planet' });
            }
    
            const characterIds = characterMappings.map(mapping => mapping.character_id);
    
            const charactersData = [];
            for (const characterId of characterIds) {
                const character = await characters.findOne({ id: characterId });
                if (character) {
                    charactersData.push(character.name);
                }
            }
    
            res.json(charactersData);
        } catch (error) {
            console.log('Error fetching characters for planet:', error);
            res.status(500).send("Error in api.");
        }
    });
    
    app.get('/api/films/:id/planets', async (req, res) => {
        const { id } = req.params;
        try {
            const client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const filmPlanets = db.collection('films_planets');
            const planets = db.collection('planets');
    
            const planetMappings = await filmPlanets.find({ film_id: parseInt(id) }).toArray();
    
            if (planetMappings.length === 0) {
                return res.status(404).json({ message: 'No planets found for this film' });
            }
    
            const planetIds = planetMappings.map(mapping => mapping.planet_id);
    
            const planetsData = [];
            for (const planetId of planetIds) {
                const planet = await planets.findOne({ id: planetId });
                if (planet) {
                    planetsData.push(planet);
                }
            }
    
            res.json(planetsData);
        } catch (error) {
            console.log('Error fetching planets for film:', error);
            res.status(500).send("Error in api.");
        }
    });

    app.get('/api/films/:id/starships', async (req, res) => {
        const { id } = req.params;
        try {
            const client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const filmStarships = db.collection('films_starships');
            const starships = db.collection('starships');
    
            const starshipMappings = await filmStarships.find({ film_id: parseInt(id) }).toArray();
    
            if (starshipMappings.length === 0) {
                return res.status(404).json({ message: 'No starships found for this film' });
            }
    
            const starshipIds = starshipMappings.map(mapping => mapping.starship_id);
    
            const starshipsData = [];
            for (const starshipId of starshipIds) {
                const starship = await starships.findOne({ id: starshipId });
                if (starship) {
                    starshipsData.push(starship);
                }
            }
    
            res.json(starshipsData);
        } catch (error) {
            console.log('Error fetching starships for film:', error);
            res.status(500).send("Error in api.");
        }
    });

    app.get('/api/starships/:id/films', async (req, res) => {
        const { id } = req.params;
        try {
            const client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const starshipFilms = db.collection('films_starships');
            const films = db.collection('films');
    
            const filmMappings = await starshipFilms.find({ starship_id: parseInt(id) }).toArray();
    
            if (filmMappings.length === 0) {
                return res.status(404).json({ message: 'No films found for this starship' });
            }
    
            const filmIds = filmMappings.map(mapping => mapping.film_id);
    
            const filmsData = [];
            for (const filmId of filmIds) {
                const film = await films.findOne({ id: filmId });
                if (film) {
                    filmsData.push(film);
                }
            }
    
            res.json(filmsData);
        } catch (error) {
            console.log('Error fetching films for starship:', error);
            res.status(500).send("Error in api.");
        }
    });

    app.get('/api/characters/:id/starships', async (req, res) => {
        const { id } = req.params;
        try {
            const client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const characterStarships = db.collection('starships_characters');
            const starships = db.collection('starships');
    
            const starshipMappings = await characterStarships.find({ character_id: parseInt(id) }).toArray();
    
            if (starshipMappings.length === 0) {
                return res.status(404).json({ message: 'No starships found for this character' });
            }
    
            const starshipIds = starshipMappings.map(mapping => mapping.starship_id);
    
            const starshipsData = [];
            for (const starshipId of starshipIds) {
                const starship = await starships.findOne({ id: starshipId });
                if (starship) {
                    starshipsData.push(starships);
                }
            }
    
            res.json(starshipsData);
        } catch (error) {
            console.log('Error fetching starships for character:', error);
            res.status(500).send("Error in api.");
        }
    });

    app.get('/api/starships/:id/characters', async (req, res) => {
        const { id } = req.params;
        try {
            const client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const starshipCharacters = db.collection('starships_characters');
            const characters = db.collection('characters');
    
            const characterMappings = await starshipCharacters.find({ starship_id: parseInt(id) }).toArray();
    
            if (characterMappings.length === 0) {
                return res.status(404).json({ message: 'No characters found for this starship' });
            }
    
            const characterIds = characterMappings.map(mapping => mapping.character_id);
    
            const charactersData = [];
            for (const characterId of characterIds) {
                const character = await characters.findOne({ id: characterId });
                if (character) {
                    charactersData.push(character);
                }
            }
    
            res.json(charactersData);
        } catch (error) {
            console.log('Error fetching characters for starship:', error);
            res.status(500).send("Error in api.");
        }
    });
    
    
    
    
    
    
    
    

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});