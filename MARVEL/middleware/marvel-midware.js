module.exports = function() {
  var marvel = new Marvel({
    publicKey: config.PUBLIC_HERO_KEY,
    privateKey: config.SUPER_HERO_SECRET_KEY
  });

  return function(req, res, next) {
    req.marvel = marvel;
    next();
  };
};