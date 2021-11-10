"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Checkins", [
      {
        description: "having a blast drinking this!",
        image:
          "https://res.cloudinary.com/dc9htgupc/image/upload/v1636478670/Checkins/v6pdqabum9ol7xo6ghlz.jpg",
        rating: 4.5,
        drink_id: 2,
        owner_id: 1,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Checkins", null, {});
  },
};
