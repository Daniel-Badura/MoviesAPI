// jshint esversion: 9

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: [true, "Title required"],
    unique: true,
    trim: true,
    maxlength: [100, "Title must not be longer than 100 characters"],
  },
  Released: { type: Date, required: [true, "Released Date required"] },
  Genre: { type: String, required: false },
  Director: {
    type: String,
    required: [true, "The movie has not directed itself"],
    maxlength: [100, "Director name must not be longer than 100 characters"],
  },
});
module.exports = mongoose.model("Movie", movieSchema);