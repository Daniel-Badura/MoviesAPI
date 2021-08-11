// jshint esversion: 9

let movie;
// fetch("http://www.omdbapi.com/?apikey=f7196b6c&t=batman")
// .then(res => res.json())
// .then(json => movie = json);

let film = new Movie(movie)
{    
Title: movie.Title
Released: movie.Released
Genre: movie.Genre
Director: movie.Director
}


const batman = {
    "Title": "Batman",
    "Year": "1989",
    "Rated": "PG-13",
    "Released": "23 Jun 1989",
    "Runtime": "126 min",
    "Genre": "Action, Adventure",
    "Director": "Tim Burton",
    "Writer": "Bob Kane, Sam Hamm, Warren Skaaren",
    "Actors": "Michael Keaton, Jack Nicholson, Kim Basinger",
    "Plot": "The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.",
    "Language": "English, French, Spanish",
    "Country": "United States, United Kingdom",
    "Awards": "Won 1 Oscar. 9 wins & 26 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "7.5/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "71%"
        },
        {
            "Source": "Metacritic",
            "Value": "69/100"
        }
    ],
    "Metascore": "69",
    "imdbRating": "7.5",
    "imdbVotes": "345,938",
    "imdbID": "tt0096895",
    "Type": "movie",
    "DVD": "24 Jul 2014",
    "BoxOffice": "$251,348,343",
    "Production": "Warner Brothers, Guber-Peters Company, PolyGram Filmed Entertainment",
    "Website": "N/A",
    "Response": "True"
};
