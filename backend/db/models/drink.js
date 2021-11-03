'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define('Drink', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ingredients: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Drink.associate = function(models) {
    // associations can be defined here
  };
  return Drink;
};