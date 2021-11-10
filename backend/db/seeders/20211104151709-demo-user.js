"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Demo user",
          email: "demo@user.io",
          username: "Demo-lition",
          hashed_password: bcrypt.hashSync("password"),
          location: "Chicago",
        },
        {
          name: "fake user1",
          email: faker.internet.email(),
          username: "FakeUser1",
          hashed_password: bcrypt.hashSync(faker.internet.password()),
          location: "St louis",
        },
        {
          name: "fake user2",
          email: faker.internet.email(),
          username: "FakeUser2",
          hashed_password: bcrypt.hashSync(faker.internet.password()),
          location: "Indianapolis",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
