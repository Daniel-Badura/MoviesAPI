// jshint esversion: 9
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fetch = require("node-fetch");
const jwt = require('jsonwebtoken');
const connectDB= require('./config/db');
const Movie = require("./models/Movie");


// Load env
dotenv.config({ path: "./config/config.env" });

// Connect DB
connectDB();
// Routes

const movies = require("./routes/movies");


const app = express();

// Mount router

app.use("/movies", movies);
// Middleware
app.use(morgan("common"));
// Server info
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejections:

process.on('unhandledRejection', (err,promise)=>{
    console.log(`Error: ${err.message}`.red);
    server.close(()=>process.exit(1));
});
