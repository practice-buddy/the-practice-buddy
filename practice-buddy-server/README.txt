1. gulp build
2. node bin/www

Testen:

Upload Exercise:

curl -H "Content-Type: application/json" -X PUT -d '{"title":"sadhfksadhfk", }' http://localhost:3010/exercises
curl -H "Content-Type: application/json" -X PUT -d '{"title":"12345", "exercises":["573e3cc919edd90821537ef7", "573eba98b035b5c40bb4ac56"]}' http://localhost:3010/practiceFocus
