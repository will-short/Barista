"use strict";
module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define(
    "Drink",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      ingredients: DataTypes.INTEGER,
    },
    {}
  );
  Drink.associate = function (models) {
    Drink.belongsToMany(models.Checkin);
  };
  return Drink;
};
