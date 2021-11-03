'use strict';
module.exports = (sequelize, DataTypes) => {
  const Badge = sequelize.define('Badge', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Badge.associate = function(models) {
    // associations can be defined here
  };
  return Badge;
};