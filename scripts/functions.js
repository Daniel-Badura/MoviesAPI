// jshint esversion: 9
const axios = require("axios");
// const fetch = require("node-fetch");


const functions= {
add: (num1,num2)=> num1+num2,
fetchMovie: (title) =>  axios
.get(`http://www.omdbapi.com/?apikey=f7196b6c&t=${title}`)
.then(response => response.data)
.catch(err => 'error'),

};

module.exports = functions;