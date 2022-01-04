// jshint esversion: 9
const path = require("path");
require('dotenv').config({ path: './config/config.env' });
const { getMovies, getMovie, createMovie } = require("./controllers/movies");
const {
  fetchMovie,
  fetchTest,
  moviesAdded,
} = require("./scripts/movies");
const Movie = require("./models/Movie");
const mongoose = require("mongoose");


dburl = process.env.MONGO_URI;
mongoose.Promise = global.Promise;
mongoose.connect(
  dburl,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
mongoose.connection.on("error", () => {
  throw new Error("unable to connect to database");
});

test('Fetch "http://www.omdbapi.com/?apikey=f7196b6c&t=Batman" returns the Batman Movie object', () => {
  expect.assertions(1);
  return fetchMovie("Batman").then((data) => {
    expect(data.Title).toEqual("Batman");
  });
});

it("Movie creation should throw an error if the Title field is empty", async () => {
  try {
    await new Movie({
      Title: "",
      Released: "2017-01-17T23:00:00.000Z",
      Genre: "Action, Drama, History",
      Director: "N/A",
      monthAdded: "2021 7",
      addedBy: "Premium Jim",
    }).save();
  } catch (err) {
    expect(err.errors.Title.properties.message).toEqual("Title required");
  }
});

it("Movie creation should throw an error if the Director field is empty", async () => {
  try {
    await new Movie({
      Title: "Movie",
      Released: "2017-01-17T23:00:00.000Z",
      Genre: "Action, Drama, History",
      Director: "",
      monthAdded: "2021 7",
      addedBy: "Premium Jim",
    }).save();
  } catch (err) {
    expect(err.errors.Director.properties.message).toEqual(
      "The movie has not directed itself"
    );
  }
});

it("Test Movie should be added to the database", async () => {
  if (await Movie.find({ Title: "Test Movie" })) {
    await Movie.findOneAndDelete({ Title: "Test Movie" });
  }
  testMovie = await new Movie({
    Title: "Test Movie",
    Released: "1991-08-07T23:00:00.000Z",
    Genre: "Action, Drama, History",
    Director: "Daniel Badura",
    monthAdded: "2021 7",
    addedBy: "Basic Thomas",
  }).save();

  expect(testMovie.Title).toEqual("Test Movie");
});
it("Test Movie already exists, adding duplicate should throw an error", async () => {
  try {
    await new Movie({
      Title: "Test Movie",
      Released: "1991-08-07T23:00:00.000Z",
      Genre: "Action, Drama, History",
      Director: "Daniel Badura",
      monthAdded: "2021 7",
      addedBy: "Basic Thomas",
    }).save();
  } catch (err) {
    expect(err.toString()).toMatch(/E11000 duplicate key error collection/);
  }
});

test("Function should return Movies added by basic user only", async () => {
  basicUser = {
    userId: 123,
    name: "Basic Thomas",
    role: "basic",
    iat: 1629098306,
    exp: 1629206306,
    iss: "https://www.netguru.com/",
    sub: "123",
  };
  const moviesBasic = await moviesAdded(basicUser);
  for (let i = 0; i < moviesBasic.length; i++) {
    expect(moviesBasic[i].addedBy).toEqual("Basic Thomas");
  }
});
it("Test Movie should be removed from database", async () => {
  if (await Movie.find({ Title: "Test Movie" })) {
    await Movie.findOneAndDelete({ Title: "Test Movie" });
  }
  expect(await Movie.find({ Title: "Test Movie" })).toEqual([]);
});
