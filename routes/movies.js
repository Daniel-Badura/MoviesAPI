// jshint esversion: 9

const express = require("express");
const authorize = require('../middleware/auth');
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

const router = express.Router();

router
.route("/")
.get(getMovies, authorize)
.post(createMovie, authorize);
router
.route("/:id")
.get(getMovie)
.put(updateMovie)
.delete(deleteMovie);

// router.get("", (req, res) => {
//   res.status(200).json({ success: true, msg: "Show all movies" });
// });
// router.post("", (req, res) => {
//   res.status(200).json({ success: true, msg: "Create new movie" });
// });
// router.put("/:id", (req, res) => {
//   res.status(200).json({ success: true, msg: `Update movie ${req.params.id}` });
// });
// router.delete("/:id", (req, res) => {
//   res.status(200).json({ success: true, msg: `Remove movie ${req.params.id}` });
// });

module.exports = router;
