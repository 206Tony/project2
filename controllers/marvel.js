// 'use strict';
require('dotenv').config();
const buildMarvelQuery = require('../middleware/buildMarvelQuery');
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

router.get('/', function(req, res) {
  db.character.findAll().then(function(characters) {
    res.render('marvel/favorites', {characters}); 
  });
})

router.post('/', function(req, res) {
  db.character.create({
    character: req.body.character,
    userId: req.user.id
  }).then(function() {
    res.redirect('/marvel');
  })
});

router.get('/:id', function(req, res){
  db.character.findByPk(req.params.id).then(function(character){
    var url = buildMarvelQuery('characters?name=' + encodeURI(character.character)); //'http://gateway.marvel.com/v1/public/characters?name=' + id + "&ts="+ new Date() +'&apiKey=' + publicKey + 'hash=' + md5(ts + privateKey + publicKey);
    axios.get(url).then(function(apiResponse) {
      var character = apiResponse.data.data.results[0];
      //res.json(character)
      res.render('favorites/:id', {character, id: parseInt(req.params.id)});
    });
  });
});

router.delete('/:id', function(req, res) {
  db.character.destroy({
    where: {id: parseInt(req.params.id)}
  }).then(function(character){

    res.redirect('/profile');
  });   
});

module.exports = router;



























