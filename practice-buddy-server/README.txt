1. gulp build
2. node bin/www

Testen:

Upload Exercise:



curl -H "Content-Type: application/json" -X POST -d '{"title":"sadhfksadhfk", "labels":["Rock"]}' http://localhost:3010/exercises/simpleExercises
curl -H "Content-Type: application/json" -X POST -d '{"title":"12345", "exercises":["573e3cc919edd90821537ef7", "573eba98b035b5c40bb4ac56"]}' http://localhost:3010/practiceFocus

Update:
curl -H "Content-Type: application/json" -X PUT -d '{"_id":"573eda74bd6ba04416adbe9b", "title":"sadhfksadhfk", "labels":["Rock"]}' http://localhost:3010/exercises/simpleExercises