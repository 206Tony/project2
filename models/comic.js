'use strict';
module.exports = (sequelize, DataTypes) => {
  const comic = sequelize.define('comic', {
    comic: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  comic.associate = function(models) {
    models.comic.belongsTo(models.user);
    models.comic.belongsToMany(models.character, {through:charactersComics});
  };
  return comic;
};