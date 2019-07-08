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
  var url = buildMarvelQuery('characters?name=' + encodeURI(req.params.characterName) + '&'); 
  axios.get(url).then(function(apiResponse) {
    var character = apiResponse.data.data.results[0];
    res.render('marvel/show', { character });
  }).catch( err => console.log(err));
});

router.post('/favorites', function(req, res) {
  console.log("are we hitting this?");
  db.character.findOrCreate({
    where: {
      character: req.body.character,
      userId: req.user.id
    }
  }).spread(function(character, created){
      if (character) {
        console.log('character found')
    } else {
        console.log('character created')
    }
  }).then(function() {
    res.redirect('/favorites');
  });
});

router.get('/favorites', function(req, res) {
  console.log("hitting favs");
  db.character.findAll().then(function(character) {
    res.render('marvel/favorites', {character});
  });
});

router.get('/:id', function(req, res){
  console.log("are we hitting this?");
  db.character.findByPk(req.params.id).then(function(character){
    var url = buildMarvelQuery('characters?name=' + encodeURI(character.name)); 
    axios.get(url).then(function(apiResponse) {
      var character = apiResponse.data.data.results;
      //res.json(character)
      res.render('marvel/show', { character, id: parseInt(req.params.id)});
    });
  });
});

router.delete('/:id', function(req, res) {
  console.log(" here ")
  db.character.destroy({
    where: {id: parseInt(req.params.id)}
  }).then(function(character){

    res.redirect('/marvel');
  });   
});

module.exports = router;



























