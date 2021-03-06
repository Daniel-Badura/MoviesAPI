// jshint esversion: 9
const Movie = require("../models/Movie");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const functions = require("../scripts/movies");
const { fetchMovie } = require("../scripts/movies");

// @desc       Get all movies

exports.getMovies = async (req, res, next) => {
  const decoded = res.locals.decoded;
  console.log(`User ${decoded.name} requested movie list.`);
  try {
    const movies = await Movie.find({ addedBy: decoded.name });
    res.status(200).json({ success: true, data: movies });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
    });
  }
};
// @desc       Get movie

exports.getMovie = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show movie  ${req.params.id}` });
};

// @desc       Create movie

exports.createMovie = async (req, res, next) => {
  const decoded = res.locals.decoded;
  console.log(decoded);

  let dateNow = new Date();
  monthNow = dateNow.getFullYear() + " " + dateNow.getMonth();

  try {
    const data = await fetchMovie(req.body.Title);
    // check if movie exists:
    Movie.countDocuments({ Title: data.Title }, (err, count) => {
      // if does not exist, add it to database.
      if (count == 0) {
        if (data.Released == "N/A") {
          data.Released = Date.now();
        }
        data.monthAdded = monthNow;
        data.addedBy = decoded.name;
        Movie.create(data);
        res.status(201).json({
          success: true,
          msg: `added movie ${data.Title}`,
          data: data,
        });
        // if exists return status 403
      } else if (count > 0) {
        res.status(403).json({ success: false, msg: "Movie already exists" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, msg: err });
  }
};

// @desc       Update movies

exports.updateMovie = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update movie ${req.params.id}` });
};

// @desc       Delete movie

exports.deleteMovie = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Remove movie ${req.params.id}` });
};
