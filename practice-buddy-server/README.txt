
How to build
=====================

Development:
gulp serve                      : Serve server. Restarts on changes.
gulp serveClient                : Serve client using angular-cli

Production (merges server and client to server dist):
gulp                            : Builds server and client to practice-buddy-server/dist so it can be run standalone using 'npm start'
gulp buildAllAndRunServer       : Builds server and client and starts server


Test commands
=====================

Create/Update exercise
curl -H "Content-Type: application/json" -X POST -d '{"title":"sadhfksadhfk", "labels":["Rock"]}' http://localhost:3011/exercises/simpleExercises
curl -H "Content-Type: application/json" -X PUT -d '{"_id":"573eda74bd6ba04416adbe9b", "title":"sadhfksadhfk", "labels":["Rock"]}' http://localhost:3011/exercises/simpleExercises

Insert execution
curl -H "Content-Type: application/json" -X POST -d '{"personalPerformanceRating": 9}' http://localhost:3011/exercises/573eda74bd6ba04416adbe9b/execution



curl -H "Content-Type: application/json" -X POST -d '{"title":"The Flashcard","flashcardGroups":[{"flashcards":["C","D","E","F","G","A","H" ]}, {"flashcards": ["#", "Natural", "b" ]  },  {"flashcards":["Dur", "Moll"]}]}' http://localhost:3011/exercises/flashcardExercises

curl -H "Content-Type: application/json" -X POST -d '{username: "matt", password: "test", email:"junker.matt@gmail.com"  }' http://localhost:4200/auth/signup
curl -H "Content-Type: application/json" -X POST -d '{username: "matt", password: "test", email:"junker.matt@gmail.com"  }' http://localhost:4200/auth/login

