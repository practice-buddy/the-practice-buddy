
How to build
=====================

Development:
gulp serve                      : Serve server. Restarts on changes.
gulp serveClient                : Serve client using angular-cli

Production (merges server and client to server dist):
gulp                            : Builds server and client to practice-buddy-server/dist so it can be run standalone using 'npm start'
gulp buildAllAndRunServer       : Builds server and client and starts server



Deploy
=====================

First time setup:

npm install -g angular-cli
npm install -g gulp
npm install typings --global


DigitalOcean Droplet:
login via ssh
cd /opt/the-practice-buddy
git pull

cd practice-buddy-client/
npm install

cd practice-buddy-server/
npm install

gulp

cd
./runPracticeBuddy.sh


Test commands
=====================

Create/Update exercise
curl -H "Content-Type: application/json" -X POST -d '{"title":"sadhfksadhfk", "labels":["Rock"]}' http://localhost:3011/exercises/simpleExercises
curl -H "Content-Type: application/json" -X POST -d '{"_id":"573eda74bd6ba04416adbe9b", "title":"sadhfksadhfk", "labels":["Rock"]}' http://localhost:3011/exercises/simpleExercises

Insert execution
curl -H "Content-Type: application/json" -X POST -d '{"personalPerformanceRating": 9}' http://localhost:3011/exercises/573eda74bd6ba04416adbe9b/execution



curl -H "Content-Type: application/json" -X POST -d '{"title":"The Flashcard","flashcardGroups":[{"flashcards":["C","D","E","F","G","A","H" ]}, {"flashcards": ["#", "Natural", "b" ]  },  {"flashcards":["Dur", "Moll"]}]}' http://localhost:3011/exercises/flashcardExercises

curl -H "Content-Type: application/json" -X POST -d '{"name": "1", "password": "1", "email":"tester@test.com"}' http://localhost:3011/auth/signup


