'use strict';

const axios = require('axios');

var character = require('../MARVEL/models/character');
var comic = require('../MARVEL/models/comic');

function Marvel(request) {
  this.publicKey = request.publicKey || '';
  this.privateKey = request.privateKey || '';
}

Marvel.prototype.findAllCharacters = function(request) {
//Request Method: GET
var query = query.stringify({
  apikey: this.publicKey,
  ts: ts,
  hash: this._createHash(ts);
  limit: limit,
  offset: offset
});
Headers: {
  Accept: */*
}







