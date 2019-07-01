'use strict';
module.exports = (sequelize, DataTypes) => {
  const charactersComics = sequelize.define('charactersComics', {
    characterId: DataTypes.INTEGER,
    comicId: DataTypes.INTEGER
  }, {});
  charactersComics.associate = function(models) {
    // associations can be defined here
  };
  return charactersComics;
};