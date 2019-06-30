require('dotenv.config')
var express = require('express');
var router = express.Router();
var db = require('../controllers/marvelApi/')
var axios = require('axios');


app.get('/', function(req, res) {
  var marvelUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=thanos&apikey=1ac2eed0e222ceee3a62e721648d0627'
  axios.get(marvelUrl).then(function(apiResponse) {
    var character = apiResponse.data.results;
    res.render('index', { character });
  })
})

module.exports = server;

// Request Url: http://gateway.marvel.com/v1/public/comics
// Request Method: GET
// Params: {
//   "apikey": "your api key",
//   "ts": "a timestamp",
//   "hash": "your hash"
// }
// Headers: {
//   Accept: */*
// }