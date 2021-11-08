"use strict";
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define(
    "Checkin",
    {
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      rating: DataTypes.NUMERIC,
      badge_id: DataTypes.INTEGER,
      drink_id: DataTypes.INTEGER,
      location_id: DataTypes.INTEGER,
      owner_id: DataTypes.INTEGER,
    },
    {}
  );
  Checkin.associate = function (models) {
    Checkin.hasOne(model.Drink);
  };
  return Checkin;
};
