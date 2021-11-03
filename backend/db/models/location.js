'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    rating: DataTypes.NUMERIC,
    coordinates: DataTypes.ARRAY(DataTypes.NUMERIC)
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};