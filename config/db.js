// jshint esversion: 9
const path = require("path");
require('dotenv').config({ path: './config/config.env' });
const mongoose = require("mongoose");

// 
const dburl = process.env.MONGO_URI;
const connectDB = async () => {
  const conn = await mongoose.connect(
    dburl,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  );


  // const conn = await mongoose.connect("mongodb://localhost:27017/MoviesAPI", {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useUnifiedTopology: true,
  //   });
  console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline.bold);
};

module.exports = connectDB;
