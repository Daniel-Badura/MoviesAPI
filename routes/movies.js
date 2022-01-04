// jshint esversion: 9

const express = require("express");
const authorize = require('../middleware/auth');
const addConditions = require('../middleware/addMovieConditions');
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

const router = express.Router();
// /movies routes
router
  .route("/")
  .get(authorize, getMovies)
  .post(authorize, addConditions, createMovie);
router
  .route("/:id")
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie);


module.exports = router;
