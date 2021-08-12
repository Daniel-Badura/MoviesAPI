// jshint esversion: 9
const Movie = require("../models/Movie");
const fetch = require("node-fetch");
const asyncHandler = require("../middleware/asyncHandler");
const jwt = require("jsonwebtoken");

// @desc       Get all movies

exports.getMovies = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
   return res.status(400).json({ success: false, msg: "You need to be authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const movies = await Movie.find({addedBy: decoded.name});
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
  let dateNow = new Date();
  monthAdded = dateNow.toLocaleDateString().slice(3, 10);
  
  


  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("Not authorized"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    let moviesAddedThisMonth = await Movie.find({addedBy: decoded.name,monthAdded: monthAdded});

    if ((moviesAddedThisMonth.length<5 && decoded.role=='basic') || (decoded.role=='premium')){
      fetch(`http://www.omdbapi.com/?apikey=f7196b6c&t=${req.body.Title}`)
      .then((res) => res.json())
      .then((json) => {
        json.monthAdded = monthAdded;
        json.addedBy = decoded.name;
        let movie = Movie.create(json);
        console.log(decoded);
        res.status(201).json({
          success: true,
          data: movie,
        });
      }); 
    }
    else {
      res.status(400).json({ success: false, msg:" You cannot add more than 5 movies in a month" });
    }

 
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, msg: err});
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
