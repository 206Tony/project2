'use strict';
module.exports = (sequelize, DataTypes) => {
  const character = sequelize.define('character', {
    id: DataTypes.INTEGER,
    character: DataTypes.STRING,
    characterApiId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  character.associate = function(models) {
    models.character.belongsTo(models.user);
  };
  return character;
};