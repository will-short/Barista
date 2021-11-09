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
      drink_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Drinks" },
      },
      location_id: {
        type: Sequelize.INTEGER,
        references: { model: "Locations" },
      },
      owner_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
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
    return queryInterface.dropTable("Checkins");
  },
};
