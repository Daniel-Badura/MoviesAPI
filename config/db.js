// jshint esversion: 9
const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://dandeusz:dandeusz@cluster0.3t3pj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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