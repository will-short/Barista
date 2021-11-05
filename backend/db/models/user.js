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
    // associations can be defined here
  };

  User.prototype.toSafeObject = function () {
    const { id, username, email, name } = this; // context will be the User instance
    return { id, username, email, name };
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
  User.signup = async function ({ username, email, password, name }) {
    const hashed_password = bcrypt.hashSync(password);
    const user = await User.create({
      name,
      username,
      email,
      hashed_password,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };

  return User;
};
