
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

        res.json(character);  // Return only the name
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

        res.json(planet);  // Return only the name
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

        res.json(starship);  // Return only the starship class
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
    
    

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});