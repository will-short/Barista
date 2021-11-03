"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Checkins", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.NUMERIC(3, 2),
      },
      badge_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Badges" },
      },
      drink_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Drinks" },
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Locations" },
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Checkins");
  },
};
