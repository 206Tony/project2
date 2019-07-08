// 'use strict';
require('dotenv').config();
const buildMarvelQuery = require('../middleware/buildMarvelQuery');
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const async = require('async');
const pages = require('express-paginate');


router.get('/', function(req, res) {
  db.character.findAll().then(function(character) {
    res.render('marvel/show', {character});
  });
});

router.get('/show/:characterName', function(req, res) {
  console.log(req.params.characterName)
  var url = buildMarvelQuery('characters?name=' + encodeURI(req.params.characterName) + '&'); //'http://gateway.marvel.com/v1/public/characters?name=' + id + "&ts="+ new Date() +'&apiKey=' + publicKey + 'hash=' + md5(ts + privateKey + publicKey);
  axios.get(url).then(function(apiResponse) {
    var character = apiResponse.data.data.results[0];
    res.render('marvel/show', { character });
  }).catch( err => console.log(err));
});

// router.post('/marvel', function(req, res) {
//   db.character.create({
//     character: req.body.character,
//     userId: req.user.id
//   }).then(function() {
//     res.redirect('/main');
//   })
// });

// router.get('/:id', function(req, res){
//   db.character.findByPk(req.params.id).then(function(character){
//     var url = buildMarvelQuery('character?name=' + encodeURI(character)); //'http://gateway.marvel.com/v1/public/characters?name=' + id + "&ts="+ new Date() +'&apiKey=' + publicKey + 'hash=' + md5(ts + privateKey + publicKey);
//     axios.get(url).then(function(apiResponse) {
//       var character = apiResponse.data.data.results[1];
//       //res.json(character)
//       res.render('marvel/favorites', { character, id: parseInt(req.params.id)});
//     });
//   });
// });


// router.get('/show/:id', function(req, res) {
//   db.character.findOne().then(function(character) {
//     res.render('marvel/show', {character})
//   });
// });

// router.delete('/:id', function(req, res) {
//   db.character.destroy({
//     where: {id: parseInt(req.params.id)}
//   }).then(function(character){

//     res.redirect('/marvel', {character});
//   });   
// });

module.exports = router;



























