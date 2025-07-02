
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;


app.get('/api/planets', (req, res) => {

  const fakePlanet = {
    name: "Test Planet",
    climate: "temperate",
    terrain: "mountains",
    population: "unknown"
  };

  res.json(fakePlanet);
});

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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
