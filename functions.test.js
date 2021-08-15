// jshint esversion: 9
// const functions=require('./scripts/functions');
const { getMovies, getMovie, createMovie } = require("./controllers/movies");
const {
  fetchMovie,
  add,
  fetchTest,
  moviesAdded,
} = require("./scripts/functions");
const Movie = require("./models/Movie");
const httpMocks = require("node-mocks-http");
const authorize = require("./middleware/auth");
const mongoose = require("mongoose");
const { deleteOne } = require("./models/Movie");
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://dandeusz:dandeusz@cluster0.3t3pj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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

test("Dummy test 2+2=4", () => {
  expect(add(2, 2)).toBe(4);
});

test('Fetch "http://www.omdbapi.com/?apikey=f7196b6c&t=Batman" returns the Batman Movie object', () => {
  expect.assertions(1);
  return fetchMovie("Batman").then((data) => {
    expect(data.Title).toEqual("Batman");
  });
});

it("should throw an error if the title is empty", async () => {
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

it("should throw an error if the Director is empty", async () => {
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

it("Test Movie should be created in database", async () => {
  if (await Movie.find({ Title: "Test Movie" })) {
    await Movie.findOneAndDelete({ Title: "Test Movie" });
  }
  testMovie = await new Movie({
    Title: "Test Movie",
    Released: "1991-08-07T23:00:00.000Z",
    Genre: "Action, Drama, History",
    Director: "Daniel Badura",
    monthAdded: "2021 7",
    addedBy: "Daniel Badura",
  }).save();

  //   const testMovie = Movie.find({
  //     addedBy: "Daniel Badura"
  //   });

  expect(testMovie.Title).toEqual("Test Movie");
});
it("Test Movie should be removed from database", async () => {
  if (await Movie.find({ Title: "Test Movie" })) {
    await Movie.findOneAndDelete({ Title: "Test Movie" });
  }
  expect(await Movie.find({ Title: "Test Movie" })).toEqual([]);
});
mongoose.disconnect();
