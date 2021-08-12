// jshint esversion: 9
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const Movie = require("./models/Movie");
const { authFactory, AuthError } = require("./src/auth");
const cookieParser = require("cookie-parser");
const errorHandler = require('./middleware/errorHandler');

dotenv.config({ path: "./config/config.env" });
const { JWT_SECRET } = process.env;
// console.log(process.env);
console.log(JWT_SECRET);

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const auth = authFactory(JWT_SECRET);
const app = express();
// Body Parser:
app.use(express.json());

// Cookie Parser:
app.use(cookieParser());

// Load env

// Connect DB
connectDB();

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
};

app.post("/auth", (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "invalid payload" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "invalid payload" });
  }

  try {
    const token = auth(username, password);
    const options = { expires: new Date(Date.now() + 1000 * 60 * 15),
    httpOnly: true };
    return res.status(200).cookie("token", token,options).json({ success:true, token });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }

    next(error);
  }
});

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

// Routes
const movies = require("./routes/movies");
// Error handler
app.use(errorHandler);
// Mount router

app.use("/movies", movies);
// Middleware
app.use(morgan("common"));
// Server info
const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`Server is running on port ${PORT}`.yellow.bold)
);
// Handle unhandled promise rejections:

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
//   server.close(() => process.exit(1));
});
