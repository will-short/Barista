"use strict";
module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define(
    "Drink",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      ingredients: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {}
  );
  Drink.associate = function (models) {
    Drink.hasMany(models.Checkin, {
      foreignKey: "drink_id",
    });
  };

  Drink.all = async function () {
    const allDrinks = await Drink.findAll();

    return allDrinks;
  };
  return Drink;
};
