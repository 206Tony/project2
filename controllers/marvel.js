'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const md5 = require('md5');

// function marvel(request) {
//   this.publicKey = request.publicKey || '';
//   this.privateKey = request.privateKey || '';
// }

// character.findAllCharacters = function(characters) {
//   request = request || {};
//   var ts = new Date();
//   var limit = typeof request.limit !== 'undefined' ? request.limit : 20;
//   var offset = typeof request.limit !== 'undefined' ? request.limit : 0;

//   //Request Method: GET
//   var hash = md5 ({
//     apikey: PUBLIC_HERO_KEY,
//     ts: ts,
//     hash: HASH,        
//     limit: limit,
//     offset: offset
//   });
//   var url = 'http://gateway.marvel.com/v1/public/characters?' + hash;
//   console.log("this is an object");
//   axios.get(url).then( data => {
    
//   })
//   res.render('index');
// };



