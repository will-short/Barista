"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashed_password: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      profile_image: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashed_password", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashed_password"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Checkin, { foreignKey: "owner_id" });
    User.hasMany(models.Comment, { foreignKey: "owner_id" });
  };

  User.prototype.toSafeObject = function () {
    const { id, username, email, name, profile_image, location } = this; // context will be the User instance
    return { id, username, email, name, profile_image, location };
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashed_password.toString());
  };
  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };
  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };
  User.signup = async function ({
    username,
    email,
    password,
    name,
    profile_image,
    location,
  }) {
    const hashed_password = bcrypt.hashSync(password);
    const user = await User.create({
      name,
      username,
      email,
      profile_image,
      location,
      hashed_password,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };
  User.exists = async function (username, email) {
    const usernameExists = await User.scope("loginUser").findOne({
      where: { username },
    });
    const emailExists = await User.scope("loginUser").findOne({
      where: { email },
    });

    return { usernameExists, emailExists };
  };

  return User;
};
