'use strict';
module.exports = (sequelize, DataTypes) => {
  const character = sequelize.define('character', {
    character: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  character.associate = function(models) {
    models.character.belongsTo(models.user);
  };
  return character;
};