'use strict';
const buildMarvelQuery = require('../middleware/buildMarvelQuery');
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const async = require('async');
const md5 = require('md5');

router.get('/', function(req, res) {
  db.character.findAll().then(function(character) {
    res.render('profile', {character}); 
  });
})

router.get('/:id', function(req, res){
  db.character.findByPk(req.params.id).then(function(character){
    var url = 'http://gateway.marvel.com/v1/public/characters?name=' + character.name + '&apiKey=' + PUBLIC_HERO_KEY;
    axios.get(url).then(function(apiResponse) {
      var character = apiResponse.data;
      res.render('profile', { character, id: parseInt(req.params.id) });
    });
  });
});

router.post('/', function(req, res) {
  db.character.create({
    character: req.body.character,
    characterApi: req.body.characterApi
  }).then(function() {
    res.redirect('/profile');
  })
});

router.post('/', function(req, res) {
  db.comic.create({
    comic: req.body.comic,
    isbn: req.body.isbn,
    comicApi: req.body.comicApiId
  }).then(function() {
    res.redirect('/profile');
  })
});

// router.update('/:id', function(req, res, next) {

// })

router.delete('/:id', function(req, res) {
  db.character.destroy({
    where: {id: parseInt(req.params.id)}
  }).then(function(character){

    res.redirect('/profile');
  });   
});

module.exports = router;



























