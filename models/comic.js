'use strict';
module.exports = (sequelize, DataTypes) => {
  const comic = sequelize.define('comic', {
    comic: DataTypes.STRING,
    comicApiId: DataTypes.INTEGER,
    isbn: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  comic.associate = function(models) {
    // associations can be defined here
  };
  return comic;
};