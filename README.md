Movies API application

Application consists of two endpoints:

1. POST /movies
2. GET /movies

In order to use it you need to get authenticated first by sending credentials to the POST /auth route

Application is hosted on Heroku with CircleCI:
CircleCI: https://app.circleci.com/pipelines/github/Daniel-Badura/MoviesAPI?filter=all
Heroku: https://db-movies-api.herokuapp.com/

To test the functionality you may build the application locally or simply use the hosted Heroku link

To obtain the bearer token send POST request to the address https://db-movies-api.herokuapp.com/auth with one of the following in body:

{
"username": "basic-thomas",
"password": "sR-\_pcoow-27-6PAwCD8"
},

{
"username": "premium-jim",
"password": "GBLtTyq3E_UNjFnpo9m6"
}

You can view the movies added by each user by sending GET request to https://db-movies-api.herokuapp.com/movies with previously obtained token in the Authorization header.
You can add new movies by sending POST request to the https://db-movies-api.herokuapp.com/movies with "Title" variable in the body consisting of desired movie title. example:
{
"Title": "Spiderman"
}

The application is Dockerized.
