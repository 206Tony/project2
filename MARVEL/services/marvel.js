'use strict';

const axios = require('axios');

var character = require('../MARVEL/models/character');
var comic = require('../MARVEL/models/comic');

function Marvel(request) {
  this.publicKey = request.publicKey || '';
  this.privateKey = request.privateKey || '';
}

Marvel.prototype.findAllCharacters = function(request) {
  request = request || {};
  var ts = this.timestamp();
  var limit = typeof request.limit !== 'undefined' ? request.limit : 20;
  var offset = typeof request.limit !== 'undefined' ? request.limit : 0;

  //Request Method: GET
  var query = JSON.stringify({
    apikey: this.publicKey,
    ts: ts,
    hash: this._createHash(ts),
    limit: limit,
    offset: offset
  });
  var url = 'http://gateway.marvel.com/v1/public/characters?' + query;







