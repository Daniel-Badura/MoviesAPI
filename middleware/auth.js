// jshint esversion: 9
const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const errorHandler = require("./asyncHandler");

const authorize = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // else if (req.cookies.token){
  //     token = req.cookies.token;
  // }
  if (!token) {
    // return next(new ErrorResponse("Not authorized"));
    return res.status(400).json({ success: false, msg: "You need to be authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.decoded=decoded;
    // console.log(decoded);
    next();
    // console.log(decoded);
  } catch (err) {
    console.log(err);
  }
  
};

module.exports = authorize;