'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    rating: DataTypes.NUMERIC,
    badge_id: DataTypes.INTEGER,
    drink_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Checkin.associate = function(models) {
    // associations can be defined here
  };
  return Checkin;
};