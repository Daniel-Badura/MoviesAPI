// jshint esversion: 9
const Movie = require("../models/Movie");
const fetch = require("node-fetch");
// @desc       Get all movies
// @route       Get /movies
// @access       Public

exports.getMovies = async (req, res, next) => {
  try {
      const movies = await Movie.find();
      res.status(200).json({ success: true, data: movies });
  } catch (err) {
      res.status(400).json({
          success: false 
      });
  }
  
};

// @desc       Get movie
// @route       Get /movies
// @access       Public

exports.getMovie = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show movie  ${req.params.id}` });
};

// @desc       Create movie
// @route       Get /movies
// @access       Public

exports.createMovie = async (req, res, next) => {
  try {
    fetch(`http://www.omdbapi.com/?apikey=f7196b6c&t=${req.body.Title}`)
      .then((res) => res.json())
      .then((json) => {
        let movie = Movie.create(json);
        res.status(201).json({
          success: true,
          data: movie,
        });
      });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc       Update movies
// @route       Get /movies
// @access       Public

exports.updateMovie = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update movie ${req.params.id}` });
};

// @desc       Delete movie
// @route       Get /movies
// @access       Public

exports.deleteMovie = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Remove movie ${req.params.id}` });
};