'use strict';
module.exports = (sequelize, DataTypes) => {
  const comic = sequelize.define('comic', {
    id: DataTypes.INTEGER,
    comic: DataTypes.STRING,
    comicApiId: DataTypes.INTEGER,
    isbn: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  comic.associate = function(models) {
    models.comic.belongsTo(models.user);
  };
  return comic;
};