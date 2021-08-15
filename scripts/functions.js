// jshint esversion: 9
const axios = require("axios");
// const fetch = require("node-fetch");
const Movie = require("../models/Movie");

const functions = {
  add: (num1, num2) => num1 + num2,
  fetchMovie: (title) =>
    axios
      .get(`http://www.omdbapi.com/?apikey=f7196b6c&t=${title}`)
      .then((response) => response.data)
      .catch((err) => "error"),
  moviesAdded: async (decoded) => {
    let dateNow = new Date();
    monthNow = dateNow.getFullYear() + " " + dateNow.getMonth();
    return Movie.find({
      addedBy: decoded.name,
      monthAdded: monthNow,
    });
  },
};

module.exports = functions;
