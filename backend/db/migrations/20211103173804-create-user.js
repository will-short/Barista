"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      hashed_password: {
        allowNull: false,
        type: Sequelize.STRING.BINARY,
      },
      profile_image: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      friends: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  },
};
