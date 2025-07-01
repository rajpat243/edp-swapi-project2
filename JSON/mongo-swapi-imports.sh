#do these steps first

# connect to the database
## mongosh

# switch into the database
## use swapi

# drop the existing characters collection
# db.characters.drop()

mongoimport --uri mongodb://localhost:27017/swapi --collection characters --drop --file characters.json --jsonArray

sleep 3

mongoimport --uri mongodb://localhost:27017/swapi --collection films_characters --drop --file films_characters.json --jsonArray

sleep 3

mongoimport --uri mongodb://localhost:27017/swapi --collection films_planets --drop --file films_planets.json --jsonArray

sleep 3

mongoimport --uri mongodb://localhost:27017/swapi --collection films_starships --drop --file films_starships.json --jsonArray

sleep 3

mongoimport --uri mongodb://localhost:27017/swapi --collection films --drop --file films.json --jsonArray

sleep 3

mongoimport --uri mongodb://localhost:27017/swapi --collection planets --drop --file planets.json --jsonArray

sleep 3

mongoimport --uri mongodb://localhost:27017/swapi --collection starships_characters --drop --file starships_characters.json --jsonArray

sleep 3

mongoimport --uri mongodb://localhost:27017/swapi --collection starships --drop --file starships.json --jsonArray

sleep 3