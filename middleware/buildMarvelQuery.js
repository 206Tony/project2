require('dotenv').config();
const md5 = require('md5');
const publicKey = process.env.PUBLIC_HERO_KEY;
const privateKey = process.env.SUPER_HERO_SECRET_KEY; 

function buildMarvelQuery(param) {
  let baseUrl = 'http://gateway.marvel.com/v1/public/' +  param;
  let ts = md5(new Date().toString());
  let apikey = publicKey;
  let hash = md5(ts + privateKey + publicKey);
  let limit = 100;
  let first = 20;
  let next = first + 20;
  let prev = next - 20;
  let last = limit.length - 1;
    if(first) {
      return baseUrl + 
            'ts=' + ts +
            '&apikey='+ apikey +
            '&hash=' + hash + 
            '&limit=' + first;
    } else if ()
  return baseUrl + 
         'ts=' + ts +
         '&apikey='+ apikey +
         '&hash=' + hash + 
         '&limit=' + limit;
}

function 

module.exports = buildMarvelQuery;