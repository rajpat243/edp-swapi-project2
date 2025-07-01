#this script drops the existing collections and re imports them 

#run it from the folder whrere the json files are located using `bash mongo-swapi-imports.sh`


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