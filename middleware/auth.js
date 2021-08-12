// jshint esversion: 9
const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const errorHandler = require("./asyncHandler");

const authorize = asyncHandler(async (req, exports, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }

  // else if (req.cookies.token){
  //     token = req.cookies.token;
  // }

  if (!token) {
    return next(new ErrorResponse("Not authorized"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
  } catch (err) {
    console.log(err);
  }
});

module.exports = authorize;