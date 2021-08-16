// jshint esversion: 9
const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  // check the JWT token
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "You need to be authorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.decoded = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ success: false, msg: "Incorrect authorization token" });
  }
};

module.exports = authorize;
