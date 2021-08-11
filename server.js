// jshint esversion: 9
const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/movies", (req, res) => {
  res.status(200).json({ success: true, msg: "Show all movies" });
});
app.post("/movies", (req, res) => {
  res.status(200).json({ success: true, msg: "Create new movie" });
});
app.put("/movies/:id", (req, res) => {
  res.status(200).json({ success: true, msg: `Update movie ${req.params.id}` });
});
app.delete("/movies/:id", (req, res) => {
  res.status(200).json({ success: true, msg: `Remove movie  ${req.params.id}` });
});

app.listen(
  PORT,
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
