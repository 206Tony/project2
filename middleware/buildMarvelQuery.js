require('dotenv').config();
const md5 = require('md5');
const publicKey = process.env.PUBLIC_HERO_KEY;
const privateKey = process.env.SUPER_HERO_SECRET_KEY; 

function buildMarvelQuery(param) {
  let baseUrl = 'http://gateway.marvel.com/v1/public/' +  param;
  let ts = new Date();
  let apikey = publicKey;
  let hash = md5(ts + privateKey + publicKey)
  return baseUrl + 
         '?ts=' + ts +
         '&apikey='+ apikey +
         '&hash=' + hash +
         '&limit=20&offset=20';
}

module.exports = buildMarvelQuery;