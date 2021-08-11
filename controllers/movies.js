// jshint esversion: 9
const Movie = require("../models/Movie");
// @desc       Get all movies
// @route       Get /movies
// @access       Public


exports.getMovies = (req, res, next) => {
    res.status(200).json({success: true, msg: 'Show all movies' });
};

// @desc       Get movie
// @route       Get /movies
// @access       Public


exports.getMovie = (req, res, next) => {
    res.status(200).json({success: true, msg: `Show movie  ${req.params.id}` });
};

// @desc       Create movie
// @route       Get /movies
// @access       Public


exports.createMovie = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create new movie' });
};


// @desc       Update movies
// @route       Get /movies
// @access       Public


exports.updateMovie = (req, res, next) => {
    res.status(200).json({success: true, msg: `Update movie ${req.params.id}` });
};


// @desc       Delete movie
// @route       Get /movies
// @access       Public


exports.deleteMovie = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Remove movie ${req.params.id}` });
};
