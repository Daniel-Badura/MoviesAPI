// jshint esversion: 9
const { moviesAdded } = require("../scripts/movies");

const addConditions = async (req, res, next) => {
  // check how many movies added by basic user this month
  decoded = res.locals.decoded;
  let moviesAddedThisMonth = await moviesAdded(decoded);
  // console.log(moviesAddedThisMonth.length);

  if (moviesAddedThisMonth.length >= 5 && decoded.role == "basic") {
    return res.status(403).json({
      success: false,
      msg: "Basic users can add max 5 movies per month",
    });
  } else {
    // if all conditions passed - call next()
    next();
  }
};

module.exports = addConditions;
