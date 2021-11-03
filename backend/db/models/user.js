'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashed_password: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    location: DataTypes.STRING,
    friends: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};