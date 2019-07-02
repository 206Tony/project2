'use strict';
module.exports = (sequelize, DataTypes) => {
  const character = sequelize.define('character', {
    character: DataTypes.STRING,
    characterApiId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  character.associate = function(models) {
    // associations can be defined here
  };
  return character;
};